import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/module/Contact/ContactForm";

export const metadata = {
  title: "Contact Us - FT",
  description: "Get in touch with our team for inquiries, support, and PCB manufacturing quotes.",
};

export default function ContactPage() {
  return (
    <div className="bg-background pb-20 pt-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question about our PCB manufacturing services? Need a custom quote? We're here to help.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          {/* Contact Information */}
          <div className="flex flex-col gap-8 rounded-2xl bg-muted p-8">
            <div>
              <h3 className="mb-6 text-xl font-bold text-foreground">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Headquarters</h4>
                    <p className="mt-1 text-muted-foreground">123 Tech Park Avenue<br />Shenzhen, Guangdong<br />China 518000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email Us</h4>
                    <p className="mt-1 text-muted-foreground">sales@FT.com<br />support@FT.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Call Us</h4>
                    <p className="mt-1 text-muted-foreground">+86 123 4567 8900<br />Mon-Fri, 9am - 6pm (CST)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <h3 className="mb-4 text-lg font-bold text-foreground">Looking for a Quote?</h3>
              <p className="mb-4 text-sm text-muted-foreground">Get an instant estimate for your custom PCB manufacturing needs.</p>
              <a href="/pcb-quote" className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                Get Instant Quote
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h3 className="mb-6 text-xl font-bold text-foreground">Send us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
