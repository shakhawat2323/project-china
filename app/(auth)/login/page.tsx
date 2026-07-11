"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { AuthService } from "@/services/auth.service";
import { getRoleDashboardPath } from "@/lib/auth-routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await AuthService.login(formData);
      login(user);
      toast.success("Login successful. Welcome back.");
      router.replace(getRoleDashboardPath(user.role));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign in. Please try again.";
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-8 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-border bg-card/80 shadow-premium backdrop-blur-md">
          <div className="absolute inset-0 bg-primary/10" />
          <Image src="/image/chinaproject.png" alt="FT PCB Logo" width={72} height={72} className="relative z-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
          FT <span className="premium-gradient-text">PCB</span>
        </h1>
      </div>

      <Card className="relative w-full overflow-hidden rounded-3xl border-border/80 bg-card/85 shadow-premium backdrop-blur-2xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-[image:var(--gradient-primary)] opacity-80" />
        
        <CardHeader className="space-y-2 text-center pt-8">
          <CardTitle className="text-2xl font-black tracking-tight text-foreground">Welcome Back</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Enter your credentials to access your portal</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 px-8">
            <div className="space-y-2 relative">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <Input 
                  id="email" name="email" type="email" placeholder="john@example.com" 
                  required value={formData.email} onChange={handleChange} 
                  className={errorMsg ? "border-error/50 focus-visible:ring-error" : ""}
                />
              </div>
            </div>
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground" htmlFor="password">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-bold text-primary transition-colors hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Input 
                  id="password" name="password" type="password" 
                  required value={formData.password} onChange={handleChange} 
                  placeholder="••••••••"
                  className={errorMsg ? "border-error/50 focus-visible:ring-error" : ""}
                />
              </div>
            </div>
            {errorMsg && (
              <div className="rounded-xl border border-error/20 bg-error/10 p-3 text-center">
                <p className="text-sm font-medium text-error">{errorMsg}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-5 pt-6 pb-8 px-8">
            <Button 
              type="submit" 
              className="group relative h-12 w-full overflow-hidden rounded-xl font-bold" 
              disabled={loading}
            >
              <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
              <span className="relative flex items-center justify-center">
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                {loading ? "Authenticating..." : "Sign In securely"}
              </span>
            </Button>
            
            <div className="text-center text-sm font-medium text-muted-foreground">
              Don&apos;t have an account? <Link href="/register" className="ml-1 font-bold text-primary transition-colors hover:underline">Create Account</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
