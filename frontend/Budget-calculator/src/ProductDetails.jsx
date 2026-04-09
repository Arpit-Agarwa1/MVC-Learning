import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "./context/cartContext";
import "./ProductDetail.css";
import api from "../axios";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const res = await api.get(`/product/${id}`);
    setProduct(res.data);
  };

  if (!product) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="product-page">
      <div className="product-wrapper">
        <div className="product-image">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${product.image}`}
            alt={product.title}
          />
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>

          <p className="product-description">{product.description}</p>

          <div className="price-section">
            <span className="selling-price">₹{product.sellingPrice}</span>
            <span className="mrp-price">₹{product.mrp}</span>
          </div>

          <button className="buy-btn" onClick={() => addToCart(product)}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
