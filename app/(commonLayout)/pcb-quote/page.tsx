"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calculator, Save, ArrowRight, BrainCircuit, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PCBQuotePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "My Custom PCB",
    width: "100",
    height: "100",
    quantity: "10",
    layerCount: "2",
    materialType: "FR-4",
    boardThickness: "1.6",
    copperWeight: "1",
    surfaceFinish: "HASL",
    solderMaskColor: "Green",
    silkscreenColor: "White",
  });

  const [priceData, setPriceData] = useState<{ pricePerUnit: number, totalPrice: number, quantity?: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    window.setTimeout(() => {
      const width = Number(form.width) || 0;
      const height = Number(form.height) || 0;
      const quantity = Math.max(Number(form.quantity) || 1, 1);
      const layerCount = Math.max(Number(form.layerCount) || 1, 1);
      const areaFactor = Math.max((width * height) / 10000, 0.5);
      const pricePerUnit = Number((areaFactor * layerCount * 2.4).toFixed(2));

      setPriceData({
        pricePerUnit,
        totalPrice: Number((pricePerUnit * quantity).toFixed(2)),
        quantity,
      });
      toast.info("API removed. Showing a local estimate only.");
      setIsCalculating(false);
    }, 500);
  };

  const handleSaveQuote = async () => {
    if (!priceData) {
      toast.error("Please calculate the price first.");
      return;
    }
    setIsSaving(false);
    toast.info("Saving quotes is disabled because API features were removed.");
  };

  return (
    <div className="bg-[#0A0A10] min-h-screen text-white pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-sm font-medium text-fuchsia-300 mb-6">
            <BrainCircuit className="size-4" />
            Machine Learning Pricing Engine
          </div>
          <h1 className="text-4xl font-black mb-4">Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">AI Quote</span> Engine</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our AI dynamically calculates the absolute best manufacturing price based on real-time factory load, materials, and complexity.
          </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6 bg-[#12121A] p-6 rounded-3xl border border-gray-800 shadow-xl">
          
          <div className="space-y-4 pb-6 border-b">
            <h3 className="text-xl font-bold">1. Basic Specifications</h3>
            
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Width (mm)</Label>
                <Input type="number" value={form.width} onChange={e => setForm({...form, width: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Height (mm)</Label>
                <Input type="number" value={form.height} onChange={e => setForm({...form, height: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Quantity (pcs)</Label>
                <Input type="number" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="space-y-4 pb-6 border-b">
            <h3 className="text-xl font-bold">2. PCB Parameters</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Layer Count</Label>
                <Select value={form.layerCount} onValueChange={v => setForm({...form, layerCount: v})}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Layer</SelectItem>
                    <SelectItem value="2">2 Layers</SelectItem>
                    <SelectItem value="4">4 Layers</SelectItem>
                    <SelectItem value="6">6 Layers</SelectItem>
                    <SelectItem value="8">8 Layers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Material Type</Label>
                <Select value={form.materialType} onValueChange={v => setForm({...form, materialType: v})}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FR-4">FR-4 Standard</SelectItem>
                    <SelectItem value="Aluminum">Aluminum</SelectItem>
                    <SelectItem value="Rogers">Rogers (High Freq)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Board Thickness (mm)</Label>
                <Select value={form.boardThickness} onValueChange={v => setForm({...form, boardThickness: v})}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.8">0.8</SelectItem>
                    <SelectItem value="1.0">1.0</SelectItem>
                    <SelectItem value="1.2">1.2</SelectItem>
                    <SelectItem value="1.6">1.6</SelectItem>
                    <SelectItem value="2.0">2.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Copper Weight (oz)</Label>
                <Select value={form.copperWeight} onValueChange={v => setForm({...form, copperWeight: v})}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 oz</SelectItem>
                    <SelectItem value="2">2 oz</SelectItem>
                    <SelectItem value="3">3 oz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">3. Colors & Finish</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Surface Finish</Label>
                <Select value={form.surfaceFinish} onValueChange={v => setForm({...form, surfaceFinish: v})}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HASL">HASL (with lead)</SelectItem>
                    <SelectItem value="HASL-RoHS">HASL (lead-free)</SelectItem>
                    <SelectItem value="ENIG">ENIG</SelectItem>
                    <SelectItem value="OSP">OSP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Solder Mask</Label>
                <Select value={form.solderMaskColor} onValueChange={v => setForm({...form, solderMaskColor: v})}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Green">Green</SelectItem>
                    <SelectItem value="Red">Red</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="White">White</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Silkscreen</Label>
                <Select value={form.silkscreenColor} onValueChange={v => setForm({...form, silkscreenColor: v})}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

        </div>

        {/* Pricing Summary Section */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-violet-600 to-fuchsia-600 text-white p-8 rounded-3xl shadow-2xl sticky top-24 border border-fuchsia-500/30">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-fuchsia-200" /> AI Estimate
            </h3>
            
            {priceData ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-primary-foreground/20">
                  <span className="opacity-80">Unit Price</span>
                  <span className="font-bold text-xl">${priceData.pricePerUnit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-primary-foreground/20">
                  <span className="opacity-80">Quantity</span>
                  <span className="font-bold text-xl">x {priceData.quantity}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold">Total Cost</span>
                  <span className="text-4xl font-black">${priceData.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 opacity-70 border-2 border-dashed border-primary-foreground/30 rounded-xl">
                Click Calculate to see the estimated manufacturing cost.
              </div>
            )}

              <Button 
                onClick={handleCalculate} 
                disabled={isCalculating}
                variant="secondary" 
                className="w-full text-lg py-6 font-bold bg-white text-black hover:bg-gray-200 rounded-xl"
              >
                {isCalculating ? "Calculating via AI..." : "Run AI Calculation"}
              </Button>

              <Button 
                onClick={handleSaveQuote} 
                disabled={!priceData || isSaving}
                className="w-full bg-black/20 hover:bg-black/40 text-white rounded-xl py-6 border border-white/10"
              >
                <Save className="w-4 h-4 mr-2" /> 
                {isSaving ? "Saving..." : "Save Quote to Dashboard"}
              </Button>
            </div>
          </div>

          <div className="bg-[#12121A] p-6 rounded-3xl border border-gray-800 shadow-xl text-center">
            <h4 className="font-bold mb-2 text-white">Have your Gerber files ready?</h4>
            <p className="text-sm text-gray-400 mb-4">Our AI DFM checker will automatically scan your files after upload.</p>
            <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-xl" onClick={() => router.push('/dashboard/gerber')}>
              Upload Gerber <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
