"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CheckoutItem {
  id: number;
  name: string;

  quantity: number;

  price: number;

  discount: number;

  notes: string;

  dropship: boolean;
}

export async function checkoutSale(
  items: CheckoutItem[],
  paymentMethod: string,
  customerId?: number
) {
  if (items.length === 0) {
    throw new Error("Cart is empty.");
  }

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      (item.price - item.discount) *
        item.quantity,
    0
  );

  const tax = subtotal * 0.0825;

  const total = subtotal + tax;

  const invoiceNumber =
    "INV-" +
    Date.now().toString();

  await prisma.$transaction(async (tx) => {
    const sale = await tx.sale.create({
      data: {
        invoiceNumber,

        subtotal,

        tax,

        total,

        paymentMethod,

        customerId: customerId ?? null,
      },
    });

    for (const item of items) {
      await tx.saleItem.create({
        data: {
          saleId: sale.id,

          productId: item.id,

          quantity: item.quantity,

          price: item.price - item.discount,

          fulfillment: item.dropship
            ? "DROPSHIP"
            : "STOCK",

          status: item.dropship
            ? "ORDERED"
            : "DELIVERED",

          notes: item.notes,
        },
      });

      if (!item.dropship) {
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
    }
  });

  revalidatePath("/");

  revalidatePath("/dashboard");

  revalidatePath("/inventory");

  revalidatePath("/sales");

  revalidatePath("/customers");

  revalidatePath("/invoices");
}