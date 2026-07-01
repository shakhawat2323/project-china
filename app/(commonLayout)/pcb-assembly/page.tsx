"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Cpu, UploadCloud, ArrowRight } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function PCBAssemblyPage() {
  const [form, setForm] = useState({
    name: "My PCBA Project",
    assemblyType: "SMT",
    sides: "Top",
  });

  const [bomFile, setBomFile] = useState<File | null>(null);
  const [pnpFile, setPnpFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDropBOM = useCallback((acceptedFiles: File[]) => { setBomFile(acceptedFiles[0]); }, []);
  const onDropPNP = useCallback((acceptedFiles: File[]) => { setPnpFile(acceptedFiles[0]); }, []);

  const { getRootProps: getBomProps, getInputProps: getBomInput } = useDropzone({ onDrop: onDropBOM, accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'], 'text/csv': ['.csv'] } });
  const { getRootProps: getPnpProps, getInputProps: getPnpInput } = useDropzone({ onDrop: onDropPNP, accept: { 'text/csv': ['.csv'], 'text/plain': ['.txt'] } });

  const handleSubmit = async () => {
    if (!bomFile) {
      toast.error("Please upload a BOM (Bill of Materials) file.");
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      toast.info("Assembly submission is disabled because API features were removed.");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
          <Cpu className="w-10 h-10 mr-4 text-primary" /> PCB Assembly (PCBA)
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Upload your BOM (Bill of Materials) and Pick & Place files to get an instant assembly quote.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Upload Zones */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-4">
            <h3 className="text-xl font-bold">1. Bill of Materials (BOM)</h3>
            <div {...getBomProps()} className="border-2 border-dashed border-primary/50 bg-primary/5 rounded-xl p-8 text-center cursor-pointer hover:bg-primary/10 transition-colors">
              <input {...getBomInput()} />
              <UploadCloud className="w-10 h-10 text-primary mx-auto mb-3" />
              {bomFile ? (
                <p className="font-semibold text-primary">{bomFile.name}</p>
              ) : (
                <p className="text-muted-foreground">Drag & Drop BOM file (.xlsx, .csv)</p>
              )}
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-4">
            <h3 className="text-xl font-bold">2. Pick & Place File (Optional)</h3>
            <div {...getPnpProps()} className="border-2 border-dashed border-border bg-card rounded-xl p-8 text-center cursor-pointer hover:bg-muted transition-colors">
              <input {...getPnpInput()} />
              <UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              {pnpFile ? (
                <p className="font-semibold">{pnpFile.name}</p>
              ) : (
                <p className="text-muted-foreground">Drag & Drop P&P file (.csv, .txt)</p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Assembly Details */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
            <h3 className="text-xl font-bold">3. Assembly Parameters</h3>
            
            <div className="space-y-3">
              <Label>Project Name</Label>
              <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>

            <div className="space-y-3">
              <Label>Assembly Type</Label>
              <Select value={form.assemblyType} onValueChange={v => setForm({...form, assemblyType: v})}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="SMT">SMT (Surface Mount)</SelectItem>
                  <SelectItem value="THT">THT (Through Hole)</SelectItem>
                  <SelectItem value="Mixed">Mixed (SMT + THT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Assembly Sides</Label>
              <Select value={form.sides} onValueChange={v => setForm({...form, sides: v})}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Top">Top Side Only</SelectItem>
                  <SelectItem value="Bottom">Bottom Side Only</SelectItem>
                  <SelectItem value="Both">Both Sides</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !bomFile}
            className="w-full text-lg h-14 font-bold shadow-xl"
          >
            {isSubmitting ? "Uploading..." : "Submit Assembly Request"} <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

      </div>
    </div>
  );
}
