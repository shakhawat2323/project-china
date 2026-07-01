"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight, Layers, Cpu, Settings, Wrench, Shield, Info, PhoneCall } from "lucide-react";

import { useDictionary } from "@/components/providers/language-provider";
import { getNavPageHref, getNavSectionParams } from "@/lib/navigation";
import { sourceDictionary } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Info,
  "about-syspcb": Info,
  products: Cpu,
  "pcb-manufacture": Settings,
  "pcb-assembly": Layers,
  capability: Wrench,
  "value-add-service": Shield,
  contact: PhoneCall,
};


export default function NavSectionPage({
  params,
}: {
  params: Promise<{
    section: string;
  }>;
}) {
  const { section: sectionSlug } = React.use(params);
  const dictionary = useDictionary();
  
  const navItems = dictionary.navbar.navItems;
  const sourceNavItems = sourceDictionary.navbar.navItems;

  const sectionIndex = sourceNavItems.findIndex(
    (item) => slugify(item.title) === sectionSlug
  );

  if (sectionIndex === -1) {
    notFound();
  }

  const localizedSection = navItems[sectionIndex];
  const sourceSection = sourceNavItems[sectionIndex];

  if (!localizedSection || !sourceSection) {
    notFound();
  }

  const IconComponent = sectionIcons[sectionSlug] || Info;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16">
      <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0" />
        <span className="text-foreground truncate">{localizedSection.title}</span>
      </nav>

      <div className="mt-8 rounded-2xl border border-border/70 bg-muted/20 p-8 sm:p-12 md:flex md:items-center md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background px-3 py-1 text-xs font-medium text-primary">
            <IconComponent className="h-4 w-4" />
            Category Explorer
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            {localizedSection.title}
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Select one of the topics below to learn more about our services, standards, and capabilities.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Subtopics under {localizedSection.title}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localizedSection.items.map((pageTitle, pageIdx) => {
            const sourcePageTitle = sourceSection.items[pageIdx];
            if (!sourcePageTitle) return null;

            const href = getNavPageHref(sourceSection.title, sourcePageTitle);

            return (
              <Link key={pageTitle} href={href} className="group">
                <Card className="flex h-full flex-col justify-between border-border/70 p-6 transition duration-300 group-hover:border-primary group-hover:shadow-md">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary">
                      {pageTitle}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      Explore detailed metrics, equipment, and capabilities for {pageTitle.toLowerCase()}.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-primary">
                    Learn more <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-16 rounded-2xl bg-foreground p-8 text-background sm:p-12 md:flex md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Need custom parameters or a quick quote?
          </h2>
          <p className="mt-2 max-w-xl text-sm text-background/70">
            Our engineering team is ready to analyze your PCB design files and provide a technical review with cost evaluation.
          </p>
        </div>
        <div className="mt-6 shrink-0 md:mt-0">
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact/sales-inquiry">Contact Engineering</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
