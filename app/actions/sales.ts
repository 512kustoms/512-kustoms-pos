"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CheckoutItem {
  id: number;
  quantity: number;
  price: number;
}

export async function checkoutSale(
  items: CheckoutItem[],
  paymentMethod: string
) {
  if (items.length === 0) {
    throw new Error("Cart is empty.");
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  const invoiceNumber =
    "INV-" + Date.now().toString();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
await prisma.$transaction(async (tx) => {
    const sale = await tx.sale.create({
      data: {
        invoiceNumber,
        subtotal,
        tax,
        total,
        paymentMethod,
      },
    });

    for (const item of items) {
      await tx.saleItem.create({
        data: {
          saleId: sale.id,
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        },
      });

      await tx.product.update({
        where: {
          id: item.id,
        },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });
    }
  });

  revalidatePath("/inventory");
  revalidatePath("/sales");
  revalidatePath("/");
}