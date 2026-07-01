"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Globe2, MapPin, RadioTower, ShieldCheck, Sparkles, Truck } from "lucide-react";

const markets = [
  { name: "USA", x: 24, y: 42, metric: "Fast DHL/FedEx routes", tone: "from-blue-500 to-cyan-400" },
  { name: "Europe", x: 50, y: 34, metric: "Industrial customers", tone: "from-indigo-500 to-sky-400" },
  { name: "UK", x: 47, y: 31, metric: "Prototype buyers", tone: "from-cyan-500 to-blue-400" },
  { name: "Germany", x: 53, y: 36, metric: "Automation electronics", tone: "from-violet-500 to-blue-400" },
  { name: "Australia", x: 75, y: 66, metric: "Stable export support", tone: "from-emerald-500 to-cyan-400" },
  { name: "Japan", x: 75, y: 43, metric: "Precision hardware", tone: "from-rose-500 to-cyan-400" },
  { name: "China", x: 68, y: 45, metric: "Factory command hub", tone: "from-amber-500 to-cyan-400" },
];

const routes = [
  "M 350 220 C 250 130, 140 170, 95 255",
  "M 350 220 C 310 120, 225 115, 205 155",
  "M 350 220 C 410 145, 520 150, 590 220",
  "M 350 220 C 405 310, 525 350, 610 315",
  "M 350 220 C 470 205, 545 250, 590 300",
];

export default function GlobalNetworkGlobe() {
  const [activeMarket, setActiveMarket] = useState("USA");
  const active = useMemo(
    () => markets.find((market) => market.name === activeMarket) || markets[0],
    [activeMarket],
  );

  return (
    <section className="premium-section bg-background/70">
      <div className="premium-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="premium-eyebrow">
              <Globe2 className="h-4 w-4" />
              Global manufacturing network
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Your trusted global PCB manufacturing partner.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              A premium worldwide production and logistics experience for engineers, startups, OEMs, and enterprise electronics teams.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { value: "60+", label: "Customer regions", icon: MapPin },
                { value: "24/7", label: "Digital quote flow", icon: RadioTower },
                { value: "QC", label: "Factory inspection", icon: ShieldCheck },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur">
                    <Icon className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-2xl font-black text-foreground">{item.value}</p>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {markets.map((market) => (
                <button
                  key={market.name}
                  type="button"
                  onClick={() => setActiveMarket(market.name)}
                  className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                    activeMarket === market.name
                      ? "border-primary bg-primary text-primary-foreground shadow-glow"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {market.name}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-primary">
                <Truck className="h-4 w-4" />
                Active market signal
              </p>
              <h3 className="mt-3 text-2xl font-black text-foreground">{active.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{active.metric}</p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-primary">
                Talk to global sales <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-2xl items-center justify-center py-8">
            <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2),transparent_62%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_62%)]" />
            <div className="relative aspect-square w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-border bg-card/70 shadow-premium backdrop-blur-xl dark:border-cyan-300/10 dark:bg-[#06111f]/80">
              <div className="premium-grid-bg absolute inset-0 opacity-40" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(96,165,250,0.18),transparent_30%),radial-gradient(circle_at_75%_25%,rgba(34,211,238,0.18),transparent_26%)]" />

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 700 520" role="img" aria-label="Animated global PCB network">
                <defs>
                  <linearGradient id="routeGradient" x1="0" x2="1" y1="0" y2="1">
                    <stop stopColor="currentColor" stopOpacity="0.1" />
                    <stop offset="0.45" stopColor="currentColor" stopOpacity="0.85" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                <g className="text-primary dark:text-cyan-300">
                  {routes.map((route, index) => (
                    <path
                      key={route}
                      d={route}
                      fill="none"
                      stroke="url(#routeGradient)"
                      strokeDasharray="8 12"
                      strokeLinecap="round"
                      strokeWidth={index === 0 ? 2.5 : 1.6}
                      className="global-route"
                      style={{ animationDelay: `${index * 0.45}s` }}
                    />
                  ))}
                </g>
              </svg>

              <div className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.92),rgba(96,165,250,0.26)_28%,rgba(6,17,31,0.88)_72%)] shadow-[inset_-24px_-34px_80px_rgba(2,6,23,0.45),0_0_70px_rgba(37,99,235,0.35)] dark:border-cyan-300/30 dark:bg-[radial-gradient(circle_at_35%_28%,rgba(125,211,252,0.95),rgba(14,165,233,0.28)_30%,rgba(2,6,23,0.92)_74%)]">
                <div className="global-globe-lines absolute inset-0 rounded-full opacity-70" />
                <div className="global-globe-spin absolute inset-[8%] rounded-full border border-white/20" />
                <div className="absolute left-[18%] top-[28%] h-8 w-16 rounded-full bg-cyan-300/25 blur-sm" />
                <div className="absolute right-[18%] top-[44%] h-10 w-20 rounded-full bg-blue-500/20 blur-sm" />
                <div className="absolute bottom-[22%] left-[34%] h-8 w-24 rounded-full bg-emerald-400/15 blur-sm" />
              </div>

              <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/20 global-orbit dark:border-cyan-300/20" />
              <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 dark:border-cyan-300/10" />

              {markets.map((market, index) => (
                <button
                  key={market.name}
                  type="button"
                  onClick={() => setActiveMarket(market.name)}
                  className={`absolute z-10 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black shadow-lg backdrop-blur transition hover:scale-105 ${
                    activeMarket === market.name
                      ? "border-white/70 bg-primary text-white dark:bg-cyan-300 dark:text-slate-950"
                      : "border-white/25 bg-slate-950/65 text-white"
                  }`}
                  style={{ left: `${market.x}%`, top: `${market.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <span className={`h-2.5 w-2.5 rounded-full bg-linear-to-br ${market.tone} global-pulse`} style={{ animationDelay: `${index * 0.28}s` }} />
                  {market.name}
                </button>
              ))}

              <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-2xl border border-white/15 bg-slate-950/70 p-4 text-white backdrop-blur-md sm:grid-cols-3">
                <div>
                  <p className="text-2xl font-black">180+</p>
                  <p className="text-xs text-slate-300">Coverage ready</p>
                </div>
                <div>
                  <p className="text-2xl font-black">99%</p>
                  <p className="text-xs text-slate-300">Quality target</p>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-2xl font-black">
                    <Sparkles className="h-4 w-4 text-cyan-300" />
                    Live
                  </p>
                  <p className="text-xs text-slate-300">Network view</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
