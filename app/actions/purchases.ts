"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
        receivedAt: new Date(),
      },
    });
  });

  revalidatePath("/inventory");
  revalidatePath("/purchases");
}