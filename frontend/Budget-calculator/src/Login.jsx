import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../axios";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/user/login", data, {
        withCredentials: true,
      });

      if (res.data.message === "Login successful") {
        navigate("/records");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>

      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label>Username</label>
        <input
          name="username"
          value={data.username}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />

        {/* forgot password link */}
        <Link to="/forgot-password" style={{ fontSize: "14px" }}>
          Forgot Password?
        </Link>

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
