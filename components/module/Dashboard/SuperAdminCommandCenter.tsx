"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  CreditCard,
  Database,
  LockKeyhole,
  PackageCheck,
  RefreshCcw,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SuperAdminService, type MonitoringStatus, type SecurityCenter, type SuperAdminOverview } from "@/services/super-admin.service";

const numberFormatter = new Intl.NumberFormat("en-US");

function money(value = 0, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

function shortId(id: string) {
  return id.slice(0, 8).toUpperCase();
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex min-h-44 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-center">
      <p className="max-w-xs text-sm font-semibold text-muted-foreground">{text}</p>
    </div>
  );
}

export default function SuperAdminCommandCenter() {
  const [overview, setOverview] = useState<SuperAdminOverview | null>(null);
  const [monitoring, setMonitoring] = useState<MonitoringStatus | null>(null);
  const [security, setSecurity] = useState<SecurityCenter | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [overviewResult, monitoringResult, securityResult] = await Promise.all([
        SuperAdminService.getOverview(),
        SuperAdminService.getMonitoring().catch(() => null),
        SuperAdminService.getSecurityCenter().catch(() => null),
      ]);
      setOverview(overviewResult);
      setMonitoring(monitoringResult);
      setSecurity(securityResult);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Super Admin dashboard load failed.");
      setOverview(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    async function loadInitialDashboard() {
      try {
        const [overviewResult, monitoringResult, securityResult] = await Promise.all([
          SuperAdminService.getOverview(),
          SuperAdminService.getMonitoring().catch(() => null),
          SuperAdminService.getSecurityCenter().catch(() => null),
        ]);

        if (active) {
          setOverview(overviewResult);
          setMonitoring(monitoringResult);
          setSecurity(securityResult);
        }
      } catch (error) {
        if (active) {
          toast.error(error instanceof Error ? error.message : "Super Admin dashboard load failed.");
          setOverview(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadInitialDashboard();

    return () => {
      active = false;
    };
  }, []);

  const statCards = useMemo(() => {
    const totals = overview?.totals;

    return [
      { label: "Total Revenue", value: money(totals?.revenue || 0), helper: "Paid platform revenue", icon: TrendingUp, tone: "from-cyan-500/25 to-cyan-500/5" },
      { label: "Total Orders", value: numberFormatter.format(totals?.orders || 0), helper: `${totals?.pendingOrders || 0} pending`, icon: PackageCheck, tone: "from-blue-500/25 to-blue-500/5" },
      { label: "Customers", value: numberFormatter.format(totals?.customers || 0), helper: "Registered buyers", icon: Users, tone: "from-emerald-500/25 to-emerald-500/5" },
      { label: "Products", value: numberFormatter.format(totals?.products || 0), helper: `${totals?.lowStockProducts || 0} low stock`, icon: Boxes, tone: "from-amber-500/25 to-amber-500/5" },
      { label: "Admins", value: numberFormatter.format(totals?.admins || 0), helper: "Operational accounts", icon: ShieldCheck, tone: "from-indigo-500/25 to-indigo-500/5" },
      { label: "Transactions", value: numberFormatter.format(totals?.transactions || 0), helper: "Stripe/PayPal records", icon: CreditCard, tone: "from-sky-500/25 to-sky-500/5" },
    ];
  }, [overview]);

  const revenueData = overview?.monthlyRevenue || [];
  const orderStatusData = overview?.orderStatus || [];
  const paymentMethodData = Object.entries(overview?.paymentMethods || {}).map(([method, count]) => ({ method, count }));

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#07111f] p-6 text-white shadow-2xl">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="relative grid gap-6 xl:grid-cols-[1fr_360px] xl:items-end">
          <div>
            <Badge className="rounded-full border-white/15 bg-white/10 px-4 py-2 text-white hover:bg-white/15">
              <ShieldCheck className="h-4 w-4" />
              PCB Enterprise Super Admin
            </Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
              Complete platform control for PCB manufacturing operations.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
              Monitor revenue, orders, products, admins, security, settings, audit logs, payments, and system health from one premium command center.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { label: "Admin Management", href: "/super-admin/admin-management" },
                { label: "Roles", href: "/super-admin/roles-permissions" },
                { label: "Settings", href: "/super-admin/settings" },
                { label: "Security", href: "/super-admin/security-center" },
              ].map((item) => (
                <Button key={item.href} asChild variant="secondary" className="rounded-full bg-white/10 text-white hover:bg-white/20">
                  <Link href={item.href}>
                    {item.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <Card className="border-white/10 bg-white/10 text-white backdrop-blur-xl">
            <CardHeader>
              <CardTitle>System Pulse</CardTitle>
              <CardDescription className="text-slate-300">Backend monitoring and security signals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "API", value: monitoring?.api.status || "UNKNOWN", icon: Database },
                { label: "Database", value: monitoring?.database.status || "UNKNOWN", icon: Database },
                { label: "Blocked Users", value: String(security?.summary.blockedUsers ?? 0), icon: LockKeyhole },
                { label: "Security Events", value: String(security?.summary.securityEvents ?? 0), icon: AlertTriangle },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-200">
                      <Icon className="h-4 w-4 text-cyan-200" />
                      {item.label}
                    </span>
                    <span className="text-sm font-black">{item.value}</span>
                  </div>
                );
              })}
              <Button onClick={loadDashboard} disabled={loading} className="w-full rounded-full">
                <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh Live Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {statCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className={`overflow-hidden border-border/80 bg-linear-to-br ${item.tone} shadow-sm transition hover:-translate-y-0.5 hover:shadow-premium`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{item.label}</p>
                    <p className="mt-2 text-2xl font-black text-foreground">{item.value}</p>
                    <p className="mt-1 text-xs font-semibold text-muted-foreground">{item.helper}</p>
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-background/70 text-primary shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>Monthly paid revenue from backend payment records.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {revenueData.length ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="superRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => money(Number(value))} />
                    <Area type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={3} fill="url(#superRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState text="No paid payment records found yet. Revenue chart will appear when payments are completed." />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Super Admin controls without vendor-specific items.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              { label: "Create Admin", href: "/super-admin/admin-management", icon: Users },
              { label: "Manage Roles", href: "/super-admin/roles-permissions", icon: ShieldCheck },
              { label: "Payment Control", href: "/super-admin/payments", icon: CreditCard },
              { label: "System Settings", href: "/super-admin/settings", icon: Settings },
              { label: "Audit Logs", href: "/super-admin/audit-logs", icon: LockKeyhole },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex items-center justify-between rounded-xl border border-border bg-background p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm">
                  <span className="flex items-center gap-3 text-sm font-black text-foreground">
                    <Icon className="h-4 w-4 text-primary" />
                    {item.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
            <CardDescription>Live counts grouped by manufacturing workflow status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              {orderStatusData.length ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={orderStatusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="status" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState text="No order records returned by backend yet." />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Stripe, PayPal, bank transfer and other backend methods.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethodData.length ? (
              paymentMethodData.map((item) => (
                <div key={item.method} className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                  <span className="text-sm font-black">{item.method}</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">{item.count}</span>
                </div>
              ))
            ) : (
              <EmptyState text="No payment method records found yet." />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders from backend.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overview?.recentOrders.length ? (
                    overview.recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-xs">{shortId(order.id)}</TableCell>
                        <TableCell>{order.user?.name || order.user?.email || "Customer"}</TableCell>
                        <TableCell><Badge variant="secondary">{order.status}</Badge></TableCell>
                        <TableCell>{money(order.totalAmount)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">No recent orders.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Latest transaction records.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {overview?.recentPayments.length ? (
              overview.recentPayments.map((payment) => (
                <div key={payment.id} className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-xs text-muted-foreground">{shortId(payment.id)}</p>
                    <Badge variant={payment.status === "PAID" ? "default" : "secondary"}>{payment.status}</Badge>
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-sm font-black">{payment.method}</p>
                      <p className="text-xs text-muted-foreground">{new Date(payment.createdAt).toLocaleString()}</p>
                    </div>
                    <p className="text-lg font-black">{money(payment.amount, payment.currency || "USD")}</p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState text="No recent payments." />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

