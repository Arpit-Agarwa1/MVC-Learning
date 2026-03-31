import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    try {
      const response = await axios.get("http://localhost:3000/user/check", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setLogin(true);
      }
    } catch (error) {
      setLogin(false);
      console.error("Error checking login:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!login) {
    navigate("/login");
  }
  return children;
}
