import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userId"); // Make sure this exists

  // Fetch cart when component mounts
  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  // Fetch cart items for the logged-in user
  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/cart/${userId}`);
      setCart(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Remove item from cart
  const removeItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:3000/cart/remove/${cartItemId}`);
      // Update cart immediately
      setCart((prevCart) => prevCart.filter((item) => item._id !== cartItemId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Render cart items
  const renderCartItems = () => {
    if (!cart.length) {
      return <p>Your cart is empty</p>;
    }

    return cart.map((item) => (
      <div
        key={item._id}
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          marginBottom: "15px",
          borderRadius: "8px",
        }}
      >
        <h3>{item.productId?.title || "Unknown Product"}</h3>
        <p>Price: ₹{item.productId?.sellingPrice || 0}</p>
        <p>Quantity: {item.quantity}</p>
        <button onClick={() => removeItem(item._id)}>Remove</button>
      </div>
    ));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Cart</h2>
      {renderCartItems()}
    </div>
  );
}
