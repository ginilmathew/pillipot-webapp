import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />
      
      <div className="bg-white pp-shadow border-b border-gray-100 flex items-center px-4 lg:px-8 py-3 gap-8 overflow-hidden h-[73px]">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-[72px] opacity-20">
            <div className="w-12 h-12 rounded-2xl bg-gray-200 animate-pulse" />
            <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>

      <main className="flex-1 pp-container px-4 py-8">
        <div className="w-full h-[260px] md:h-[340px] bg-gray-200 animate-pulse rounded-3xl mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 h-[300px] flex flex-col gap-4">
              <div className="w-full h-[180px] bg-gray-100 animate-pulse rounded-xl" />
              <div className="w-2/3 h-4 bg-gray-200 animate-pulse rounded" />
              <div className="w-1/3 h-6 bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
