import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="premium-shell relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-accent/20 blur-[150px]" />
        <div className="absolute right-[20%] top-[20%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="absolute top-8 left-8 z-10">
        <Link href="/" className="premium-glass flex items-center rounded-full px-4 py-2 text-sm font-bold text-foreground transition-colors hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      <div className="w-full max-w-lg z-10 relative">
        {children}
      </div>
    </div>
  );
}
