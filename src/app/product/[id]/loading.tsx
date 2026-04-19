import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ProductLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />
      
      <main className="flex-1 pp-container px-4 py-8">
        {/* Breadcrumb Skeleton */}
        <div className="w-48 h-3 bg-gray-200 animate-pulse rounded mb-8" />

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          {/* Gallery Skeleton */}
          <div className="lg:w-[50%] xl:w-[55%] flex flex-col sm:flex-row gap-5">
            <div className="flex sm:flex-col gap-2 order-2 sm:order-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-16 h-16 rounded-xl bg-gray-100 animate-pulse" />
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-4 order-1 sm:order-2">
              <div className="w-full aspect-square bg-gray-100 animate-pulse rounded-2xl" />
              <div className="flex gap-4">
                <div className="flex-1 h-14 bg-gray-100 animate-pulse rounded-xl" />
                <div className="flex-1 h-14 bg-gray-100 animate-pulse rounded-xl" />
              </div>
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="lg:w-[50%] xl:w-[45%] flex flex-col gap-8">
            <div>
              <div className="w-24 h-3 bg-gray-200 animate-pulse rounded mb-3" />
              <div className="w-3/4 h-8 bg-gray-200 animate-pulse rounded" />
            </div>
            
            <div className="w-48 h-6 bg-gray-100 animate-pulse rounded" />
            <div className="w-32 h-10 bg-gray-200 animate-pulse rounded" />

            <div className="w-full h-48 bg-gray-100 animate-pulse rounded-xl" />
            
            <div className="grid grid-cols-3 gap-3">
               <div className="h-20 bg-gray-100 animate-pulse rounded-xl" />
               <div className="h-20 bg-gray-100 animate-pulse rounded-xl" />
               <div className="h-20 bg-gray-100 animate-pulse rounded-xl" />
            </div>

            <div className="w-full h-32 bg-gray-100 animate-pulse rounded-xl" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
