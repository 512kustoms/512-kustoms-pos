"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
  await prisma.product.create({
data: {
  name: String(formData.get("name")),

  brandId: Number(formData.get("brandId")),

  category: String(formData.get("category")),

  cost: Number(formData.get("cost")),
  retail: Number(formData.get("retail")),

  quantity: Number(formData.get("quantity")),
  minimumStock: Number(formData.get("minimumStock")),

  supplier:
    String(formData.get("supplier") || "") || null,

  locationId: formData.get("locationId")
    ? Number(formData.get("locationId"))
    : null,

  image: null,
},
  });

  revalidatePath("/");
  revalidatePath("/inventory");
  revalidatePath("/sales");

  redirect("/inventory");
}

export async function updateProduct(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.product.update({
    where: {
      id,
    },

data: {
  name: String(formData.get("name")),

  brandId: Number(formData.get("brandId")),

  category: String(formData.get("category")),

  sku: String(formData.get("sku")),
  barcode: String(formData.get("barcode") || ""),

  cost: Number(formData.get("cost")),
  retail: Number(formData.get("retail")),

  quantity: Number(formData.get("quantity")),
  minimumStock: Number(formData.get("minimumStock")),

  supplier:
    String(formData.get("supplier") || "") || null,

  locationId: formData.get("locationId")
    ? Number(formData.get("locationId"))
    : null,
},
  });

  revalidatePath("/");
  revalidatePath("/inventory");
  revalidatePath("/sales");

  redirect("/inventory");
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  revalidatePath("/inventory");
  revalidatePath("/sales");
}