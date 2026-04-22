"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Product, fetchWishlist, toggleWishlistApi } from "@/lib/api";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  removeItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user, token, loading: authLoading } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadWishlist = async () => {
      if (authLoading) return;

      if (user && token) {
        setLoading(true);
        try {
          const serverWishlist = await fetchWishlist(token);
          setWishlist(serverWishlist);
        } catch (error) {
          console.error("Failed to load wishlist from server", error);
        } finally {
          setLoading(false);
        }
      } else {
        const saved = localStorage.getItem("pillipot_wishlist");
        if (saved) {
          try { setWishlist(JSON.parse(saved)); } catch {}
        } else {
          setWishlist([]);
        }
      }
    };
    loadWishlist();
  }, [authLoading, user, token]);

  // Persistent localStorage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem("pillipot_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some((p) => p.id === productId);
  }, [wishlist]);

  const toggleWishlist = useCallback(async (product: Product) => {
    const isAdded = !isInWishlist(product.id);

    if (isAdded) addToWishlist(product);
    else removeFromWishlist(product.id);

    if (user && token) {
      try {
        await toggleWishlistApi(token, product.id);
      } catch (error) {
        console.error("Wishlist sync failed", error);
        if (isAdded) removeFromWishlist(product.id);
        else addToWishlist(product);
      }
    }
  }, [addToWishlist, isInWishlist, removeFromWishlist, token, user]);

  const removeItem = useCallback(async (productId: string) => {
    removeFromWishlist(productId);

    if (token) {
      try {
        await toggleWishlistApi(token, productId);
      } catch (error) {
        console.error("Failed to remove item from server wishlist:", error);
      }
    }
  }, [removeFromWishlist, token]);

  const value = useMemo(
    () => ({
      wishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      removeItem,
      isInWishlist,
      wishlistCount: wishlist.length,
      loading,
    }),
    [
      wishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      removeItem,
      isInWishlist,
      loading,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
