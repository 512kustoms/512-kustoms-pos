"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { checkoutSale } from "@/app/actions/sales";

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
}

interface CartProps {
  customers: Customer[];
}

export default function Cart({
  customers,
}: CartProps) {
  const items = useCartStore((state) => state.items);

  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const updateDiscount = useCartStore(
    (state) => state.updateDiscount
  );

  const updateNotes = useCartStore(
    (state) => state.updateNotes
  );

  const toggleDropship = useCartStore(
    (state) => state.toggleDropship
  );

  const subtotal = useCartStore((state) =>
    state.subtotal()
  );

  const tax = useCartStore((state) =>
    state.tax()
  );

  const total = useCartStore((state) =>
    state.total()
  );

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");
  const [customerId, setCustomerId] =
  useState<number | undefined>();
  async function handleCheckout() {
    if (items.length === 0) return;

    await checkoutSale(
    items,
    paymentMethod,
    customerId
  );

    clearCart();

    alert("Sale Completed!");
  }

  return (
    <div className="flex h-full flex-col">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Shopping Cart
      </h2>

      <div className="flex-1 space-y-4 overflow-auto">

        {items.length === 0 && (
          <div className="rounded-xl bg-zinc-900 p-8 text-center text-zinc-500">
            Cart is empty.
          </div>
        )}

        {items.map((item) => (

          <div
            key={item.id}
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
          >

            <div className="flex items-start justify-between">

              <div>

                <h3 className="text-lg font-semibold text-white">
                  {item.name}
                </h3>

                <p className="text-zinc-500">
                  ${item.price.toFixed(2)} each
                </p>

              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-400"
              >
                <Trash2 size={18} />
              </button>

            </div>

            <div className="mt-4 flex items-center gap-3">

              <button
                onClick={() =>
                  decreaseQuantity(item.id)
                }
                className="h-10 w-10 rounded-lg bg-zinc-800 text-xl text-white hover:bg-zinc-700"
              >
                -
              </button>

              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(
                    item.id,
                    Number(e.target.value)
                  )
                }
                className="w-20 rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-center text-white"
              />

              <button
                onClick={() =>
                  increaseQuantity(item.id)
                }
                className="h-10 w-10 rounded-lg bg-zinc-800 text-xl text-white hover:bg-zinc-700"
              >
                +
              </button>

              <div className="ml-auto text-right">

                <p className="text-xl font-bold text-green-500">
                  $
                  {(
                    (item.price - item.discount) *
                    item.quantity
                  ).toFixed(2)}
                </p>

              </div>

            </div>

            <div className="mt-5">

              <label className="mb-1 block text-sm text-zinc-400">
                Discount ($)
              </label>

              <input
                type="number"
                min={0}
                value={item.discount}
                onChange={(e) =>
                  updateDiscount(
                    item.id,
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-white"
              />

            </div>

            <div className="mt-5">

              <label className="mb-1 block text-sm text-zinc-400">
                Notes
              </label>

              <textarea
                rows={2}
                value={item.notes}
                onChange={(e) =>
                  updateNotes(
                    item.id,
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-white"
              />

            </div>

            <div className="mt-4 flex items-center gap-3">

              <input
                type="checkbox"
                checked={item.dropship}
                onChange={() =>
                  toggleDropship(item.id)
                }
              />

              <span className="text-zinc-300">
                Dropship Item
              </span>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-6 space-y-4 border-t border-zinc-800 pt-6">
        <div>

  <label className="mb-2 block text-sm font-medium text-zinc-400">
    Customer
  </label>

  <select
    value={customerId ?? ""}
    onChange={(e) =>
      setCustomerId(
        e.target.value
          ? Number(e.target.value)
          : undefined
      )
    }
    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
  >

    <option value="">
      Walk-In Customer
    </option>

    {customers.map((customer) => (

      <option
        key={customer.id}
        value={customer.id}
      >
        {customer.firstName} {customer.lastName}
      </option>

    ))}

  </select>

</div>
        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
        >
          <option>Cash</option>
          <option>Card</option>
          <option>Zelle</option>
          <option>Cash App</option>
          <option>Apple Pay</option>
          <option>Financing</option>
        </select>

        <div className="flex justify-between text-lg">

          <span>Subtotal</span>

          <span>
            ${subtotal.toFixed(2)}
          </span>

        </div>

        <div className="flex justify-between">

          <span>Tax</span>

          <span>
            ${tax.toFixed(2)}
          </span>

        </div>

        <div className="flex justify-between border-t border-zinc-700 pt-4 text-3xl font-bold">

          <span>Total</span>

          <span className="text-green-500">
            ${total.toFixed(2)}
          </span>

        </div>

        <button
          onClick={handleCheckout}
          disabled={items.length === 0}
          className="w-full rounded-lg bg-violet-600 py-4 text-lg font-bold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Complete Sale
        </button>

        <button
          onClick={clearCart}
          className="w-full rounded-lg bg-zinc-700 py-3 font-semibold text-white hover:bg-zinc-600"
        >
          Clear Cart
        </button>

      </div>

    </div>
  );
}