"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import {
  Bell,
  Boxes,
  Building2,
  ClipboardList,
  CreditCard,
  Database,
  Headphones,
  Home,
  KeyRound,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  MessageCircle,
  PackageCheck,
  Percent,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  Star,
  UserRound,
  Users,
  AlertTriangle,
  BarChart3,
  Menu,
} from "lucide-react";

import UserAccountMenu from "@/components/module/Home/UserAccountMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { normalizeRole } from "@/lib/auth-routes";
import { useAuthStore } from "@/store/authStore";

const adminNavGroups = [
  {
    title: "Admin Dashboard",
    items: [
      { label: "Admin Overview", href: "/admin", icon: LayoutDashboard },
      { label: "Products", href: "/admin/products", icon: Boxes },
      { label: "Categories", href: "/admin/categories", icon: Layers3 },
      { label: "Brands", href: "/admin/brands", icon: Building2 },
      { label: "Inventory", href: "/admin/inventory", icon: Boxes },
      { label: "Orders", href: "/admin/orders", icon: PackageCheck },
      { label: "Customers", href: "/admin/customers", icon: Users },
      { label: "Reviews", href: "/admin/reviews", icon: Star },
      { label: "Coupons", href: "/admin/coupons", icon: Percent },
      { label: "Payments", href: "/admin/payments", icon: CreditCard },
      { label: "Reports", href: "/admin/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Admin Communication",
    items: [
      { label: "Support", href: "/admin/support", icon: Headphones },
      { label: "Live Chat", href: "/admin/chat", icon: MessageCircle },
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
    ],
  },
  {
    title: "Admin Account",
    items: [
      { label: "My Profile", href: "/admin/profile", icon: UserRound },
      { label: "Change Password", href: "/admin/change-password", icon: KeyRound },
    ],
  },
];

const superAdminNavGroups = [
  {
    title: "Super Admin",
    items: [
      { label: "Platform Overview", href: "/super-admin", icon: ShieldCheck },
      { label: "Admin Management", href: "/super-admin/admin-management", icon: Users },
      { label: "Roles & Permissions", href: "/super-admin/roles-permissions", icon: LockKeyhole },
      { label: "System Settings", href: "/super-admin/settings", icon: Settings },
      { label: "Security Center", href: "/super-admin/security-center", icon: AlertTriangle },
      { label: "System Monitoring", href: "/super-admin/system-monitoring", icon: Database },
      { label: "Audit Logs", href: "/super-admin/audit-logs", icon: ClipboardList },
      { label: "Business Analytics", href: "/super-admin/business-analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Platform Controls",
    items: [
      { label: "Payments", href: "/super-admin/payments", icon: CreditCard },
      { label: "RBAC", href: "/super-admin/rbac", icon: ShieldCheck },
      { label: "Realtime Console", href: "/super-admin/realtime", icon: Radio },
    ],
  },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const currentRole = normalizeRole(user?.role);

  const requiredRole = pathname.startsWith("/super-admin")
    ? "SUPER_ADMIN"
    : pathname.startsWith("/admin")
      ? "ADMIN"
      : pathname.startsWith("/dashboard")
        ? "CUSTOMER"
        : null;

  const allowed = !requiredRole || currentRole === requiredRole;

  const navGroups = useMemo(() => {
    if (pathname.startsWith("/super-admin") || currentRole === "SUPER_ADMIN") {
      return superAdminNavGroups;
    }

    if (pathname.startsWith("/admin") || currentRole === "ADMIN") {
      return adminNavGroups;
    }

    return [];
  }, [currentRole, pathname]);

  const workspaceTitle = currentRole === "SUPER_ADMIN" ? "PCB Super Admin" : currentRole === "ADMIN" ? "PCB Admin" : "Customer Portal";
  const workspaceSubtitle = currentRole === "SUPER_ADMIN" ? "Global platform control" : currentRole === "ADMIN" ? "Operations command" : "Account workspace";
  const sidebarContent = (
    <>
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
        <div className="flex size-11 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.35)]">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-black text-white">{workspaceTitle}</p>
          <p className="text-xs text-slate-400">{workspaceSubtitle}</p>
        </div>
      </div>

      <div className="mx-4 mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-inner">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Current Workspace</p>
        <p className="mt-2 text-sm font-bold text-white">{currentRole.replace("_", " ")} Dashboard</p>
        <p className="mt-1 truncate text-xs text-slate-400">{user?.email}</p>
      </div>

      <nav className="h-[calc(100vh-9rem)] space-y-6 overflow-y-auto p-4">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              {group.title}
            </p>
            <div className="grid gap-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                      active
                        ? "bg-cyan-500 text-white shadow-[0_0_24px_rgba(6,182,212,0.25)]"
                        : "text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </>
  );

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace("/login");
  }, [isLoading, router, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/25">
        <div className="rounded-xl border border-border bg-card p-6 text-sm font-bold text-muted-foreground shadow-sm">
          Loading secure dashboard...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/25 p-6">
        <div className="max-w-md rounded-2xl border border-destructive/30 bg-card p-8 text-center shadow-premium">
          <ShieldCheck className="mx-auto h-10 w-10 text-destructive" />
          <h1 className="mt-4 text-2xl font-black text-foreground">Access restricted</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This dashboard is only for {requiredRole?.replace("_", " ")} users. Please login with the correct account.
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/login">Login Again</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.09),transparent_34%),hsl(var(--muted)/0.25)] dark:bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_38%),#050b14]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-80 border-r border-white/10 bg-[#07111f]/95 text-white shadow-2xl backdrop-blur-xl lg:block">
        {sidebarContent}
      </aside>

      <div className="lg:pl-80">
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 shadow-sm backdrop-blur-xl">
          <div className="flex min-h-[72px] items-center gap-3 px-4 py-3 sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full lg:hidden" aria-label="Open dashboard navigation">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm border-white/10 bg-[#07111f] p-0 text-white">
                {sidebarContent}
              </SheetContent>
            </Sheet>
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <Link href="/" aria-label="Back home">
                <Home className="h-4 w-4" />
              </Link>
            </Button>
            <div className="relative hidden flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="h-11 rounded-full border-border/80 bg-muted/60 pl-9 shadow-inner" placeholder="Search orders, products, customers, payments, reports..." />
            </div>
            <span className="hidden rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-black text-cyan-600 dark:text-cyan-200 sm:inline-flex">
              {currentRole.replace("_", " ")}
            </span>
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <Link href={currentRole === "SUPER_ADMIN" ? "/super-admin" : currentRole === "ADMIN" ? "/admin/notifications" : "/dashboard/notifications"} aria-label="Notifications" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1 top-1 size-2 rounded-full bg-primary" />
              </Link>
            </Button>
            {user ? <UserAccountMenu user={user} /> : null}
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

