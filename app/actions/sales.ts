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

  vendor: string;
  vendorCost: number;
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

  const tax = 0;

  const total = subtotal + tax;

  const invoiceNumber =
    "INV-" + Date.now().toString();

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

          vendor: item.dropship
            ? item.vendor
            : null,
        },
      });

      // Only reduce inventory for stock items
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

    // Automatically create Vendor Purchase Orders
    // for all dropship items
    const dropshipItems = items.filter(
      (item) => item.dropship
    );

    if (dropshipItems.length > 0) {
      const vendorGroups = new Map<
        string,
        CheckoutItem[]
      >();

      for (const item of dropshipItems) {
        const group =
          vendorGroups.get(item.vendor) ?? [];

        group.push(item);

        vendorGroups.set(
          item.vendor,
          group
        );
      }

      for (const [
        vendor,
        vendorItems,
      ] of vendorGroups) {
        const purchaseSubtotal =
          vendorItems.reduce(
            (sum, item) =>
              sum +
              item.vendorCost *
                item.quantity,
            0
          );

        const saleTotal =
          vendorItems.reduce(
            (sum, item) =>
              sum +
              (item.price -
                item.discount) *
                item.quantity,
            0
          );

        const profit =
          saleTotal -
          purchaseSubtotal;

        const vendorCode =
          vendor.trim().length > 0
            ? vendor
                .slice(0, 3)
                .toUpperCase()
            : "GEN";

        const purchase =
          await tx.purchase.create({
            data: {
              purchaseNumber:
                "PO-" +
                Date.now().toString() +
                "-" +
                vendorCode,

              supplier: vendor,

              subtotal:
                purchaseSubtotal,

              total:
                purchaseSubtotal,

              status: "PENDING",

              paid: true,

              paidAmount:
                purchaseSubtotal,

              paidAt: new Date(),

              profit,

              notes: `Auto-generated from dropship sale ${invoiceNumber}`,
            },
          });
        for (const item of vendorItems) {
          await tx.purchaseItem.create({
            data: {
              purchaseId: purchase.id,
              productId: item.id,
              quantity: item.quantity,
              unitCost: item.vendorCost,
            },
          });

          // No inventory updates here because these
          // are dropship items and never enter stock.
        }
      }
    }
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/inventory");
  revalidatePath("/sales");
  revalidatePath("/customers");
  revalidatePath("/invoices");
  revalidatePath("/purchases");
}