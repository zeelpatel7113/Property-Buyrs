"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface CartContextType {
  onRemove: (product: any) => void;
  toggleCartItemQty: (id: any, value: any) => void;
  totalPrice: number;
  totalQuantity: number;
  showCart: boolean;
  setShowCart: (value: boolean) => void;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  cartItems: any[];
  addProduct: (product: any, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [qty, setQty] = useState(1);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart.cartItems || []);
      setTotalQuantity(parsedCart.totalQuantity || 0);
      setTotalPrice(parsedCart.totalPrice || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify({ cartItems, totalQuantity, totalPrice })
    );
  }, [cartItems, totalQuantity, totalPrice]);

  const incQty = () => setQty((prevQty) => prevQty + 1);
  const decQty = () => setQty((prevQty) => Math.max(1, prevQty - 1));

  const addProduct = (product: any, quantity: number) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalQuantity((prev) => prev + quantity);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);

    if (checkProductInCart) {
      setCartItems(cartItems.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const toggleCartItemQty = (id: any, value: string) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        if (value === "plus") return { ...item, quantity: item.quantity + 1 };
        if (value === "minus" && item.quantity > 1) return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setCartItems(updatedCartItems);

    setTotalQuantity(updatedCartItems.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
  };

  const onRemove = (product: any) => {
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setCartItems(newCartItems);
    setTotalQuantity((prev) => prev - product.quantity);
    setTotalPrice((prev) => prev - product.price * product.quantity);
  };

  return (
    <CartContext.Provider value={{
      onRemove,
      toggleCartItemQty,
      totalPrice,
      totalQuantity,
      showCart,
      setShowCart,
      qty,
      incQty,
      decQty,
      cartItems,
      addProduct,
    }}>
      {children}
    </CartContext.Provider>
  );
};
