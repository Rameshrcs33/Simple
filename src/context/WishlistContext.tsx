import React, { createContext, useContext, useMemo, useState } from "react";

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  category?: string;
};

type WishlistContextValue = {
  items: WishlistItem[];
  toggle: (item: WishlistItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  contains: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const toggle = (item: WishlistItem) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) return prev.filter((p) => p.id !== item.id);
      return [...prev, item];
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);

  const count = useMemo(() => items.length, [items]);
  const contains = (id: string) => items.some((i) => i.id === id);

  return (
    <WishlistContext.Provider value={{ items, toggle, remove, clear, count, contains }}>
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}

export default WishlistContext;
