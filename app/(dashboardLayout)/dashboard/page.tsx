import Link from "next/link";
import { CreditCard, FileArchive, PackageCheck, Settings, ShoppingCart, UserRound } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const customerLinks = [
  { title: "My Orders", description: "Track production, shipping, invoice, and order history.", href: "/dashboard/orders", icon: PackageCheck },
  { title: "My Cart", description: "Review selected products before checkout.", href: "/dashboard/cart", icon: ShoppingCart },
  { title: "Quotes", description: "Create PCB quotes and convert approved quotes to orders.", href: "/dashboard/quotes", icon: FileArchive },
  { title: "Payments", description: "View payment history and receipts.", href: "/dashboard/payments", icon: CreditCard },
  { title: "Profile", description: "Manage personal, company, and address information.", href: "/dashboard/profile", icon: UserRound },
  { title: "Settings", description: "Update password and account security preferences.", href: "/dashboard/settings", icon: Settings },
];

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-3xl font-black text-foreground">Customer Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Your customer workspace for PCB orders, quote requests, payments, support, and account management.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {customerLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-premium">
                <CardHeader>
                  <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
