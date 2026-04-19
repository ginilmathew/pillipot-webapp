import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryBar from "@/components/layout/CategoryBar";
import ProductCard from "@/components/product/ProductCard";
import { getProducts, getCategories, type Product, type Category } from "@/lib/api";

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch concurrently on the server
  const [products, cList] = await Promise.all([
    getProducts(id),
    getCategories()
  ]);

  const category = cList.find(c => c.id === id);
  const categoryName = category?.name || "Category";

  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />
      <CategoryBar />

      <main className="flex-1 pp-container px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className="hidden lg:flex flex-col w-60 shrink-0 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 pp-shadow p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-5 uppercase tracking-wider">Filters</h2>
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Price Range</span>
                  <input type="range" className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pp-primary" />
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>₹0</span>
                    <span>₹1,50,000</span>
                  </div>
                </div>
                <FilterSection title="Rating" items={["4★ & above", "3★ & above"]} />
                <FilterSection title="Discount" items={["50% or more", "30% or more", "10% or more"]} />
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="mb-5">
              <nav className="text-xs text-gray-400 mb-1">Home › {categoryName}</nav>
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">
                  {products.length > 0 ? `${categoryName}` : "No Results"}
                  <span className="text-gray-400 font-normal text-sm ml-2">({products.length} products)</span>
                </h1>
                <div className="hidden md:flex items-center gap-4 text-xs font-medium text-gray-500">
                  <span className="text-pp-primary font-bold border-b-2 border-pp-primary pb-0.5 cursor-pointer">Relevance</span>
                  <span className="cursor-pointer hover:text-pp-primary">Price ↑</span>
                  <span className="cursor-pointer hover:text-pp-primary">Price ↓</span>
                  <span className="cursor-pointer hover:text-pp-primary">Newest</span>
                </div>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-gray-400 text-lg font-medium mb-4">No products found in &quot;{categoryName}&quot;</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FilterSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</span>
      {items.map(item => (
        <label key={item} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer hover:text-pp-primary">
          <input type="checkbox" className="w-3.5 h-3.5 rounded accent-pp-primary" />
          {item}
        </label>
      ))}
    </div>
  );
}
