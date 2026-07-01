"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreditCard, Loader2, ShieldCheck, WalletCards } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CartService } from "@/services/cart.service";
import { OrderService } from "@/services/order.service";
import { PaymentService } from "@/services/payment.service";
import { useAuthStore } from "@/store/authStore";
import { getCartSummary, useCartStore } from "@/store/cartStore";

type PaymentMethod = "stripe" | "paypal";
type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

type FormErrors = Partial<Record<keyof CheckoutForm | "paymentMethod" | "cart", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-\s0-9]{7,20}$/;

function validateCheckoutForm(form: CheckoutForm, paymentMethod: PaymentMethod, itemCount: number) {
  const errors: FormErrors = {};

  if (!form.fullName.trim() || form.fullName.trim().length < 3) {
    errors.fullName = "Full name কমপক্ষে 3 character হতে হবে।";
  }

  if (!emailPattern.test(form.email.trim())) {
    errors.email = "Valid email address দিন।";
  }

  if (!phonePattern.test(form.phone.trim())) {
    errors.phone = "Valid phone number দিন।";
  }

  if (!form.address.trim() || form.address.trim().length < 10) {
    errors.address = "Shipping address কমপক্ষে 10 character হতে হবে।";
  }

  if (!form.city.trim() || form.city.trim().length < 2) {
    errors.city = "City name required।";
  }

  if (form.postalCode.trim() && form.postalCode.trim().length < 3) {
    errors.postalCode = "Postal code valid হতে হবে।";
  }

  if (!["stripe", "paypal"].includes(paymentMethod)) {
    errors.paymentMethod = "Payment method select করুন।";
  }

  if (itemCount < 1) {
    errors.cart = "Cart empty। Product add করুন।";
  }

  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const summary = getCartSummary(items);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<CheckoutForm>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handlePayNow = async () => {
    if (!user) {
      toast.error("Please login before placing an order.");
      router.push("/login");
      return;
    }

    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }

    const errors = validateCheckoutForm(form, paymentMethod, items.length);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0] || "Please complete checkout information.");
      return;
    }

    setLoading(true);
    try {
      for (const item of items) {
        await CartService.addToCart({ productId: item.product.id, quantity: item.quantity });
      }

      const shippingAddress = `${form.fullName.trim()}, ${form.phone.trim()}, ${form.address.trim()}, ${form.city.trim()}, ${form.postalCode.trim()}`;
      const order = await OrderService.createOrderFromCart({ shippingAddress, billingAddress: shippingAddress }) as { id?: string };
      if (!order.id) {
        throw new Error("Order was created but order ID was not returned.");
      }

      const checkout =
        paymentMethod === "stripe"
          ? await PaymentService.createStripeCheckout(order.id)
          : await PaymentService.createPayPalOrder(order.id);

      if (!checkout.checkoutUrl) {
        throw new Error(`${paymentMethod === "stripe" ? "Stripe" : "PayPal"} checkout URL was not returned.`);
      }

      clearCart();
      toast.success(`Redirecting to ${paymentMethod === "stripe" ? "Stripe" : "PayPal"} payment...`);
      window.location.href = checkout.checkoutUrl;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to place order.";
      toast.error(
        message.includes("Product not found")
          ? "One cart product is no longer available. Please refresh products and add it again."
          : message.includes("PayPal credentials are invalid")
            ? "PayPal credential problem. Please check PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET and PAYPAL_MODE."
          : message,
      );
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <main className="premium-section min-h-screen">
        <div className="premium-container text-center">
          <h1 className="text-3xl font-black text-foreground">No items to checkout</h1>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="premium-section min-h-screen">
      <div className="premium-container">
        <div className="mb-8">
          <p className="premium-eyebrow">
            <ShieldCheck className="h-4 w-4" />
            Secure Checkout
          </p>
          <h1 className="mt-4 text-4xl font-black text-foreground">Complete your order</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-black text-foreground">Customer Information</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                ["fullName", "Full Name", "Your full name"],
                ["email", "Email", "name@company.com"],
                ["phone", "Phone Number", "+880 1XXXXXXXXX"],
                ["city", "City", "Dhaka"],
                ["postalCode", "Postal Code", "1207"],
              ].map(([key, label, placeholder]) => (
                <label key={key} className="space-y-2">
                  <span className="text-sm font-bold text-foreground">{label}</span>
                  <Input
                    value={form[key as keyof typeof form]}
                    placeholder={placeholder}
                    aria-invalid={Boolean(fieldErrors[key as keyof CheckoutForm])}
                    className={fieldErrors[key as keyof CheckoutForm] ? "border-destructive focus-visible:ring-destructive/30" : undefined}
                    onChange={(event) => {
                      const value = event.target.value;
                      setForm((current) => ({ ...current, [key]: value }));
                      setFieldErrors((current) => ({ ...current, [key]: undefined }));
                    }}
                  />
                  {fieldErrors[key as keyof CheckoutForm] ? (
                    <p className="text-xs font-semibold text-destructive">{fieldErrors[key as keyof CheckoutForm]}</p>
                  ) : null}
                </label>
              ))}
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-bold text-foreground">Shipping Address</span>
                <Textarea
                  value={form.address}
                  placeholder="House, road, area, city, country"
                  aria-invalid={Boolean(fieldErrors.address)}
                  className={fieldErrors.address ? "border-destructive focus-visible:ring-destructive/30" : undefined}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, address: event.target.value }));
                    setFieldErrors((current) => ({ ...current, address: undefined }));
                  }}
                  rows={4}
                />
                {fieldErrors.address ? <p className="text-xs font-semibold text-destructive">{fieldErrors.address}</p> : null}
              </label>
            </div>
          </section>

          <aside className="h-fit rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-black text-foreground">Order Summary</h2>
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="relative size-16 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.product.images?.[0] || "/image/chinaproject.png"}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-foreground">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {item.quantity} x ${(item.product.price || 0).toFixed(2)}</p>
                  </div>
                  <p className="text-sm font-black">${((item.product.price || 0) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><strong>${summary.subtotal.toFixed(2)}</strong></div>
              <div className="flex justify-between text-success"><span>Discount</span><strong>-${summary.discount.toFixed(2)}</strong></div>
              <div className="flex justify-between"><span>Shipping</span><strong>${summary.shipping.toFixed(2)}</strong></div>
              <div className="flex justify-between pt-2 text-lg"><span>Grand Total</span><strong>${summary.grandTotal.toFixed(2)}</strong></div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-sm font-black text-foreground">Payment Method</p>
              <div className="grid gap-3">
                {[
                  { id: "stripe" as const, label: "Credit/Debit Card", note: "Pay securely with Stripe", icon: CreditCard },
                  { id: "paypal" as const, label: "PayPal", note: "Pay using PayPal checkout", icon: WalletCards },
                ].map((method) => {
                  const Icon = method.icon;
                  const active = paymentMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(method.id);
                        setFieldErrors((current) => ({ ...current, paymentMethod: undefined }));
                      }}
                      className={`flex items-center gap-3 rounded-lg border p-3 text-left transition ${
                        active ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>
                        <span className="block text-sm font-black">{method.label}</span>
                        <span className="block text-xs text-muted-foreground">{method.note}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              {fieldErrors.paymentMethod ? <p className="text-xs font-semibold text-destructive">{fieldErrors.paymentMethod}</p> : null}
            </div>

            <Button className="mt-6 w-full rounded-full" onClick={handlePayNow} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Pay with {paymentMethod === "stripe" ? "Stripe Card" : "PayPal"}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Your order will be created first, then you will complete secure payment on the selected gateway.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
