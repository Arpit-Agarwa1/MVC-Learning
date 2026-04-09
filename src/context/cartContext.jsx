import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = function ({ children }) {
  const [cart, setCart] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(function () {
    if (userId) {
      fetchCart();
    }
  }, []);

  async function fetchCart() {
    try {
      const res = await axios.get(`http://localhost:3000/cart/${userId}`);
      setCart(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addToCart(productId) {
    try {
      await axios.post("http://localhost:3000/cart/add", {
        userId: userId,
        productId: productId,
      });

      fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function removeFromCart(id) {
    try {
      await axios.delete(`http://localhost:3000/cart/remove/${id}`);
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
