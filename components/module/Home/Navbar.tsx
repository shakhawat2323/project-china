"use client";

import { useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AU,
  BD,
  BR,
  CA,
  CN,
  DE,
  ES,
  FR,
  GB,
  IN,
  IT,
  JP,
  KR,
  PK,
  RU,
  SA,
  TR,
  US,
  AE,
  ZA,
} from "country-flag-icons/react/3x2";
import { ChevronDown, Globe2, Menu, ShoppingCart, UserRound, X } from "lucide-react";

import { ModeToggle } from "@/components/themes/darkandlight";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDictionary, useLanguage } from "@/components/providers/language-provider";
import {
  type CountryCode,
  type CountryOption,
  type NavItem,
  sourceDictionary,
} from "@/lib/i18n";
import { getNavPageHref, getNavSectionHref } from "@/lib/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import UserAccountMenu from "./UserAccountMenu";

function navPillClass(isActive: boolean) {
  return [
    "rounded-full border px-3 py-2 text-sm font-semibold transition-all duration-200",
    isActive
      ? "border-primary/45 bg-primary/10 text-primary shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_16%,transparent)]"
      : "border-transparent text-muted-foreground hover:border-primary/25 hover:bg-primary/10 hover:text-primary",
  ].join(" ");
}

const flagComponents: Partial<
  Record<CountryCode, ComponentType<{ className?: string; title?: string }>>
> = {
  AU,
  BD,
  BR,
  CA,
  CN,
  DE,
  ES,
  FR,
  GB,
  IN,
  IT,
  JP,
  KR,
  PK,
  RU,
  SA,
  TR,
  US,
  AE,
  ZA,
};

function CountryFlag({ country, className }: { country: CountryOption; className?: string }) {
  const Flag = flagComponents[country.countryCode];

  if (!Flag) {
    return <span className={className ?? "h-4 w-6 rounded bg-muted"} />;
  }

  return <Flag title={country.label} className={className ?? "h-4 w-6 rounded object-cover"} />;
}

function LanguageSelector() {
  const { countryOptions, selectedCountry, setSelectedCountry } = useLanguage();
  const dictionary = useDictionary();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full px-3">
          <Globe2 className="hidden h-4 w-4 sm:block" />
          <CountryFlag country={selectedCountry} className="h-4 w-6 rounded-sm" />
          <span className="hidden text-xs font-bold sm:inline">{selectedCountry.shortLabel}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-2xl p-2">
        <DropdownMenuLabel>{dictionary.navbar.selectCountry}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid gap-2 sm:grid-cols-2">
          {countryOptions.map((country) => {
            const active = country.countryCode === selectedCountry.countryCode;

            return (
              <button
                key={country.countryCode}
                type="button"
                onClick={() => setSelectedCountry(country)}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-left transition-all ${
                  active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/70 bg-background/70 hover:border-primary/40 hover:bg-muted"
                }`}
              >
                <CountryFlag country={country} className="h-5 w-7 rounded-sm" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{country.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {country.nativeLabel}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DesktopNavItem({ item, sourceItem }: { item: NavItem; sourceItem: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const sectionHref = getNavSectionHref(sourceItem.title);
  const isActive = pathname === sectionHref || pathname.startsWith(`${sectionHref}/`);

  const openMenu = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    setIsOpen(true);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setIsOpen(false), 320);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <div
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        className={`group flex cursor-pointer items-center ${navPillClass(isActive)} px-1`}
      >
        <Link href={getNavSectionHref(sourceItem.title)} className="px-3 py-2 pr-1">
          {item.title}
        </Link>
        <DropdownMenuTrigger
          className="flex items-center py-2 pr-3 outline-none"
          aria-label={`${item.title} menu`}
        >
          <ChevronDown className="h-4 w-4 opacity-70 transition-transform group-hover:rotate-180 group-hover:opacity-100" />
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent
        align="start"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        sideOffset={4}
        className="w-72 rounded-2xl border-border/80 bg-card/95 p-2 shadow-premium backdrop-blur-2xl"
      >
        {item.items.map((sub, index) => (
          <DropdownMenuItem
            key={sub}
            asChild
            className="mb-1 cursor-pointer rounded-xl p-0 text-foreground focus:bg-transparent focus:text-foreground"
          >
            <Link
              href={getNavPageHref(sourceItem.title, sourceItem.items[index] ?? sub)}
              className="flex w-full items-center rounded-xl border border-transparent px-3 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary focus-visible:border-primary/40"
            >
              <span className="mr-3 h-1.5 w-1.5 rounded-full bg-primary/70 opacity-70" />
              <span>{sub}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProductsMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isActive = pathname === "/products" || pathname.startsWith("/products/");

  const openMenu = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setIsOpen(true);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setIsOpen(false), 320);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <div
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        className={`group mx-2 flex cursor-pointer items-center ${navPillClass(isActive)} px-1 font-black`}
      >
        <Link href="/products" className="px-4 py-2 pr-1">
          Products
        </Link>
        <DropdownMenuTrigger
          className="flex items-center py-2 pr-3 outline-none"
          aria-label="Products menu"
        >
          <ChevronDown className="h-4 w-4 opacity-80 transition-transform group-hover:rotate-180" />
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent
        align="start"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        sideOffset={4}
        className="w-[min(760px,calc(100vw-2rem))] rounded-3xl border-border/80 bg-card/95 p-3 text-foreground shadow-premium backdrop-blur-2xl"
      >
        <div className="mb-3 rounded-2xl border border-border/70 bg-background/70 p-4">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">
            PCB Product Center
          </p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Browse PCB products, manufacturing capabilities, and assembly services from one clean menu.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {[
            {
              title: "PCB Products",
              href: "/products?category=PCB%20Fabrication",
              items: ["Rigid PCB", "Flexible PCB", "Rigid-Flex PCB", "Aluminum PCB", "High Frequency PCB", "HDI PCB"],
            },
            {
              title: "PCBA Products",
              href: "/products?category=PCBA",
              items: ["SMT Assembly", "THT Assembly", "Box Build Assembly", "Turnkey Assembly", "Engineering Service"],
            },
          ].map((group) => (
            <div key={group.title} className="rounded-2xl border border-border/70 bg-background/55 p-2">
              <Link
                href={group.href}
                className="block rounded-xl border border-transparent px-3 py-2 text-sm font-black text-foreground transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
              >
                {group.title}
              </Link>
              <div className="mt-1 grid gap-1">
                {group.items.map((sub) => (
                  <Link
                    key={sub}
                    href={`/products?category=${encodeURIComponent(group.title === "PCBA Products" ? "PCBA" : sub)}`}
                    className="rounded-xl border border-transparent px-3 py-2 text-sm font-semibold text-muted-foreground transition-all hover:border-primary/25 hover:bg-primary/10 hover:text-primary"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProductsMobileGroup({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  return (
    <details className="rounded-2xl border border-primary/20 bg-primary/5">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-black text-primary">
        Products
        <ChevronDown className="h-4 w-4" />
      </summary>
      <div className="grid gap-2 border-t border-border/70 p-2">
        <Link
          href="/products"
          onClick={onNavigate}
          className="rounded-xl bg-[image:var(--gradient-primary)] px-3 py-2 text-sm font-bold text-primary-foreground"
        >
          All Products
        </Link>
        {[
          {
            title: "PCB Products",
            href: "/products?category=PCB%20Fabrication",
            items: ["Rigid PCB", "Flexible PCB", "Rigid-Flex PCB", "Aluminum PCB", "High Frequency PCB", "HDI PCB"],
          },
          {
            title: "PCBA Products",
            href: "/products?category=PCBA",
            items: ["SMT Assembly", "THT Assembly", "Box Build Assembly", "Turnkey Assembly", "Engineering Service"],
          },
        ].map((group) => (
          <div key={group.title} className="rounded-xl bg-background/70 p-2">
            <Link
              href={group.href}
              onClick={onNavigate}
              className="block rounded-lg px-2 py-2 text-sm font-black text-foreground hover:bg-muted"
            >
              {group.title}
            </Link>
            {group.items.map((sub) => (
              <Link
                key={sub}
                href={`/products?category=${encodeURIComponent(group.title === "PCBA Products" ? "PCBA" : sub)}`}
                onClick={onNavigate}
                className="block rounded-lg px-2 py-2 text-sm font-semibold text-muted-foreground hover:bg-primary/10 hover:text-primary"
              >
                {sub}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </details>
  );
}

function MobileNavItem({
  item,
  sourceItem,
  onNavigate,
}: {
  item: NavItem;
  sourceItem: NavItem;
  onNavigate: () => void;
}) {
  return (
    <details className="rounded-2xl border border-border/70 bg-background/70">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-bold">
        <Link
          href={getNavSectionHref(sourceItem.title)}
          onClick={(event) => {
            event.stopPropagation();
            onNavigate();
          }}
        >
          {item.title}
        </Link>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </summary>
      <div className="grid gap-1 border-t border-border/70 p-2">
        {item.items.map((sub, index) => (
          <Link
            key={sub}
            href={getNavPageHref(sourceItem.title, sourceItem.items[index] ?? sub)}
            onClick={onNavigate}
            className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {sub}
          </Link>
        ))}
      </div>
    </details>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const dictionary = useDictionary();
  const navItems = dictionary.navbar.navItems;
  const sourceNavItems = sourceDictionary.navbar.navItems;
  const homeItem = navItems[0];
  const navPairs = navItems.slice(1).map((item, index) => ({
    item,
    sourceItem: sourceNavItems[index + 1] ?? item,
  }));
  const productGroupTitles = new Set(["Products"]);
  const dropdownNavItems = navPairs.filter(({ sourceItem }) => !productGroupTitles.has(sourceItem.title));
  const { user } = useAuthStore();
  const cartCount = useCartStore((state) => state.items.length);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 shadow-sm backdrop-blur-2xl">
      <div className="premium-container">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src="/image/chinaproject.png"
              alt={dictionary.navbar.logoAlt}
              width={72}
              height={72}
              className="shrink-0 object-contain drop-shadow-[0_12px_30px_rgba(37,99,235,0.18)]"
              style={{ width: "auto", height: "64px" }}
              priority
            />
            <span className="hidden min-w-0 md:block">
              <span className="block text-[10px] font-black uppercase tracking-[0.28em] text-primary">
                {dictionary.navbar.badge}
              </span>
              <span className="line-clamp-2 text-sm font-black leading-snug tracking-tight text-foreground lg:text-xl">
                {dictionary.navbar.companyName}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <Link href="/cart" aria-label="Shopping cart" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 ? (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-black text-primary-foreground ring-2 ring-background">
                    {cartCount}
                  </span>
                ) : null}
              </Link>
            </Button>
            {user?.email ? (
              <UserAccountMenu user={user} />
            ) : (
              <Button asChild variant="outline" size="icon" className="rounded-full">
                <Link href="/login" aria-label={dictionary.navbar.login}>
                  <UserRound className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <ModeToggle />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full md:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div className="hidden border-t border-border/60 md:block">
          <nav className="flex flex-wrap items-center gap-1 py-2">
            {homeItem ? (
              <Link
                href="/"
                className={navPillClass(pathname === "/")}
              >
                {homeItem.title}
              </Link>
            ) : null}

            <ProductsMegaMenu />

            {dropdownNavItems.map(({ item, sourceItem }) => (
              <DesktopNavItem
                key={item.title}
                item={item}
                sourceItem={sourceItem}
              />
            ))}
          </nav>
        </div>

        {mobileOpen ? (
          <div className="pb-4 md:hidden">
            <div className="premium-glass grid gap-2 rounded-3xl p-3">
              {homeItem ? (
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-bold hover:bg-muted"
                >
                  {homeItem.title}
                </Link>
              ) : null}
              <ProductsMobileGroup
                onNavigate={() => setMobileOpen(false)}
              />
              {dropdownNavItems.map(({ item, sourceItem }) => (
                <MobileNavItem
                  key={item.title}
                  item={item}
                  sourceItem={sourceItem}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
