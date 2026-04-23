import Header from "@/components/layout/Header";
import CategoryBar from "@/components/layout/CategoryBar";
import ProductSection from "@/components/product/ProductSection";
import Footer from "@/components/layout/Footer";
import { getProducts, getCategories, getBanners } from "@/lib/api";
import { Suspense } from "react";
import { ProductSectionSkeleton } from "@/components/skeletons/ProductSkeleton";
import BannerSlider from "@/components/home/BannerSlider";
import BannerSkeleton from "@/components/skeletons/BannerSkeleton";

async function ProductFeed() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const sections = categories.map(cat => ({
    title: cat.name,
    products: products.filter(p => p.categoryId === cat.id).slice(0, 5),
    link: `/category/${cat.id}`
  })).filter(s => s.products.length > 0);

  return (
    <>
      {sections.map((s, i) => (
        <ProductSection key={i} title={s.title} products={s.products} viewAllLink={s.link} />
      ))}
    </>
  );
}

export default async function Home() {
  const [categories, banners] = await Promise.all([
    getCategories(),
    getBanners()
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />
      <CategoryBar categories={categories} />

      {/* Banner */}
      <div className="mt-3 md:mt-4">
        {banners.length > 0 ? (
          <BannerSlider banners={banners} />
        ) : (
          <BannerSkeleton />
        )}
      </div>

      <main className="flex-1">
        {/* Product sections */}
        <section className="pp-container py-6 md:py-8">
          <Suspense fallback={<ProductSectionSkeleton />}>
            <ProductFeed />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
}
