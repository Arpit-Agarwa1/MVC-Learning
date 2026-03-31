import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/user/login", data, {
        withCredentials: true,
      });

      console.log(res.data);

      if (res.data.message === "Login successful") {
        navigate("/records");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input name="username" value={data.username} onChange={handleChange} />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
