"use client";

import { create } from "zustand";

export interface PurchaseItem {
  productId: number;
  name: string;
  quantity: number;
  unitCost: number;
}

interface PurchaseStore {
  items: PurchaseItem[];

  addItem: (item: {
    productId: number;
    name: string;
    unitCost: number;
  }) => void;

  updateQuantity: (productId: number, quantity: number) => void;
  updateUnitCost: (productId: number, unitCost: number) => void;
  removeItem: (productId: number) => void;
  clearItems: () => void;

  total: () => number;
}

export const usePurchaseStore = create<PurchaseStore>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.productId === item.productId
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            productId: item.productId,
            name: item.name,
            quantity: 1,
            unitCost: item.unitCost,
          },
        ],
      };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.max(1, quantity) }
          : i
      ),
    })),

  updateUnitCost: (productId, unitCost) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId
          ? { ...i, unitCost: Math.max(0, unitCost) }
          : i
      ),
    })),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),

  clearItems: () => set({ items: [] }),

  total: () => {
    return get().items.reduce(
      (sum, i) => sum + i.unitCost * i.quantity,
      0
    );
  },
}));