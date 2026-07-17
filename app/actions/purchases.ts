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
    throw new Error("Purchase must contain at least one item.");
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitCost,
    0
  );

  await prisma.$transaction(async (tx) => {
    const purchase = await tx.purchase.create({
      data: {
        purchaseNumber: `PO-${Date.now()}`,
        supplier,
        subtotal,
        total: subtotal,

        status: "PENDING",

        paid: false,
        paidAmount: 0,

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
    }
  });

  revalidatePath("/purchases");
}

export async function receivePurchase(id: number) {
  await prisma.$transaction(async (tx) => {
    const purchase = await tx.purchase.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });

    if (!purchase) {
      throw new Error("Purchase not found.");
    }

    if (purchase.status === "RECEIVED") {
      return;
    }

    for (const item of purchase.items) {
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

    await tx.purchase.update({
      where: {
        id,
      },
      data: {
        status: "RECEIVED",
      },
    });
  });

  revalidatePath("/inventory");
  revalidatePath("/purchases");
}