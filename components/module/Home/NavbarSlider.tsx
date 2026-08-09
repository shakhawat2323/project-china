"use client";

import Image from "next/image";
import { type ChangeEvent, useState } from "react";
import { AlertCircle, Calculator, CheckCircle2, Cpu, FileArchive, Layers3, Loader2, PanelTop, ScanLine, UploadCloud, Zap } from "lucide-react";
import { toast } from "sonner";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GerberService } from "@/services/gerber.service";

const sliderImages = [
  {
    src: "/images/generated/pcb1.png",
    alt: "PCB manufacturing showcase 1",
  },
  {
    src: "/images/generated/pcb2.png",
    alt: "PCB manufacturing showcase 2",
  },
  {
    src: "/images/generated/pcb3.png",
    alt: "PCB manufacturing showcase 3",
  },
  {
    src: "/images/generated/pcb4.png",
    alt: "PCB manufacturing showcase 4",
  },
  {
    src: "/images/generated/smt_assembly.png",
    alt: "PCB manufacturing showcase 5",
  },
  {
    src: "/images/generated/hdi_pcb.png",
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

const allowedUploadExtensions = [".zip", ".rar", ".7z", ".csv", ".xlsx", ".xls", ".txt", ".pdf"];
const maxUploadSize = 50 * 1024 * 1024;

const formatFileSize = (size: number) => {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const getExtension = (fileName: string) => {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : "";
};

export default function NavbarSlider() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ fileName: string; fileSize: number }[]>([]);
  const [uploadError, setUploadError] = useState("");
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
  const activeService = quoteServices[activeServiceIndex];
  const ActiveIcon = activeService.icon;

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (!files.length) return;

    const invalidFile = files.find((file) => !allowedUploadExtensions.includes(getExtension(file.name)));
    if (invalidFile) {
      const message = `${invalidFile.name} is not supported. Please upload ZIP, RAR, 7Z, CSV, XLSX, XLS, TXT or PDF.`;
      setUploadError(message);
      toast.error(message);
      return;
    }

    const email = contactInfo.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const message = "Please enter a valid contact email before uploading.";
      setUploadError(message);
      toast.error(message);
      return;
    }

    const oversizedFile = files.find((file) => file.size > maxUploadSize);
    if (oversizedFile) {
      const message = `${oversizedFile.name} is larger than 50MB.`;
      setUploadError(message);
      toast.error(message);
      return;
    }

    try {
      setIsUploading(true);
      setUploadError("");
      const result = await GerberService.uploadPublicInquiry(files, {
        fullName: email.split("@")[0],
        email,
        phone: contactInfo.phone.trim(),
        boardType: activeService.name,
        description: `Instant quote upload for ${activeService.name}`,
      });

      setUploadedFiles(result.files.map((file) => ({ fileName: file.fileName, fileSize: file.fileSize })));
      toast.success(`Upload complete. Inquiry ${result.inquiry.id.slice(0, 8).toUpperCase()} created.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed. Please try again.";
      setUploadError(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadSummary = uploadedFiles.length
    ? uploadedFiles.length === 1
      ? `${uploadedFiles[0].fileName} (${formatFileSize(uploadedFiles[0].fileSize)})`
      : `${uploadedFiles.length} files uploaded for engineering review`
    : "ZIP, RAR, 7Z, XLSX, CSV, PDF supported";

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

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">Contact Email</span>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(event) => setContactInfo((current) => ({ ...current, email: event.target.value }))}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-white/10 dark:bg-white/8 dark:text-white"
                  placeholder="buyer@company.com"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">Phone / WhatsApp</span>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(event) => setContactInfo((current) => ({ ...current, phone: event.target.value }))}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-white/10 dark:bg-white/8 dark:text-white"
                  placeholder="+86 189 2742 6587"
                />
              </label>
            </div>

            <label
              className={`mt-4 flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 text-center transition ${
                uploadError
                  ? "border-red-300 bg-red-50 hover:border-red-400 dark:border-red-400/40 dark:bg-red-500/10"
                  : uploadedFiles.length
                    ? "border-cyan-300 bg-cyan-50 hover:border-cyan-500 dark:border-cyan-300/40 dark:bg-cyan-400/10"
                    : "border-emerald-300 bg-emerald-50 hover:border-emerald-500 hover:bg-emerald-100 dark:border-emerald-400/30 dark:bg-emerald-400/10"
              } ${isUploading ? "pointer-events-none opacity-80" : ""}`}
            >
              {isUploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-cyan-600 dark:text-cyan-300" />
              ) : uploadedFiles.length ? (
                <CheckCircle2 className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />
              ) : uploadError ? (
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
              ) : (
                <UploadCloud className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
              )}
              <span className="mt-2 text-sm font-black text-slate-900 dark:text-white">
                {isUploading ? "Uploading files..." : uploadedFiles.length ? "Files Ready for Review" : "Upload Gerber / BOM File"}
              </span>
              <span className={`mt-1 max-w-full truncate text-xs ${uploadError ? "text-red-600 dark:text-red-300" : "text-slate-500 dark:text-slate-400"}`} aria-live="polite">
                {uploadError || uploadSummary}
              </span>
              <input
                type="file"
                className="sr-only"
                accept=".zip,.rar,.7z,.csv,.xlsx,.xls,.txt,.pdf"
                multiple
                disabled={isUploading}
                onChange={handleUpload}
              />
            </label>

            {uploadedFiles.length ? (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-bold text-cyan-800 dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-200">
                <FileArchive className="h-4 w-4 shrink-0" />
                <span className="truncate">Engineering team will review your uploaded PCB files.</span>
              </div>
            ) : null}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => toast.info(uploadedFiles.length ? "Your files are already sent for quote review." : "Upload your Gerber/BOM file first for the fastest quote.")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                <Calculator className="h-4 w-4" />
                Quote Now
              </button>
              <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-white/10 dark:bg-white/6 dark:text-white">
                <Zap className="h-4 w-4" />
                Engineer Review
                <input
                  type="file"
                  className="sr-only"
                  accept=".zip,.rar,.7z,.csv,.xlsx,.xls,.txt,.pdf"
                  multiple
                  disabled={isUploading}
                  onChange={handleUpload}
                />
              </label>
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