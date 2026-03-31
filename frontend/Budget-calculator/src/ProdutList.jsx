import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/product/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const openProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="products-container">
      <h2 className="products-title">Our Products</h2>

      <div className="products-grid">
        {products.map((item) => (
          <div
            key={item._id}
            className="product-card"
            onClick={() => openProduct(item._id)}
          >
            <img
              src={`http://localhost:3000/${item.image}`}
              alt={item.title}
              className="product-img"
            />

            <div className="product-info">
              <h3 className="product-title">{item.title}</h3>

              <p className="product-desc">{item.description}</p>

              <div className="price-box">
                <span className="mrp">₹{item.mrp}</span>
                <span className="selling">₹{item.sellingPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
