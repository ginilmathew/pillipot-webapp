import Header from "@/components/layout/Header";
import CategoryBar from "@/components/layout/CategoryBar";
import ProductSection from "@/components/product/ProductSection";
import Footer from "@/components/layout/Footer";
import { getProducts, getCategories, getBanners } from "@/lib/api";
import { ShieldCheck, Truck, BadgePercent } from "lucide-react";
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

      {banners.length > 0 ? (
        <BannerSlider banners={banners} />
      ) : (
        <BannerSkeleton />
      )}

      <main className="flex-1">
        <section className="pp-container pt-4 md:pt-6">
          {/* <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Truck,
                title: "Fast delivery lanes",
                note: "Quick shipping flow built into every order journey.",
              },
              {
                icon: BadgePercent,
                title: "Sharper deals discovery",
                note: "Trending offers and category promotions surface faster.",
              },
              {
                icon: ShieldCheck,
                title: "Reliable checkout confidence",
                note: "Clearer surfaces and trustworthy shopping signals.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-white/60 bg-white/68 p-4 pp-shadow md:rounded-[1.75rem] md:p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf4ff] text-pp-primary md:h-12 md:w-12">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{item.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </section>

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
