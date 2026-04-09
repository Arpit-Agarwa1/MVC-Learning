import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./context/cartContext";
import api from "../axios";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const userId = localStorage.getItem("userId");

  useEffect(function () {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await api.get("/product/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleAddToCart(productId) {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    api
      .post("/cart/add", { productId }, { withCredentials: true })
      .then(function () {
        alert("Added to cart");
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  function openProduct(id) {
    navigate(`/product/${id}`);
  }

  return (
    <div className="products-container">
      <h2 className="products-title">Our Products</h2>

      <div className="products-grid">
        {products.map(function (item) {
          return (
            <div key={item._id} className="product-card">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
                alt={item.title}
                className="product-img"
                onClick={function () {
                  openProduct(item._id);
                }}
              />

              <div className="product-info">
                <h3 className="product-title">{item.title}</h3>

                <p className="product-desc">{item.description}</p>

                <div className="price-box">
                  <span className="mrp">₹{item.mrp}</span>
                  <span className="selling">₹{item.sellingPrice}</span>
                </div>

                <button
                  className="cart-btn"
                  onClick={function () {
                    handleAddToCart(item);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
