"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { inventory as initialInventory } from "@/lib/mockData";

type Product = {
  id: number;
  sku: string;
  name: string;
  brand: string;
  quantity: number;
  cost: number;
  retail: number;
  reorderLevel: number;
};

type AppContextType = {
  inventory: Product[];
  setInventory: React.Dispatch<React.SetStateAction<Product[]>>;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState(initialInventory);

  return (
    <AppContext.Provider value={{ inventory, setInventory }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}