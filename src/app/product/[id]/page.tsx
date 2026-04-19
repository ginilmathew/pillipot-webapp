import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getProduct } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch instantly on the server via Next.js RSC caching
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />
      <ProductClient product={product} />
      <Footer />
    </div>
  );
}
