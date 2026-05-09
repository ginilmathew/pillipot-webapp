import React from "react";

export default function BannerSkeleton() {
  return (
    <div className="pp-container pt-6">
      <div className="w-full h-[220px] md:h-[320px] lg:h-[400px] bg-gray-100 animate-shimmer rounded-[2.5rem] shadow-sm border border-white/50" />
    </div>
  );
}
