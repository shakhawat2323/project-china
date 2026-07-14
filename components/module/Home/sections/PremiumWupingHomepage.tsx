"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  Building2,
  ChevronRight,
  Clock3,
  Cpu,
  Mail,
  MessageCircle,
  Phone,
  Play,
  Quote,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  UploadCloud,
  Zap,
} from "lucide-react";
import { ProductCard } from "@/app/(commonLayout)/products/ProductCard";
import { useDictionary } from "@/components/providers/language-provider";
import { getPcbYoutubeEmbedUrl } from "@/lib/youtube-videos";
import type { IProduct } from "@/services/product.service";
import type { IPage } from "@/services/page.service";
import GlobalNetworkGlobe from "./GlobalNetworkGlobe";

import { Globe } from "@/components/ui/globe"
// import SignalFanBeamAnimation from "../animations/SignalFanBeamAnimation";
const pcbImages = ["/image/pcb1.png", "/image/pcb2.png", "/image/pcb3.png", "/image/pcb4.png"];

const stats = [
  { value: "15+", label: "Years manufacturing experience" },
  { value: "18,000m2", label: "Modern production facility" },
  { value: "50,000m2", label: "Monthly PCB capacity" },
  { value: "60+", label: "Global customer regions" },
];

const manufacturingServices = [
  ["Rigid PCB", "High precision single, double, and multilayer rigid PCB fabrication."],
  ["Flexible PCB", "Lightweight flex circuits for compact electronics and wearable devices."],
  ["Rigid-Flex PCB", "Integrated rigid-flex boards for high reliability electronic systems."],
  ["Aluminum PCB", "Thermal management PCB solutions for LED and power electronics."],
  ["High Frequency PCB", "RF, microwave, and communication PCB with advanced materials."],
  ["HDI PCB", "Fine line, microvia, and high-density interconnect PCB production."],
];

const assemblyServices = [
  ["SMT Assembly", "Automated placement, reflow, AOI, and full process traceability."],
  ["THT Assembly", "Through-hole soldering for connectors, power modules, and mixed boards."],
  ["Box Build Assembly", "Complete electromechanical integration, testing, and packing."],
  ["Turnkey Assembly", "PCB fabrication, components sourcing, assembly, inspection, and delivery."],
];

const fallbackShowcaseProducts = [
  ["Multilayer PCB", "Premium fabrication for industrial electronics and IoT devices."],
  ["PCB Assembly", "SMT and mixed assembly with BOM support and quality reports."],
  ["Engineering Service", "DFM, stackup, impedance, panelization, and production consulting."],
  ["Prototype PCB", "Fast-turn prototyping for engineers and product development teams."],
  ["Power Electronics PCB", "Heavy copper and thermal design for power systems."],
  ["Communication PCB", "High-frequency boards for connected devices and infrastructure."],
];


const advantages = [
  ["High Quality", "Strict inspection from incoming material to final shipment.", ShieldCheck],
  ["Fast Delivery", "Prototype and production schedules built for urgent launches.", Clock3],
  ["Competitive Pricing", "Efficient factory operation with transparent quotation support.", Sparkles],
  ["Advanced Technology", "HDI, impedance, high-frequency, and assembly capability.", Cpu],
  ["Global Shipping", "Reliable export process for customers across major markets.", Truck],
];

const certifications = ["ISO 9001", "RoHS", "UL", "IPC-A-600", "IPC-A-610", "IATF Process Control"];

const testimonials = [
  {
    name: "Michael R.",
    company: "Industrial Control Manufacturer",
    text: "Wuping Feitian helped us stabilize our PCB supply with reliable quality reports and fast engineering feedback.",
  },
  {
    name: "Sophie L.",
    company: "IoT Hardware Startup",
    text: "The prototype boards arrived clean, well packaged, and ready for assembly validation. Communication was excellent.",
  },
  {
    name: "Kenji T.",
    company: "Electronics Design House",
    text: "Their DFM suggestions reduced rework and made our production transfer much smoother.",
  },
];

const processSteps = [
  "Quote Request",
  "Gerber Review",
  "Engineering Review",
  "Production",
  "Quality Inspection",
  "Shipping",
  "Delivery",
];

const articles = [
  ["How DFM improves PCB production yield", "Manufacturing tips for avoiding costly board revisions."],
  ["Choosing ENIG vs HASL for your PCB", "A practical guide for surface finish decisions."],
  ["SMT assembly checklist before production", "What engineers should prepare before turnkey assembly."],
];

const videos = [
  ["Factory Tour Video", "Modern PCB fabrication and process overview."],
  ["SMT Assembly Video", "Placement, reflow, AOI, and production line walkthrough."],
  ["PCB Manufacturing Video", "From laminate preparation to finished circuit board."],
  ["Company Introduction Video", "Brand, capability, quality, and global customer service."],
];

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="premium-eyebrow mx-auto">
        <Sparkles className="h-4 w-4" />
        {eyebrow}
      </div>
      <h2 className="mt-5 text-3xl font-black tracking-tight text-foreground sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
    </div>
  );
}

function MediaImage({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-card">
      <Image src={src} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 hover:scale-105" />
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-4">
        <p className="text-sm font-black text-white">{title}</p>
      </div>
    </div>
  );
}

function VideoCard({ title, description, index = 0 }: { title: string; description: string; index?: number }) {
  const videoUrl = getPcbYoutubeEmbedUrl(title, index);
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="aspect-video bg-[#07111f]">
        <iframe
          src="https://youtu.be/NKwhK6o_jHo?si=evv0xuuhHNdnI0IX"
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-black text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </article>
  );
}

export default function PremiumWupingHomepage({ products = [] }: { products?: IProduct[]; sections?: IPage[] }) {
  const dictionary = useDictionary();
  const sectionCopy = dictionary.sections;
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const activeTestimonial = useMemo(() => testimonials[testimonialIndex], [testimonialIndex]);

  return (
    <main className="overflow-hidden">
      <section className="premium-section bg-[#07111f] text-white">
        <div className="premium-container">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                <Building2 className="h-4 w-4" />
                Company Overview
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Wuping Feitian Electronic Technology Company Limited
              </h2>
              <p className="mt-4 text-lg font-bold leading-8 text-cyan-100">
                Precision PCB Manufacturing & Advanced Electronic Solutions
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                We deliver dependable PCB fabrication, PCB assembly, flexible PCB, rigid-flex PCB,
                SMT stencil, and electronics manufacturing services for global hardware brands,
                engineering teams, and production buyers.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-white/10 bg-white/8 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/35">
                    <p className="text-3xl font-black text-cyan-300">{stat.value}</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-slate-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/12 bg-white/8 p-3 shadow-premium backdrop-blur">
              <div className="relative overflow-hidden rounded-lg border border-cyan-300/20 bg-black shadow-2xl">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={getPcbYoutubeEmbedUrl("company-overview", 1)}
                    title="Wuping Feitian company video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 px-1">
                <div>
                  <h3 className="text-lg font-black text-white">Company Video</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-300">Factory capability, production story, and global manufacturing confidence.</p>
                </div>
                <span className="hidden size-12 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-[#07111f] sm:flex">
                  <Play className="ml-1 h-5 w-5 fill-current" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section bg-background/70">
        <div className="premium-container">
          <SectionTitle eyebrow={sectionCopy.products.eyebrow} title={sectionCopy.products.title} description={sectionCopy.products.description} />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {manufacturingServices.map(([title, description], index) => (
              <article key={title} className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                <MediaImage src={pcbImages[index % pcbImages.length]} title={title} />
                <div className="p-5">
                  <h3 className="text-xl font-black text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                  <button className="mt-4 inline-flex items-center gap-2 text-sm font-black text-primary">Learn More <ChevronRight className="h-4 w-4" /></button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-container">
          <SectionTitle eyebrow={sectionCopy.assembly.eyebrow} title={sectionCopy.assembly.title} description={sectionCopy.assembly.description} />
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {assemblyServices.map(([title, description], index) => (
              <article key={title} className="rounded-lg border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-premium">
                <MediaImage src={pcbImages[(index + 1) % pcbImages.length]} title={title} />
                <h3 className="mt-5 text-xl font-black text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section bg-background/70">
        <div className="premium-container">
          <SectionTitle eyebrow={sectionCopy.hero.eyebrow} title={sectionCopy.hero.title} description={sectionCopy.hero.description} />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.length > 0 ? (
              products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : fallbackShowcaseProducts.map(([title, description], index) => (
              <article key={title} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <MediaImage src={pcbImages[index % pcbImages.length]} title={title} />
                <h3 className="mt-5 text-xl font-black text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-black text-foreground">
                    <ShoppingCart className="h-4 w-4" /> Add To Cart
                  </button>
                  <button className="rounded-full bg-primary px-4 py-2 text-sm font-black text-primary-foreground">Buy Now</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>



      <section className="premium-section">
        <div className="premium-container">
          <SectionTitle eyebrow={sectionCopy.factory.eyebrow} title={sectionCopy.factory.title} description={sectionCopy.factory.description} />
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <MediaImage src="/image/pcb2.png" title="PCB production facility" />
            <div className="grid gap-5">
              <VideoCard title="Factory Production Video" description="A hero-ready space for a high quality factory tour video." index={2} />
              <MediaImage src="/image/pcb4.png" title="Quality inspection lab" />
            </div>
          </div>
        </div>
      </section>



      <section className="relative overflow-hidden py-20">
        <div className="relative mx-auto h-[520px] max-w-3xl">
          <Globe />
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-container">
          <SectionTitle eyebrow={sectionCopy.about.eyebrow} title={sectionCopy.about.title} description={sectionCopy.about.description} />
          <div className="mt-10 grid gap-5 md:grid-cols-5">
            {advantages.map(([title, description, Icon]) => (
              <article key={title as string} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <Icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 text-lg font-black text-foreground">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GlobalNetworkGlobe />

      <section className="premium-section">
        <div className="premium-container">
          <SectionTitle eyebrow={sectionCopy.quality.eyebrow} title={sectionCopy.quality.title} description={sectionCopy.quality.description} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {certifications.map((certification) => (
              <div key={certification} className="rounded-lg border border-border bg-card p-5 text-center shadow-sm">
                <Award className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-3 text-sm font-black text-foreground">{certification}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section bg-background/70">
        <div className="premium-container">
          <SectionTitle eyebrow={sectionCopy.industries.eyebrow} title={sectionCopy.industries.title} description={sectionCopy.industries.description} />
          <div className="mx-auto mt-10 max-w-4xl rounded-lg border border-border bg-card p-8 text-center shadow-premium">
            <Quote className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-6 text-xl font-bold leading-9 text-foreground">&ldquo;{activeTestimonial.text}&rdquo;</p>
            <p className="mt-5 text-sm font-black text-foreground">{activeTestimonial.name}</p>
            <p className="text-sm text-muted-foreground">{activeTestimonial.company}</p>
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => setTestimonialIndex(index)}
                  className={`h-2.5 rounded-full transition ${testimonialIndex === index ? "w-9 bg-primary" : "w-2.5 bg-muted"}`}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-container">
          <SectionTitle eyebrow={sectionCopy.capability.eyebrow} title={sectionCopy.capability.title} description={sectionCopy.capability.description} />
          <div className="mt-10 grid gap-4 md:grid-cols-7">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">{index + 1}</div>
                <h3 className="mt-4 text-sm font-black text-foreground">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section bg-background/70">
        <div className="premium-container">
          <SectionTitle eyebrow={dictionary.navbar.homeHighlights[1]?.label ?? "News"} title={dictionary.navbar.homeHighlights[1]?.description ?? "PCB industry news and manufacturing tips"} description={sectionCopy.products.description} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {articles.map(([title, description], index) => (
              <article key={title} className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                <MediaImage src={pcbImages[index % pcbImages.length]} title={title} />
                <div className="p-5">
                  <h3 className="text-lg font-black text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                  <button className="mt-4 inline-flex items-center gap-2 text-sm font-black text-primary">Read More <ArrowRight className="h-4 w-4" /></button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-container">
          <SectionTitle eyebrow={sectionCopy.factory.videoTitle} title={sectionCopy.factory.title} description={sectionCopy.factory.description} />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {videos.map(([title, description], index) => (
              <VideoCard key={title} title={title} description={description} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section bg-[#07111f] text-white">
        <div className="premium-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
              <Rocket className="h-4 w-4" />
              {sectionCopy.contact.eyebrow}
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">{sectionCopy.contact.title}</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              {sectionCopy.contact.description}
            </p>
            <div className="mt-8 space-y-4 text-sm font-bold text-slate-200">
              <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-cyan-300" /> ft-osr@feitianpcb.com</p>
              <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-cyan-300" /> +86 189 2742 6587</p>
              <p className="flex items-center gap-3"><MessageCircle className="h-5 w-5 text-cyan-300" /> WhatsApp support available</p>
              <p className="flex items-center gap-3"><Building2 className="h-5 w-5 text-cyan-300" /> Factory: Yanqian Industrial Cluster, Wuping County, Longyan City, Fujian Province, China</p>
            </div>
          </div>
          <form className="rounded-lg border border-white/15 bg-white/10 p-6 shadow-premium backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              {["Name", "Email", "Phone", "PCB Type"].map((field) => (
                <label key={field} className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-cyan-100">{field}</span>
                  <input className="w-full rounded-lg border border-white/15 bg-white px-3 py-3 text-sm text-slate-950 outline-none focus:ring-2 focus:ring-cyan-300" placeholder={field} />
                </label>
              ))}
            </div>
            <label className="mt-4 block space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-100">Project Requirement</span>
              <textarea rows={5} className="w-full resize-none rounded-lg border border-white/15 bg-white px-3 py-3 text-sm text-slate-950 outline-none focus:ring-2 focus:ring-cyan-300" placeholder="Tell us about layer count, quantity, material, assembly, and delivery schedule." />
            </label>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-black text-white">
                <UploadCloud className="h-4 w-4" /> Upload Gerber
              </button>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-black text-white shadow-glow">
                {sectionCopy.hero.quoteBtn} <Zap className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}








