export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type PaymentMethod =
  | "Cash"
  | "Card"
  | "Cash App"
  | "Zelle";