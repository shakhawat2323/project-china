"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { countries, getEmojiFlag, TCountryCode } from 'countries-list';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { AuthService } from "@/services/auth.service";

// Build the array of all countries and sort alphabetically by name
const countryCodes = Object.entries(countries)
  .map(([code, data]) => ({
    code: `+${data.phone[0]}`,
    country: code,
    name: data.name,
    flag: getEmojiFlag(code as TCountryCode)
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = React.useState("BD"); // default to Bangladesh
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    phoneRaw: "",
    address: ""
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Trim and sanitize inputs
    const trimmedName = formData.name.trim().replace(/\s+/g, ' ');
    const trimmedCompany = formData.companyName.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();
    const trimmedPhone = formData.phoneRaw.trim();
    const address = formData.address.trim();

    // Name Validation
    if (!trimmedName) {
      newErrors.name = "Full name is required";
    } else if (trimmedName.length < 3) {
      newErrors.name = "Full name must be at least 3 characters";
    } else if (/\d/.test(trimmedName)) {
      newErrors.name = "Numbers are not allowed in full name";
    } else if (!/^[a-zA-Z\s.]+$/.test(trimmedName)) {
      newErrors.name = "Special characters are not allowed in full name";
    } else if (trimmedName.length > 100) {
      newErrors.name = "Full name cannot exceed 100 characters";
    }

    // Company Name Validation
    if (!trimmedCompany) {
      newErrors.companyName = "Company name is required";
    } else if (trimmedCompany.length < 2) {
      newErrors.companyName = "Please enter a valid company name";
    } else if (trimmedCompany.length > 150) {
      newErrors.companyName = "Company name cannot exceed 150 characters";
    }

    // Email Validation
    if (!trimmedEmail) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone Validation
    const selectedCountry = countryCodes.find(c => c.country === selectedCountryCode);
    const fullPhone = `${selectedCountry?.code}${trimmedPhone.replace(/^0+/, '')}`;
    
    if (!trimmedPhone) {
      newErrors.phoneRaw = "Phone number is required";
    } else if (/[a-zA-Z\s]/.test(trimmedPhone)) {
      newErrors.phoneRaw = "Letters and spaces are not allowed in phone number";
    } else {
      try {
        if (!isValidPhoneNumber(fullPhone)) {
           newErrors.phoneRaw = "Phone number does not match the selected country code";
        }
      } catch {
        newErrors.phoneRaw = "Phone number does not match the selected country code";
      }
    }

    // Strict Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else {
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passRegex.test(formData.password)) {
        newErrors.password = "Password must contain uppercase, lowercase, number and special character";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setLoading(true);
    
    try {
      await AuthService.register({
        name: trimmedName,
        email: trimmedEmail,
        password: formData.password,
        companyName: trimmedCompany,
        phone: fullPhone,
        address,
      });
      toast.success("Registration successful. Please verify your email OTP.");
      router.push(`/verify-email?email=${encodeURIComponent(trimmedEmail)}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to process registration.";
      setErrors({ server: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const selectedCountry = countryCodes.find(c => c.country === selectedCountryCode);

  return (
    <div className="w-full flex flex-col items-center mt-12 mb-12">
      {/* Brand & Logo Section - Positioned higher and clearly visible */}
      <div className="mb-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#12121A]/80 backdrop-blur-md rounded-3xl border border-fuchsia-500/30 shadow-[0_0_40px_rgba(217,70,239,0.4)] flex items-center justify-center mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20" />
          <Image src="/image/chinaproject.png" alt="SysPCB Logo" width={72} height={72} className="relative z-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] w-[50px] h-[50px] sm:w-[72px] sm:h-[72px]" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-tight drop-shadow-sm">Sys<span className="text-fuchsia-500">PCB</span></h1>
      </div>

      <Card className="w-full max-w-2xl border border-white/10 bg-[#12121A]/80 backdrop-blur-xl shadow-2xl relative overflow-hidden rounded-3xl">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50" />
        
        <CardHeader className="space-y-2 text-center pt-8">
          <CardTitle className="text-2xl font-bold tracking-tight text-white">Create an account</CardTitle>
          <CardDescription className="text-gray-400 text-sm">Join the enterprise standard in PCB Manufacturing</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400" htmlFor="name">Full Name</label>
                <Input 
                  id="name" name="name" placeholder="John Doe" 
                  value={formData.name} onChange={handleChange} 
                  className={`bg-[#0A0A10]/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-fuchsia-500 focus-visible:border-fuchsia-500 h-12 px-4 rounded-xl transition-all ${errors.name ? "border-red-500/50" : ""}`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div className="space-y-2 relative">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400" htmlFor="companyName">Company Name</label>
                <Input 
                  id="companyName" name="companyName" placeholder="Tech Corp" 
                  value={formData.companyName} onChange={handleChange} 
                  className={`bg-[#0A0A10]/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-fuchsia-500 focus-visible:border-fuchsia-500 h-12 px-4 rounded-xl transition-all ${errors.companyName ? "border-red-500/50" : ""}`}
                />
                {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
              </div>
            </div>
            
            <div className="space-y-2 relative">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400" htmlFor="email">Email Address</label>
              <Input 
                id="email" name="email" type="email" placeholder="john@example.com" 
                value={formData.email} onChange={handleChange} 
                className={`bg-[#0A0A10]/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-fuchsia-500 focus-visible:border-fuchsia-500 h-12 px-4 rounded-xl transition-all ${errors.email ? "border-red-500/50" : ""}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2 relative">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400" htmlFor="phone">Phone Number</label>
              <div className="flex gap-2">
                <div className="relative flex items-center border border-white/10 rounded-xl px-2 bg-[#0A0A10]/50 focus-within:ring-1 focus-within:ring-fuchsia-500 h-12 transition-all">
                  <span className="text-lg mr-1">{selectedCountry?.flag}</span>
                  <select 
                    className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer text-white appearance-none pr-4 max-w-[80px]"
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                  >
                    {countryCodes.map((c) => (
                      <option key={c.country} value={c.country} className="text-foreground bg-background">
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                </div>
                <Input 
                  className={`flex-1 bg-[#0A0A10]/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-fuchsia-500 h-12 px-4 rounded-xl transition-all ${errors.phoneRaw ? "border-red-500/50" : ""}`} 
                  id="phoneRaw" name="phoneRaw" type="tel" placeholder="Phone number" 
                  value={formData.phoneRaw} onChange={handleChange} 
                />
              </div>
              {errors.phoneRaw && <p className="text-xs text-red-500 mt-1">{errors.phoneRaw}</p>}
            </div>

            <div className="space-y-2 relative">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400" htmlFor="address">Address (Optional)</label>
              <Input id="address" name="address" placeholder="123 Main St, City, Country" value={formData.address} onChange={handleChange} className="bg-[#0A0A10]/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-fuchsia-500 h-12 px-4 rounded-xl transition-all" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400" htmlFor="password">Password</label>
                <Input 
                  id="password" name="password" type="password" minLength={6} 
                  value={formData.password} onChange={handleChange} 
                  className={`bg-[#0A0A10]/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-fuchsia-500 h-12 px-4 rounded-xl transition-all ${errors.password ? "border-red-500/50" : ""}`}
                />
                {errors.password ? (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                ) : (
                  <p className="text-[10px] text-gray-500 mt-1">Min 6 chars (Upper, Lower, Num, Symbol)</p>
                )}
              </div>
              <div className="space-y-2 relative">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400" htmlFor="confirmPassword">Confirm Password</label>
                <Input 
                  id="confirmPassword" name="confirmPassword" type="password" minLength={6} 
                  value={formData.confirmPassword} onChange={handleChange} 
                  className={`bg-[#0A0A10]/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-fuchsia-500 h-12 px-4 rounded-xl transition-all ${errors.confirmPassword ? "border-red-500/50" : ""}`}
                />
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
            {errors.server && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                <p className="text-sm font-medium text-red-400">{errors.server}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-5 pt-6 pb-8 px-6 sm:px-8">
            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white font-bold shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all relative overflow-hidden group" 
              disabled={loading}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative flex items-center justify-center">
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                {loading ? "Registering..." : "Create Account"}
              </span>
            </Button>
            
            <div className="text-sm text-center text-gray-400 font-medium">
              Already have an account? <Link href="/login" className="text-fuchsia-400 font-bold hover:text-fuchsia-300 transition-colors ml-1 hover:underline">Login</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
