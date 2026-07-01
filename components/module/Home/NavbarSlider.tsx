"use client";

import Image from "next/image";
import { useState } from "react";
import { Calculator, Cpu, Layers3, PanelTop, ScanLine, UploadCloud, Zap } from "lucide-react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const sliderImages = [
  {
    src: "/image/pcb1.png",
    alt: "PCB manufacturing showcase 1",
  },
  {
    src: "/image/pcb2.png",
    alt: "PCB manufacturing showcase 2",
  },
  {
    src: "/image/pcb3.png",
    alt: "PCB manufacturing showcase 3",
  },
  {
    src: "/image/pcb4.png",
    alt: "PCB manufacturing showcase 4",
  },
  {
    src: "/image/pcb5.png",
    alt: "PCB manufacturing showcase 5",
  },
  {
    src: "/image/pcb6.png",
    alt: "PCB manufacturing showcase 6",
  },
];

const quoteServices = [
  {
    name: "PCB Prototype",
    icon: Cpu,
    fields: ["Length", "Width", "Layers", "Thickness", "Quantity"],
  },
  {
    name: "PCB Assembly",
    icon: PanelTop,
    fields: ["PCB Quantity", "SMT Pads", "Through Holes", "Unique Parts"],
  },
  {
    name: "Flexible PCB",
    icon: Layers3,
    fields: ["Length", "Width", "Layers", "Quantity"],
  },
  {
    name: "SMT Stencil",
    icon: ScanLine,
    fields: ["Stencil Type", "Size", "Side", "Quantity"],
  },
];

export default function NavbarSlider() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeService = quoteServices[activeServiceIndex];
  const ActiveIcon = activeService.icon;

  return (
    <section className="bg-linear-to-br from-emerald-50 via-white to-cyan-50 py-4 dark:from-[#04130d] dark:via-[#071b14] dark:to-[#071827] sm:py-6">
      <div className="mx-auto grid w-full max-w-[1320px] gap-4 px-3 sm:px-4 lg:grid-cols-[420px_1fr] lg:px-6">
        <div className="rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl dark:border-emerald-400/15 dark:bg-slate-950/78 sm:p-5">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 dark:border-white/10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
                Instant Quote
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                {activeService.name}
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                PCB fabrication, PCBA, flex PCB and stencil quote support.
              </p>
            </div>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
              <ActiveIcon className="h-6 w-6" />
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {quoteServices.map((service, index) => {
              const Icon = service.icon;
              const isActive = index === activeServiceIndex;

              return (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => setActiveServiceIndex(index)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-black transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                      : "bg-emerald-50 text-slate-700 hover:bg-emerald-100 dark:bg-white/6 dark:text-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{service.name}</span>
                </button>
              );
            })}
          </div>

          <form className="mt-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {activeService.fields.map((field) => (
                <label key={field} className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">
                    {field}
                  </span>
                  {field.includes("Layers") || field.includes("Thickness") || field.includes("Type") || field.includes("Side") ? (
                    <select className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-white/10 dark:bg-white/8 dark:text-white">
                      <option>Choose {field}</option>
                      <option>Standard</option>
                      <option>Custom</option>
                    </select>
                  ) : (
                    <input
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-white/10 dark:bg-white/8 dark:text-white"
                      placeholder={`Enter ${field}`}
                    />
                  )}
                </label>
              ))}
            </div>

            <label className="mt-4 flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 text-center transition hover:border-emerald-500 hover:bg-emerald-100 dark:border-emerald-400/30 dark:bg-emerald-400/10">
              <UploadCloud className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
              <span className="mt-2 text-sm font-black text-slate-900 dark:text-white">Upload Gerber / BOM File</span>
              <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">ZIP, XLSX, CSV, PDF supported</span>
              <input type="file" className="sr-only" />
            </label>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                <Calculator className="h-4 w-4" />
                Quote Now
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-white/10 dark:bg-white/6 dark:text-white"
              >
                <Zap className="h-4 w-4" />
                Engineer Review
              </button>
            </div>
          </form>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl shadow-slate-950/10 dark:border-white/10 dark:bg-slate-950">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            loop
            slidesPerView={1}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1600}
            spaceBetween={30}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="premium-hero-swiper h-full min-h-[360px] w-full sm:min-h-[460px] lg:min-h-[620px]"
          >
            {sliderImages.map((image, index) => (
              <SwiperSlide key={image.alt}>
                <div className="relative h-full min-h-[360px] w-full sm:min-h-[460px] lg:min-h-[620px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 860px"
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-slate-950/68 via-slate-950/28 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-200">
                      Wuping Feitian Electronic Technology
                    </p>
                    <h1 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-5xl">
                      Precision PCB Manufacturing
                    </h1>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-slate-200 sm:text-base">
                      Professional PCB, PCBA, flexible PCB, SMT stencil and engineering solutions worldwide.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
