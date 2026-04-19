import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function CategoryLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />
      
      {/* CategoryBar Skeleton */}
      <div className="bg-white pp-shadow border-b border-gray-100 py-3">
        <div className="pp-container flex items-center px-4 lg:px-8 gap-8 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[72px]">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 animate-pulse" />
              <div className="w-10 h-2 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      <main className="flex-1 pp-container px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar Skeleton */}
          <div className="hidden lg:flex flex-col w-60 shrink-0 gap-4">
            <div className="bg-white rounded-2xl border border-gray-50 p-5 h-[400px]">
              <div className="w-24 h-4 bg-gray-100 animate-pulse rounded mb-8" />
              <div className="w-full h-2 bg-gray-100 animate-pulse rounded mb-4" />
              <div className="w-full h-2 bg-gray-100 animate-pulse rounded mb-8" />
              <div className="w-3/4 h-3 bg-gray-100 animate-pulse rounded mb-3" />
              <div className="w-1/2 h-3 bg-gray-100 animate-pulse rounded mb-8" />
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="flex-1">
            <div className="w-40 h-4 bg-gray-100 animate-pulse rounded mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-50 p-5 h-[340px] flex flex-col gap-5">
                  <div className="w-full h-[200px] bg-gray-100 animate-pulse rounded-xl" />
                  <div className="w-3/4 h-4 bg-gray-100 animate-pulse rounded" />
                  <div className="flex justify-between mt-auto">
                    <div className="w-1/3 h-6 bg-gray-100 animate-pulse rounded" />
                    <div className="w-10 h-10 bg-gray-100 animate-pulse rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
