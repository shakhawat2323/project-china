import Image from "next/image";
import { Play } from "lucide-react";

type VideoPanelProps = {
  title: string;
  poster: string;
  embedUrl?: string;
};

export default function VideoPanel({ title, poster, embedUrl }: VideoPanelProps) {
  if (embedUrl) {
    return (
      <div className="aspect-video overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <iframe
          src={embedUrl}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <Image src={poster} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg">
          <Play className="ml-1 size-6 fill-current" />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-4">
        <p className="text-sm font-medium text-white">{title}</p>
      </div>
    </div>
  );
}
