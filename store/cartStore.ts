"use client";

import { create } from "zustand";
import { CartItem } from "@/types/cart";

interface CartStore {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;

  subtotal: () => number;
  tax: () => number;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return {
        items: [...state.items, item],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clearCart: () =>
    set({
      items: [],
    }),

  subtotal: () => {
    const items = get().items;

    return items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  tax: () => {
    return get().subtotal() * 0.0825;
  },

  total: () => {
    return get().subtotal() + get().tax();
  },
}));