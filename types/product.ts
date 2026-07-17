export interface Brand {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string;
}

export interface Product {
  id: number;

  name: string;

  brandId: number | null;
  brand: Brand | null;

  category: string;

  cost: number;
  retail: number;

  quantity: number;
  minimumStock: number;

  supplier: string | null;

  locationId: number | null;
  location: Location | null;

  image: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProduct {
  name: string;

  brandId: number | null;

  category: string;

  cost: number;
  retail: number;

  quantity: number;
  minimumStock: number;

  supplier?: string | null;

  locationId: number | null;

  image?: string | null;
}

export type UpdateProduct = Partial<CreateProduct>;