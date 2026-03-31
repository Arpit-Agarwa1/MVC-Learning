import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.post(
        "http://localhost:3000/user/logout",
        {},
        { withCredentials: true }
      );

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="header">
      <h2>Budget Calculator</h2>

      <div className="nav-buttons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/records")}>Records</button>
        <button onClick={() => navigate("/product")}>Products</button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
