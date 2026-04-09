import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const res = await api.get("/cart", {
        withCredentials: true,
      });

      setCart(res.data);
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  }
  const removeItem = async (cartItemId) => {
    try {
      await api.delete(`/cart/remove/${cartItemId}`, {
        withCredentials: true,
      });

      // update UI instantly
      setCart((prev) => prev.filter((item) => item._id !== cartItemId));
    } catch (error) {
      console.error(
        "Error removing item:",
        error.response?.data || error.message
      );
    }
  };

  if (loading) {
    return <h2 style={{ padding: "30px" }}>Loading cart...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3>{item.productId?.title}</h3>
              <p>Price: ₹{item.productId?.sellingPrice}</p>
              <p>Quantity: {item.quantity}</p>
            </div>

            <button
              onClick={() => removeItem(item._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
