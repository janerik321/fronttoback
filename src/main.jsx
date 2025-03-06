import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import HomeView from "./views/HomeView.jsx";
import ProductsView from "./views/ProductsView.jsx";
import OrdersView from "./views/OrdersView.jsx";

const router = createBrowserRouter([
  {
    path: "/fronttoback/",
    element: <App />,
    children: [
      { index: true, element: <HomeView /> },
      { path: "/fronttoback/products", element: <ProductsView /> },
      { path: "/fronttoback/orders", element: <OrdersView /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
