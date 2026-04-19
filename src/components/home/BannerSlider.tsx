"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ArrowRight, Zap } from "lucide-react";
import type { Banner } from "@/lib/api";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface BannerSliderProps {
  banners: Banner[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  if (!banners || banners.length === 0) return null;

  return (
    <div className="px-4 md:px-6 lg:px-8 pt-6">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="banner-swiper rounded-3xl overflow-hidden shadow-xl"
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        } as React.CSSProperties}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full overflow-hidden pp-gradient group cursor-pointer aspect-[16/9] md:aspect-[21/9] lg:min-h-[380px]">
              <div className="pp-container h-full px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-center h-full">
                  {/* Text Content */}
                  <div className="p-8 md:p-10 lg:p-14 flex-1 z-10 text-center md:text-left">
                    <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                      <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
                      <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Limited Time Offer</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white leading-tight mb-4 drop-shadow-md">
                      {banner.title}
                    </h2>
                    {banner.description && (
                      <p className="text-white/80 text-sm md:text-lg mb-8 max-w-md line-clamp-2 md:line-clamp-none">
                        {banner.description}
                      </p>
                    )}
                    {banner.linkUrl && (
                      <Link 
                        href={banner.linkUrl} 
                        className="inline-flex items-center gap-2 bg-white text-pp-primary px-10 py-4 rounded-2xl font-black hover:shadow-2xl hover:scale-105 transition-all text-base active:scale-95 shadow-lg group"
                      >
                        Shop Now 
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>

                  {/* Image Content */}
                  <div className="relative w-full md:w-[45%] h-full min-h-[220px] md:min-h-0 flex items-center justify-center">
                    <div className="relative w-full h-full md:h-[90%] lg:h-full scale-100 group-hover:scale-105 transition-transform duration-700">
                      <Image
                        src={banner.imageUrl}
                        alt={banner.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subtle Decorative Elements */}
              <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-15deg] translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-yellow-400/10 blur-3xl pointer-events-none" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .banner-swiper .swiper-button-next,
        .banner-swiper .swiper-button-prev {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        .banner-swiper .swiper-button-next:hover,
        .banner-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.1);
        }
        .banner-swiper .swiper-button-next:after,
        .banner-swiper .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }
        .banner-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          opacity: 0.5;
          background: #fff;
          transition: all 0.3s ease;
        }
        .banner-swiper .swiper-pagination-bullet-active {
          width: 25px;
          border-radius: 5px;
          opacity: 1;
        }
        @media (max-width: 768px) {
          .banner-swiper .swiper-button-next,
          .banner-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default BannerSlider;
