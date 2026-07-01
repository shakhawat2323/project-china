"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, FileText, Loader2, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PaymentService } from "@/services/payment.service";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const provider = searchParams.get("provider") || "";
  const paypalToken = searchParams.get("token") || "";
  const shouldCapturePayPal = provider === "paypal" && Boolean(paypalToken);
  const [captureStatus, setCaptureStatus] = useState<"idle" | "capturing" | "done" | "failed">(
    shouldCapturePayPal ? "capturing" : "idle",
  );
  const [message, setMessage] = useState("Thank you for your purchase. Your order has been received and is now being processed by our engineering team.");

  const orderNumber = useMemo(() => (orderId ? `ORD-${orderId.slice(0, 8).toUpperCase()}` : "ORD-PENDING"), [orderId]);

  useEffect(() => {
    if (!shouldCapturePayPal || captureStatus !== "capturing") {
      return;
    }

    PaymentService.capturePayPalOrder(paypalToken)
      .then((result) => {
        setCaptureStatus(result.success ? "done" : "failed");
        setMessage(result.message || "PayPal payment captured successfully.");
      })
      .catch((error) => {
        setCaptureStatus("failed");
        setMessage(error instanceof Error ? error.message : "PayPal payment capture failed.");
      });
  }, [captureStatus, paypalToken, shouldCapturePayPal]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A10] pb-24 pt-32 text-white">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="relative overflow-hidden rounded-[40px] border border-fuchsia-500/20 bg-[#12121A] p-10 text-center shadow-[0_0_100px_-20px_rgba(217,70,239,0.15)] md:p-16">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_40px_rgba(52,211,153,0.3)]">
              {captureStatus === "capturing" ? <Loader2 className="h-12 w-12 animate-spin text-white" /> : <CheckCircle2 className="h-12 w-12 text-white" />}
            </div>

            <h1 className="mb-4 text-4xl font-black md:text-5xl">
              {captureStatus === "capturing" ? "Confirming Payment..." : captureStatus === "failed" ? "Payment Needs Review" : "Payment Successful!"}
            </h1>
            <p className="mx-auto mb-10 max-w-md text-lg text-gray-400">{message}</p>

            <div className="mb-10 grid w-full gap-6 divide-y divide-gray-800 rounded-2xl border border-gray-800 bg-black/50 p-6 text-left sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="flex flex-col pt-2 sm:items-center sm:pt-0 sm:text-center">
                <span className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500">Order Number</span>
                <span className="text-lg font-black text-white">{orderNumber}</span>
              </div>
              <div className="flex flex-col pt-4 sm:items-center sm:pt-0 sm:text-center">
                <span className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500">Provider</span>
                <span className="text-lg font-bold text-fuchsia-400">{provider || "stripe"}</span>
              </div>
              <div className="flex flex-col pt-4 sm:items-center sm:pt-0 sm:text-center">
                <span className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500">Status</span>
                <span className="text-lg font-bold text-white">{captureStatus === "failed" ? "Review" : "Paid"}</span>
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="h-14 w-full rounded-xl bg-white font-bold text-black hover:bg-gray-200">
                <Link href="/dashboard/orders">
                  <Package className="mr-2 h-5 w-5" /> Track Order
                </Link>
              </Button>
              <Button size="lg" asChild variant="outline" className="h-14 w-full rounded-xl border-gray-700 bg-black font-bold text-white hover:bg-gray-800">
                <Link href="/dashboard/payments">
                  <FileText className="mr-2 h-5 w-5 text-gray-400" /> Payment History
                </Link>
              </Button>
            </div>

            <Link href="/products" className="mt-10 inline-flex items-center text-sm font-bold text-gray-500 transition-colors hover:text-fuchsia-400">
              Continue Shopping <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A10] pt-32 text-center text-white">Loading payment status...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
