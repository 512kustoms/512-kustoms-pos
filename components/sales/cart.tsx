"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { checkoutSale } from "@/app/actions/sales";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  async function handleCheckout() {
    if (items.length === 0) return;

    await checkoutSale(items, paymentMethod);

    clearCart();

    alert("Sale Completed!");
  }

  return (
    <div className="flex h-full flex-col">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Shopping Cart
      </h2>

      <div className="flex-1 space-y-3 overflow-auto">

        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg bg-zinc-950 p-4"
          >
            <div className="flex justify-between">

              <div>

                <h3 className="font-semibold text-white">
                  {item.name}
                </h3>

                <p className="text-zinc-500">
                  Qty {item.quantity}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-violet-500">
                  $
                  {(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-2 text-red-500"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      <div className="mt-6 space-y-4">

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
        >
          <option>Cash</option>
          <option>Card</option>
          <option>Cash App</option>
          <option>Zelle</option>
        </select>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-t border-zinc-700 pt-4 text-2xl font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full rounded-lg bg-violet-600 py-4 font-bold text-white hover:bg-violet-700"
        >
          Complete Sale
        </button>

        <button
          onClick={clearCart}
          className="w-full rounded-lg bg-zinc-700 py-3 text-white"
        >
          Clear Cart
        </button>

      </div>

    </div>
  );
}