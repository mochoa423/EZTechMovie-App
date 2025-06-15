import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage on first render
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [warning, setWarning] = useState("");

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const isSubscription = item.type === "subscription";
    const alreadyHasSubscription = cartItems.some(
      (cartItem) => cartItem.type === "subscription"
    );

    if (isSubscription && alreadyHasSubscription) {
      setWarning("You can only have one subscription at a time.");
      setTimeout(() => setWarning(""), 3000);
      return;
    }

    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    setWarning("");
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          // Prevent multiple subscriptions
          if (item.type === "subscription" && newQuantity > 1) {
            setWarning("You can only have one subscription at a time.");
            setTimeout(() => setWarning(""), 3000);
            return item;
          }
          setWarning(""); // clear previous warning
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
        warning,
        setWarning,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
