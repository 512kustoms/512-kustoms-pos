"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInstallJob(formData: FormData) {
  const customerId = formData.get("customerId");

  await prisma.installJob.create({
    data: {
      customerId: customerId ? Number(customerId) : null,

      title: String(formData.get("title")),

      vehicle: String(formData.get("vehicle") || ""),

      notes: String(formData.get("notes") || ""),

      laborCost: Number(formData.get("laborCost") || 0),
    },
  });

  revalidatePath("/installs");
  redirect("/installs");
}

export async function addInstallItem(formData: FormData) {
  const installId = Number(formData.get("installId"));
  const productId = Number(formData.get("productId"));
  const quantity = Number(formData.get("quantity"));

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found.");
  }

  const existing = await prisma.installItem.findFirst({
    where: {
      installJobId: installId,
      productId,
    },
  });

  if (existing) {
    await prisma.installItem.update({
      where: {
        id: existing.id,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
  } else {
    await prisma.installItem.create({
      data: {
        installJobId: installId,
        productId,
        quantity,
        unitPrice: product.retail,
      },
    });
  }

  revalidatePath(`/installs/${installId}`);
}