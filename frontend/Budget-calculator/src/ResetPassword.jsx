import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import api from "../axios";

export default function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return setMessage("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await api.post(`/auth/reset-password/${token}`, { password });

      setMessage(res.data.message);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Reset Password</h2>

      <form onSubmit={resetPassword}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Reset Password</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
