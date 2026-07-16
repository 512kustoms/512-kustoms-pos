import { Package, AlertTriangle, DollarSign, Boxes } from "lucide-react";
import { inventory } from "@/lib/mockData";

export default function InventoryStats() {
  const totalProducts = inventory.length;

  const totalUnits = inventory.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const inventoryValue = inventory.reduce(
    (sum, product) => sum + product.quantity * product.cost,
    0
  );

  const lowStock = inventory.filter(
    (product) => product.quantity <= product.reorderLevel
  ).length;

  const cards = [
    {
      title: "Products",
      value: totalProducts,
      icon: Package,
    },
    {
      title: "Units In Stock",
      value: totalUnits,
      icon: Boxes,
    },
    {
      title: "Inventory Value",
      value: `$${inventoryValue.toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-400">{card.title}</p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                {card.value}
              </h2>
            </div>

            <card.icon className="text-violet-500" size={34} />
          </div>
        </div>
      ))}
    </div>
  );
}