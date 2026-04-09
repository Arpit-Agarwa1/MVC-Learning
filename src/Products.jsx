import React, { useState } from "react";
import axios from "axios";
import api from "../axios";

export default function Products() {
  const [form, setForm] = useState({
    title: "",
    mrp: "",
    sellingPrice: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("mrp", form.mrp);
    formData.append("sellingPrice", form.sellingPrice);
    formData.append("description", form.description);
    formData.append("image", image);

    try {
      const res = await api.post("/product/add", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);

      alert("Product Added ✅");

      // reset form
      setForm({
        title: "",
        mrp: "",
        sellingPrice: "",
        description: "",
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Error adding product ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="number"
          name="mrp"
          placeholder="MRP"
          value={form.mrp}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price"
          value={form.sellingPrice}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <br />
        <br />

        <input type="file" accept="image/*" onChange={handleImage} required />
        <br />
        <br />

        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
}
