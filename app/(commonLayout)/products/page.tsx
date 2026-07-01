import { Cpu } from "lucide-react";
import { ProductService } from "@/services/product.service";
import { ProductCatalogClient } from "./ProductCatalogClient";

export const metadata = {
  title: "Products - SysPCB",
  description: "Browse our comprehensive catalog of high-quality PCB and PCBA products.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const productsResponse = await ProductService.getProducts();
  const products = productsResponse?.data || [];

  return (
    <div className="premium-shell min-h-screen pb-24 pt-24">
      <div className="premium-container">
        <div className="relative z-10 mb-16 text-center">
          <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[300px] max-w-3xl rounded-full bg-primary/10 blur-[120px]" />

          <div className="premium-eyebrow mb-6">
            <Cpu className="size-4" />
            Standard Products
          </div>

          <h1 className="mb-6 text-5xl font-black tracking-[-0.04em] text-foreground md:text-6xl">
            Explore <span className="premium-gradient-text">Inventory</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Discover our industry-leading printed circuit boards and electronic components, engineered for enterprise reliability.
          </p>
        </div>

        <ProductCatalogClient products={products} initialCategory={resolvedSearchParams.category || "all"} />
      </div>
    </div>
  );
}
