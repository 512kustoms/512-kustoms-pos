export interface Product {
  id: number;

  name: string;
  brand: string;
  category: string;

  sku: string;
  barcode: string | null;

  cost: number;
  retail: number;

  quantity: number;
  minimumStock: number;

  supplier: string | null;
  shelfLocation: string | null;

  image: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProduct {
  name: string;
  brand: string;
  category: string;

  sku: string;
  barcode?: string;

  cost: number;
  retail: number;

  quantity: number;
  minimumStock: number;

  supplier?: string;
  shelfLocation?: string;

  image?: string | null;
}