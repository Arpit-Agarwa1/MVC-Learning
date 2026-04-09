import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routing from "./Routing.jsx";
import { CartProvider } from "./context/cartContext.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CartProvider>
      <Routing />
    </CartProvider>
  </React.StrictMode>
);
