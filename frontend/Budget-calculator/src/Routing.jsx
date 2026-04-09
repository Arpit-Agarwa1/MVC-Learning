import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Record from "./Record";
import Layout from "./Layout";
import Login from "./Login";
import Products from "./Products";
import ProductsList from "./ProdutList";
import ProductDetails from "./ProductDetails";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "./Cart";
import ForgotPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import AdminLogin from "./adminFrontend/AdminLogin";

export default function Routing() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <App />,
        },
        {
          path: "records",
          element: (
            <ProtectedRoute>
              <Record />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password/:token",
          element: <ResetPassword />,
        },
        {
          path: "product",
          element: <Products />,
        },
        {
          path: "products",
          element: <ProductsList />,
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
