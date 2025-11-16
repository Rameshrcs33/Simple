import React from "react";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  category?: string;
};

type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
};

const OrdersContext = React.createContext<{
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date">) => void;
  clearOrders: () => void;
} | null>(null);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = React.useState<Order[]>([]);

  const addOrder = (o: Omit<Order, "id" | "date">) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items: o.items,
      total: o.total,
      date: new Date().toISOString(),
    };
    setOrders((s) => [newOrder, ...s]);
  };

  const clearOrders = () => setOrders([]);

  return <OrdersContext.Provider value={{ orders, addOrder, clearOrders }}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = React.useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}

export type { Order, OrderItem };
