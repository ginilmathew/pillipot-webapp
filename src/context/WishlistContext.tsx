"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  const { user, token } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Initial load: localStorage for guest, API for logged in
  useEffect(() => {
    const loadWishlist = async () => {
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
        }
      }
    };
    loadWishlist();
  }, [user, token]);

  // Persistent localStorage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem("pillipot_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleWishlist = async (product: Product) => {
    const isAdded = !isInWishlist(product.id);
    
    // UI Update
    if (isAdded) addToWishlist(product);
    else removeFromWishlist(product.id);

    // Sync
    if (user && token) {
      try {
        await toggleWishlistApi(token, product.id);
      } catch (error) {
        console.error("Wishlist sync failed", error);
        // Rollback
        if (isAdded) removeFromWishlist(product.id);
        else addToWishlist(product);
      }
    }
  };

  const removeItem = async (productId: string) => {
    console.log("Removing item from wishlist:", productId);
    
    // UI Update - optimistic
    removeFromWishlist(productId);

    // Sync
    if (token) {
      try {
        await toggleWishlistApi(token, productId);
        console.log("Successfully synced removal with server");
      } catch (error) {
        console.error("Failed to remove item from server wishlist:", error);
      }
    } else {
      console.warn("No auth token found, removal stays local only");
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        removeItem,
        isInWishlist,
        wishlistCount: wishlist.length,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
