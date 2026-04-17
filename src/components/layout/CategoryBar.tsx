"use client";

import Link from "next/link";
import { Smartphone, Shirt, Monitor, Home, Tv, Plane, Sparkles, ShoppingBasket, Tag } from "lucide-react";

const CATEGORIES = [
  { name: "Top Offers", icon: Tag, color: "from-red-500 to-orange-400" },
  { name: "Mobiles", icon: Smartphone, color: "from-violet-500 to-purple-400" },
  { name: "Fashion", icon: Shirt, color: "from-pink-500 to-rose-400" },
  { name: "Electronics", icon: Monitor, color: "from-blue-500 to-cyan-400" },
  { name: "Home", icon: Home, color: "from-emerald-500 to-green-400" },
  { name: "Appliances", icon: Tv, color: "from-slate-500 to-gray-400" },
  { name: "Travel", icon: Plane, color: "from-sky-500 to-blue-400" },
  { name: "Beauty", icon: Sparkles, color: "from-fuchsia-500 to-pink-400" },
  { name: "Grocery", icon: ShoppingBasket, color: "from-lime-500 to-green-400" },
];

export default function CategoryBar() {
  return (
    <div className="bg-white pp-shadow border-b border-gray-100">
      <div className="pp-container flex items-center justify-between px-4 lg:px-8 gap-3 overflow-x-auto no-scrollbar py-3">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              href={`/category/${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[11px] font-semibold text-gray-600 group-hover:text-pp-primary transition-colors text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
