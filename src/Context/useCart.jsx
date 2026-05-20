import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // [{id, name, price, image, qty}]
  const [orders, setOrders] = useState([]); // [{id, items, total, status, eta, createdAt, progressStep}]

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((x) => x.id === product.id);
      if (existing) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + qty } : x
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, x) => sum + x.price * x.qty, 0),
    [cartItems]
  );

  // Call this from "Check & Pay" when payment succeeds
  const placeOrder = () => {
    if (cartItems.length === 0) return null;

    const newOrder = {
      id: `ORDER-${Date.now()}`,
      items: cartItems.reduce((sum, x) => sum + x.qty, 0),
      total: cartTotal,
      status: "PENDING",
      eta: "20:00 mins",
      createdAt: new Date().toLocaleString(),
      progressStep: 1,
      lineItems: cartItems,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const value = {
    cartItems,
    cartTotal,
    addToCart,
    clearCart,
    orders,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};