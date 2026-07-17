import { prisma } from "@/lib/prisma";
import { CreateProduct } from "@/types/product";

export async function getProducts() {
  return prisma.product.findMany({
    include: {
      brand: true,
      location: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProduct(id: number) {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      brand: true,
      location: true,
    },
  });
}

export async function createProduct(data: CreateProduct) {
  return prisma.product.create({
    data: {
      name: data.name,
      category: data.category,
      cost: data.cost,
      retail: data.retail,
      quantity: data.quantity,
      minimumStock: data.minimumStock,
      supplier: data.supplier,
      image: data.image,

      brandId: data.brandId || null,
      locationId: data.locationId || null,
    },
    include: {
      brand: true,
      location: true,
    },
  });
}

export async function updateProduct(
  id: number,
  data: Partial<CreateProduct>
) {
  return prisma.product.update({
    where: {
      id,
    },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.cost !== undefined && { cost: data.cost }),
      ...(data.retail !== undefined && { retail: data.retail }),
      ...(data.quantity !== undefined && { quantity: data.quantity }),
      ...(data.minimumStock !== undefined && {
        minimumStock: data.minimumStock,
      }),
      ...(data.supplier !== undefined && { supplier: data.supplier }),
      ...(data.image !== undefined && { image: data.image }),
      ...(data.brandId !== undefined && { brandId: data.brandId }),
      ...(data.locationId !== undefined && {
        locationId: data.locationId,
      }),
    },
    include: {
      brand: true,
      location: true,
    },
  });
}

export async function deleteProduct(id: number) {
  return prisma.product.delete({
    where: {
      id,
    },
  });
}