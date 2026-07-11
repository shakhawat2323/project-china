"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  CreditCard,
  Database,
  LineChart,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderService } from "@/services/order.service";
import { PaymentService, type PaymentRecord } from "@/services/payment.service";
import { ProductService, type IProduct } from "@/services/product.service";

type DashboardMode = "admin" | "super-admin";

type OrderLike = {
  id?: string;
  status?: string;
  totalAmount?: number;
  createdAt?: string;
};

const chartColors = ["#2563eb", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444"];

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function shortId(value?: string) {
  return value ? value.slice(0, 8).toUpperCase() : "N/A";
}

function StatCard({
  title,
  value,
  caption,
  icon: Icon,
  tone = "primary",
}: {
  title: string;
  value: string;
  caption: string;
  icon: typeof Boxes;
  tone?: "primary" | "success" | "warning" | "danger";
}) {
  const toneClass = {
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-500/10 text-emerald-500",
    warning: "bg-amber-500/10 text-amber-500",
    danger: "bg-destructive/10 text-destructive",
  }[tone];

  return (
    <Card className="group overflow-hidden border-border/80 bg-card/95 shadow-sm transition hover:-translate-y-0.5 hover:shadow-premium">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-foreground">{value}</p>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">{caption}</p>
          </div>
          <div className={`flex size-11 items-center justify-center rounded-lg ${toneClass}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyPanel({ title }: { title: string }) {
  return (
    <div className="flex min-h-56 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-center">
      <div>
        <p className="text-sm font-black text-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">Live data will appear when backend records exist.</p>
      </div>
    </div>
  );
}

export default function EnterpriseDashboardHome({ mode }: { mode: DashboardMode }) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [orders, setOrders] = useState<OrderLike[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const isSuperAdmin = mode === "super-admin";

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoading(true);
      try {
        const [productResponse, orderResponse, paymentResponse] = await Promise.all([
          ProductService.getProducts(),
          OrderService.getMyOrders().catch(() => []),
          (isSuperAdmin ? PaymentService.getTransactions() : PaymentService.getPaymentHistory()).catch(() => []),
        ]);

        if (!active) return;
        setProducts(productResponse.data || []);
        setOrders(Array.isArray(orderResponse) ? (orderResponse as OrderLike[]) : []);
        setPayments(Array.isArray(paymentResponse) ? (paymentResponse as PaymentRecord[]) : []);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();
    return () => {
      active = false;
    };
  }, [isSuperAdmin]);

  const analytics = useMemo(() => {
    const totalRevenue = payments.reduce((sum, item) => sum + (item.status === "PAID" ? item.amount || 0 : 0), 0);
    const monthlyRevenue = payments
      .filter((item) => item.status === "PAID")
      .reduce((sum, item) => sum + (item.amount || 0), 0);
    const pendingOrders = orders.filter((item) => item.status === "PENDING").length;
    const processingOrders = orders.filter((item) => ["PAID", "PRODUCTION", "PROCESSING", "QUALITY_CONTROL"].includes(item.status || "")).length;
    const deliveredOrders = orders.filter((item) => item.status === "DELIVERED").length;
    const cancelledOrders = orders.filter((item) => item.status === "CANCELLED").length;
    const lowStock = products.filter((item) => (item.stock || 0) > 0 && (item.stock || 0) <= 10).length;
    const outOfStock = products.filter((item) => (item.stock || 0) <= 0).length;

    return { totalRevenue, monthlyRevenue, pendingOrders, processingOrders, deliveredOrders, cancelledOrders, lowStock, outOfStock };
  }, [orders, payments, products]);

  const revenueData = useMemo(() => {
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const paidPayments = payments.filter((item) => item.status === "PAID");

    return labels.map((month, index) => {
      const value = paidPayments
        .filter((payment) => (payment.createdAt ? new Date(payment.createdAt).getMonth() : index) === index)
        .reduce((sum, payment) => sum + (payment.amount || 0), 0);

      return {
        month,
        revenue: value,
        orders: orders.filter((order) => order.createdAt && new Date(order.createdAt).getMonth() === index).length,
      };
    });
  }, [orders, payments]);

  const hasRevenueData = revenueData.some((item) => item.revenue > 0 || item.orders > 0);

  const paymentMethodData = useMemo(() => {
    const methods = ["STRIPE", "PAYPAL", "BANK", "MANUAL"];
    return methods
      .map((method) => ({
        name: method,
        value: payments.filter((payment) => payment.method === method).length,
      }))
      .filter((item) => item.value > 0);
  }, [payments]);

  const productPerformance = useMemo(
    () =>
      products.slice(0, 6).map((product) => ({
        name: product.name.length > 18 ? `${product.name.slice(0, 18)}...` : product.name,
        stock: product.stock || 0,
        price: product.price || 0,
      })),
    [products],
  );

  const statCards = [
    { title: "Total Orders", value: String(orders.length), caption: "All visible order records", icon: PackageCheck, tone: "primary" as const },
    { title: "Pending Orders", value: String(analytics.pendingOrders), caption: "Needs operation action", icon: Activity, tone: "warning" as const },
    { title: "Processing", value: String(analytics.processingOrders), caption: "Paid/production workflow", icon: Zap, tone: "primary" as const },
    { title: "Delivered", value: String(analytics.deliveredOrders), caption: "Completed shipments", icon: ShoppingBag, tone: "success" as const },
    { title: "Cancelled", value: String(analytics.cancelledOrders), caption: "Cancelled workflow", icon: AlertTriangle, tone: "danger" as const },
    { title: "Total Products", value: String(products.length), caption: "Catalog inventory", icon: Boxes, tone: "primary" as const },
    { title: "Total Revenue", value: money(analytics.totalRevenue), caption: "Paid transaction value", icon: CreditCard, tone: "success" as const },
    { title: isSuperAdmin ? "Transactions" : "Low Stock", value: isSuperAdmin ? String(payments.length) : String(analytics.lowStock), caption: isSuperAdmin ? "Backend payment records" : "Requires replenishment", icon: isSuperAdmin ? Database : TrendingUp, tone: "warning" as const },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-[#06111f] p-6 text-white shadow-premium">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/25 blur-[110px]" />
        <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-cyan-400/20 blur-[90px]" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_390px] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
              <ShieldCheck className="h-4 w-4" />
              {isSuperAdmin ? "Super Admin Command Center" : "Admin Operations Center"}
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
              {isSuperAdmin ? "Control the entire platform from one premium cockpit." : "Run daily commerce operations with enterprise clarity."}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
              Real data, premium analytics, operational alerts, inventory visibility, payment intelligence, and system health in one responsive SaaS dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Live analytics", "Role aware", "Payment ready", "Realtime alerts"].map((item) => (
                <Badge key={item} className="rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/15">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <Card className="border-white/15 bg-white/10 text-white backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-cyan-200" />
                Monthly Revenue
              </CardTitle>
              <CardDescription className="text-slate-300">Paid transaction-backed performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{money(analytics.monthlyRevenue)}</p>
              {loading ? <p className="mt-2 text-xs text-cyan-100">Syncing live dashboard data...</p> : null}
              <Progress value={Math.min(100, analytics.monthlyRevenue / 100)} className="mt-5" />
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
                <div className="rounded-lg bg-white/10 p-3">
                  <p className="font-black">{orders.length}</p>
                  <p className="text-slate-300">Orders</p>
                </div>
                <div className="rounded-lg bg-white/10 p-3">
                  <p className="font-black">{payments.length}</p>
                  <p className="text-slate-300">Payments</p>
                </div>
                <div className="rounded-lg bg-white/10 p-3">
                  <p className="font-black">{analytics.outOfStock}</p>
                  <p className="text-slate-300">Out stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <Card>
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Daily, weekly and monthly sales trend with order volume.</CardDescription>
            </div>
            <Button variant="outline" className="rounded-full">
              Export Report <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {hasRevenueData ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => money(Number(value))} />
                    <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fill="url(#revenueGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <EmptyPanel title="No backend revenue data" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Stripe, PayPal and other provider distribution.</CardDescription>
          </CardHeader>
          <CardContent>
            {paymentMethodData.length ? (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <PieChart>
                    <Pie data={paymentMethodData} innerRadius={62} outerRadius={96} paddingAngle={4} dataKey="value">
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyPanel title="No payment method data" />
            )}
            <div className="mt-4 grid gap-2">
              {paymentMethodData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm">
                  <span className="flex items-center gap-2 font-bold">
                    <span className="size-2 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
                    {item.name}
                  </span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Trends</CardTitle>
            <CardDescription>Monthly order movement and demand curve.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              {hasRevenueData ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <RechartsLineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              ) : (
                <EmptyPanel title="No backend order trend data" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>Top product stock and catalog value signal.</CardDescription>
          </CardHeader>
          <CardContent>
            {productPerformance.length ? (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={productPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="stock" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyPanel title="No products found" />
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Newest visible orders from backend.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 6).length ? (
                    orders.slice(0, 6).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-xs">{shortId(order.id)}</TableCell>
                        <TableCell><Badge variant="secondary">{order.status || "PENDING"}</Badge></TableCell>
                        <TableCell>{money(order.totalAmount || 0)}</TableCell>
                        <TableCell className="text-muted-foreground">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">No orders available.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isSuperAdmin ? "Platform Data Signals" : "Operational Alerts"}</CardTitle>
            <CardDescription>Only backend-backed counts are shown here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Low Stock Products", value: `${analytics.lowStock}`, icon: AlertTriangle, tone: analytics.lowStock ? "text-amber-500" : "text-emerald-500", progress: Math.max(0, Math.min(100, analytics.lowStock * 10)) },
              { label: "Out Of Stock Products", value: `${analytics.outOfStock}`, icon: Boxes, tone: analytics.outOfStock ? "text-destructive" : "text-emerald-500", progress: Math.max(0, Math.min(100, analytics.outOfStock * 10)) },
              { label: "Pending Orders", value: `${analytics.pendingOrders}`, icon: PackageCheck, tone: analytics.pendingOrders ? "text-amber-500" : "text-emerald-500", progress: Math.max(0, Math.min(100, analytics.pendingOrders * 10)) },
              { label: "Failed Payments", value: `${payments.filter((payment) => payment.status === "FAILED").length}`, icon: CreditCard, tone: payments.some((payment) => payment.status === "FAILED") ? "text-destructive" : "text-emerald-500", progress: Math.max(0, Math.min(100, payments.filter((payment) => payment.status === "FAILED").length * 10)) },
              { label: "Paid Payments", value: `${payments.filter((payment) => payment.status === "PAID").length}`, icon: CheckCircle2, tone: "text-emerald-500", progress: Math.max(0, Math.min(100, payments.filter((payment) => payment.status === "PAID").length * 10)) },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg border border-border bg-background p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="flex items-center gap-2 text-sm font-black text-foreground">
                      <Icon className={`h-4 w-4 ${item.tone}`} />
                      {item.label}
                    </p>
                    <span className="text-xs font-bold text-muted-foreground">{item.value}</span>
                  </div>
                  <Progress value={item.progress} />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

