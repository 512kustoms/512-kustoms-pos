"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface PurchaseItemInput {
  productId: number;
  quantity: number;
  unitCost: number;
}

export async function createPurchase(
  supplier: string,
  items: PurchaseItemInput[],
  notes?: string
) {
  if (items.length === 0) {
    throw new Error("Purchase must have at least one item.");
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitCost * item.quantity,
    0
  );

  const total = subtotal;

  const purchaseNumber = "PO-" + Date.now().toString();

  await prisma.$transaction(async (tx) => {
    const purchase = await tx.purchase.create({
      data: {
        purchaseNumber,
        supplier,
        subtotal,
        total,
        notes: notes || null,
      },
    });

    for (const item of items) {
      await tx.purchaseItem.create({
        data: {
          purchaseId: purchase.id,
          productId: item.productId,
          quantity: item.quantity,
          unitCost: item.unitCost,
        },
      });

      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          quantity: {
            increment: item.quantity,
          },
          cost: item.unitCost,
        },
      });
    }
  });

  revalidatePath("/");
  revalidatePath("/inventory");
  revalidatePath("/sales");
  revalidatePath("/purchases");
}