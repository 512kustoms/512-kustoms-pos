import { prisma } from "@/lib/prisma";
import { CreateProduct } from "@/types/product";

export async function getProducts() {
  return prisma.product.findMany({
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
  });
}

export async function createProduct(data: CreateProduct) {
  return prisma.product.create({
    data,
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
    data,
  });
}

export async function deleteProduct(id: number) {
  return prisma.product.delete({
    where: {
      id,
    },
  });
}