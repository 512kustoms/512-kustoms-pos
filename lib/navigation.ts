import {
  LayoutDashboard,
  Boxes,
  Users,
  ShoppingCart,
  Truck,
  FileText,
  Wrench,
  BarChart3,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Boxes,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    name: "Sales",
    href: "/sales",
    icon: ShoppingCart,
  },
  {
    name: "Purchases",
    href: "/purchases",
    icon: Truck,
  },
  {
    name: "Invoices",
    href: "/invoices",
    icon: FileText,
  },
  {
    name: "Install Jobs",
    href: "/installs",
    icon: Wrench,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];