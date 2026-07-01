"use client";

import { useMemo, useState } from "react";
import { CreditCard, Download, Loader2, RefreshCcw, RotateCcw, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaymentService, type PaymentRecord } from "@/services/payment.service";
import { useAuthStore } from "@/store/authStore";

function money(amount?: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount || 0);
}

export default function PaymentsDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [transactions, setTransactions] = useState<PaymentRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return transactions;

    return transactions.filter((payment) => JSON.stringify(payment).toLowerCase().includes(query));
  }, [search, transactions]);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const result = isAdmin ? await PaymentService.getTransactions() : await PaymentService.getPaymentHistory();
      setTransactions(result as PaymentRecord[]);
      toast.success("Payments loaded successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load payments.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async (payment: PaymentRecord) => {
    if (!isAdmin) {
      toast.error("Only Admin and Super Admin can refund payments.");
      return;
    }

    if (payment.status !== "PAID") {
      toast.error("Only paid payments can be refunded.");
      return;
    }

    setActionId(payment.id);
    try {
      await PaymentService.refundPayment(payment.id);
      toast.success("Refund processed successfully.");
      await loadTransactions();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Refund failed.");
    } finally {
      setActionId(null);
    }
  };

  const handleReceipt = async (paymentId: string) => {
    setActionId(paymentId);
    try {
      await PaymentService.getReceipt(paymentId);
      toast.success("Receipt API loaded successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Receipt failed.");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CreditCard className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black text-foreground">Payment Transactions</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {isAdmin
                ? "Admin/Super Admin সব Stripe, PayPal transaction, receipt এবং refund action manage করতে পারবে।"
                : "Customer নিজের payment history এবং receipt দেখতে পারবে।"}
            </p>
          </div>
          <Button onClick={loadTransactions} disabled={loading} className="rounded-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            Load Payments
          </Button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search transaction, order, status..." className="pl-10" />
          </label>
          <p className="text-sm font-semibold text-muted-foreground">{filteredTransactions.length} payment records</p>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length ? (
                filteredTransactions.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="max-w-[180px] truncate font-mono text-xs">{payment.id}</TableCell>
                    <TableCell className="font-bold">{payment.method}</TableCell>
                    <TableCell>{money(payment.amount, payment.currency || "USD")}</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-black text-primary">{payment.status}</span>
                    </TableCell>
                    <TableCell className="max-w-[160px] truncate font-mono text-xs">{payment.orderId}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleReceipt(payment.id)} disabled={actionId === payment.id}>
                          <Download className="h-4 w-4" />
                          Receipt
                        </Button>
                        {isAdmin ? (
                          <Button variant="destructive" size="sm" onClick={() => handleRefund(payment)} disabled={actionId === payment.id || payment.status !== "PAID"}>
                            {actionId === payment.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                            Refund
                          </Button>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                    No payments loaded yet. Click Load Payments.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
