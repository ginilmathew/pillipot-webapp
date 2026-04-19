import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-sm border border-gray-100 p-3 animate-pulse">
      <div className="relative w-full aspect-[3/4] bg-gray-100 mb-4 rounded" />
      <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-2/3 mb-4" />
      <div className="flex gap-2">
        <div className="h-4 bg-gray-100 rounded w-1/4" />
        <div className="h-4 bg-gray-100 rounded w-1/4" />
      </div>
      <div className="mt-4 h-10 bg-gray-100 rounded w-full" />
    </div>
  );
}

export function ProductSectionSkeleton() {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-100 rounded w-48" />
        <div className="h-4 bg-gray-100 rounded w-20" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
