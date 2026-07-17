"use client";

import { create } from "zustand";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;

  discount: number;
  notes: string;

  dropship: boolean;

  vendor: string;
  vendorCost: number;
}

interface CartStore {
  items: CartItem[];

  addItem: (
    item: Omit<
      CartItem,
      "discount" | "notes" | "dropship" | "vendor" | "vendorCost"
    >,
    dropship?: boolean
  ) => void;

  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;

  updateDiscount: (id: number, discount: number) => void;
  updateNotes: (id: number, notes: string) => void;

  toggleDropship: (id: number) => void;

  updateVendor: (id: number, vendor: string) => void;
  updateVendorCost: (id: number, vendorCost: number) => void;

  removeItem: (id: number) => void;
  clearCart: () => void;

  subtotal: () => number;
  tax: () => number;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item, dropship = false) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                }
              : i
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            ...item,
            discount: 0,
            notes: "",
            dropship,
            vendor: "",
            vendorCost: 0,
          },
        ],
      };
    }),

  increaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, quantity),
            }
          : item
      ),
    })),

  updateDiscount: (id, discount) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              discount: Math.max(0, discount),
            }
          : item
      ),
    })),

  updateNotes: (id, notes) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              notes,
            }
          : item
      ),
    })),

  toggleDropship: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              dropship: !item.dropship,
            }
          : item
      ),
    })),

  updateVendor: (id, vendor) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              vendor,
            }
          : item
      ),
    })),

  updateVendorCost: (id, vendorCost) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              vendorCost,
            }
          : item
      ),
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearCart: () =>
    set({
      items: [],
    }),

  subtotal: () =>
    get().items.reduce(
      (sum, item) =>
        sum +
        (item.price - item.discount) * item.quantity,
      0
    ),

  tax: () => get().subtotal() * 0.0825,

  total: () => get().subtotal() + get().tax(),
}));