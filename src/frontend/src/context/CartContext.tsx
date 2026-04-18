import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  wishlist: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQty: (
    productId: string,
    size: string,
    color: string,
    qty: number,
  ) => void;
  clearCart: () => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("pretstudio_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("pretstudio_wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("pretstudio_cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("pretstudio_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === item.productId &&
          i.size === item.size &&
          i.color === item.color,
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId &&
          i.size === item.size &&
          i.color === item.color
            ? { ...i, qty: i.qty + item.qty }
            : i,
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter(
        (i) =>
          !(i.productId === productId && i.size === size && i.color === color),
      ),
    );
  };

  const updateQty = (
    productId: string,
    size: string,
    color: string,
    qty: number,
  ) => {
    if (qty < 1) {
      removeFromCart(productId, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size && i.color === color
          ? { ...i, qty }
          : i,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const addToWishlist = (productId: string) => {
    setWishlist((prev) => [...new Set([...prev, productId])]);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        wishlist,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
