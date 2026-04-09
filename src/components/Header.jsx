import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import "./Header.css";
import api from "../../axios";

function Header() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  console.log(cart);

  // ✅ calculate total quantity
  const cartCount = cart
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  async function handleLogout() {
    try {
      await api.post("/user/logout", {}, { withCredentials: true });

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="header">
      <h2>Budget Calculator</h2>

      <div className="nav-buttons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/records")}>Records</button>
        <button onClick={() => navigate("/product")}>Products</button>

        <div
          className="cart-container"
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer" }}
        >
          🛒
          <span className="cart-count">{cartCount}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
