import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ProductsDetails from "./components/ProductsDetails";
import Mens from "./pages/Mens";
import Womens from "./pages/Womens";
import LatestCollections from "./pages/LatestCollections";
import Kids from "./pages/kids";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import MyOrders from "./components/checkout/MyOrder";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id/:slug" element={<ProductsDetails />} />
          <Route path="mens" element={<Mens />} />
          <Route path="womens" element={<Womens />} />
          <Route path="latest" element={<LatestCollections />} />
          <Route path="kids" element={<Kids />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* 🔒 Protected  */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/place-order"
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
