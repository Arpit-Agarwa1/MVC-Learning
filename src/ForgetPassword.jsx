import React, { useState } from "react";
import axios from "axios";
import api from "../axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendResetLink = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/forgot-password", { email });

      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Forgot Password</h2>

      <form onSubmit={sendResetLink}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">Send Reset Link</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
