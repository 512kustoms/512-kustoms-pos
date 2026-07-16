"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, UserCircle2 } from "lucide-react";

interface SearchProduct {
  id: number;
  name: string;
  brand: string;
  sku: string;
}

interface SearchCustomer {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [customers, setCustomers] = useState<SearchCustomer[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length === 0) {
      setProducts([]);
      setCustomers([]);
      setOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setProducts(data.products);
      setCustomers(data.customers);
      setOpen(true);
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToInventory() {
    setOpen(false);
    setQuery("");
    router.push("/inventory");
  }

  function goToCustomers() {
    setOpen(false);
    setQuery("");
    router.push("/customers");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">

      <div ref={containerRef} className="relative w-96">

        <div className="flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-2">

          <Search
            size={18}
            className="text-zinc-400"
          />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length > 0 && setOpen(true)}
            placeholder="Search products, customers..."
            className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
          />

        </div>

        {open && (products.length > 0 || customers.length > 0) && (
          <div className="absolute z-50 mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2 shadow-xl">

            {products.length > 0 && (
              <div className="mb-2">
                <p className="px-2 py-1 text-xs font-semibold uppercase text-zinc-500">
                  Products
                </p>
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={goToInventory}
                    className="block w-full rounded-md px-2 py-2 text-left text-sm text-white hover:bg-zinc-800"
                  >
                    {product.name}{" "}
                    <span className="text-zinc-500">
                      • {product.brand}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {customers.length > 0 && (
              <div>
                <p className="px-2 py-1 text-xs font-semibold uppercase text-zinc-500">
                  Customers
                </p>
                {customers.map((customer) => (
                  <button
                    key={customer.id}
                    onClick={goToCustomers}
                    className="block w-full rounded-md px-2 py-2 text-left text-sm text-white hover:bg-zinc-800"
                  >
                    {customer.firstName} {customer.lastName}{" "}
                    <span className="text-zinc-500">
                      • {customer.phone}
                    </span>
                  </button>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      <div className="flex items-center gap-6">

        <Bell
          size={20}
          className="cursor-pointer text-zinc-400 hover:text-violet-500"
        />

        <div className="flex items-center gap-3">

          <UserCircle2
            size={36}
            className="text-violet-500"
          />

          <div>

            <p className="font-semibold text-white">
              Cristian
            </p>

            <p className="text-xs text-zinc-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}