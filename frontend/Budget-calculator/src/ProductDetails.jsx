import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const res = await axios.get(`http://localhost:3000/product/${id}`);
    setProduct(res.data);
  };

  if (!product) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="product-page">
      <div className="product-wrapper">
        <div className="product-image">
          <img
            src={`http://localhost:3000/${product.image}`}
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

          <button className="buy-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
