import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
export default function App() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    username: "",
    password: "",
  });
  const [records, setRecords] = useState([]);

  // Handle input change
  function handleChange(e) {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Saved Data:", data);

    try {
      await api.post("/user/register", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    // Example: reset form after submit
    setData({
      name: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      username: "",
      password: "",
    });
  }
  async function viewRecords() {
    // try {
    //   const res = await axios.get("http://localhost:3000/user/records");
    //   setRecords(res.data);
    // } catch (error) {
    //   console.error(error);
    // }
    navigate("/records");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          value={data.name}
          type="text"
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          name="email"
          value={data.email}
          type="email"
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          name="phone"
          value={data.phone}
          type="text"
          onChange={handleChange}
        />

        <label>Gender</label>
        <select name="gender" value={data.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>DOB</label>
        <input
          name="dob"
          value={data.dob}
          type="date"
          onChange={handleChange}
        />

        <label>Username</label>
        <input
          name="username"
          value={data.username}
          type="text"
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          name="password"
          value={data.password}
          type="password"
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
        <button type="button" onClick={viewRecords}>
          View Records
        </button>
      </form>

      {/* 👇 ADD THIS PART */}
      {records.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records found</p>
      )}
    </div>
  );
}
