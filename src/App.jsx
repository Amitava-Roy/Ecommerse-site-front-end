import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import Home from "./pages/Home";
const Home = lazy(() => import("./pages/Home"));
// import LayOut from "./component/LayOut";
const LayOut = lazy(() => import("./component/LayOut"));
import ProductDetails from "./pages/ProductDetails";
// const ProductDetails = lazy(() =>
//   import("./pages/ProductDetails")
// );

import { shopData } from "./api-services/shop";

import { useQuery } from "@tanstack/react-query";
// import Cart from "./pages/Cart";
const Cart = lazy(() => import("./pages/Cart"));

// import UserSignup from "./pages/UserSignup";
const UserSignup = lazy(() => import("./pages/UserSignup"));

// import User from "./pages/User";
const User = lazy(() => import("./pages/User"));

// import Order from "./pages/Order";
const Order = lazy(() => import("./pages/Order"));

import AdminSignup from "./pages/AdminSignup";
// const AdminSignup = lazy(() =>
//   import("./pages/AdminSignup")
// );

// import LayOutAdmin from "./component/LayOutAdmin";
const LayOutAdmin = lazy(() =>
  import("./component/LayOutAdmin")
);

// import AdminShop from "./pages/AdminShop";
const AdminShop = lazy(() => import("./pages/AdminShop"));

import { Toaster } from "react-hot-toast";
import Spinner from "./pages/Spinner";
import { Skeleton } from "@mui/material";

function App() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["shop"],
    queryFn: shopData,
  });
  // delet token before closing window
  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();
      localStorage.removeItem("token");

      localStorage.removeItem("token_admin");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleTabClose
      );
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayOut />}>
            <Route
              index
              path="/"
              element={
                <Suspense fallback={<Spinner />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/:id"
              element={<ProductDetails product={data} />}
            />
            <Route
              path="cart"
              element={
                <Suspense fallback={<Spinner />}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="user/signup"
              element={
                <Suspense fallback={<Spinner />}>
                  <UserSignup />
                </Suspense>
              }
            />
            <Route
              path="user"
              element={
                <Suspense fallback={<Spinner />}>
                  <User />
                </Suspense>
              }
            />
            <Route
              path="user/order"
              errorElement={<Error />}
              element={
                <Suspense fallback={<Spinner />}>
                  <Order />
                </Suspense>
              }
            />
            <Route
              path="admin/signup"
              element={
                <Suspense fallback={<Spinner />}>
                  <AdminSignup />
                </Suspense>
              }
            />
          </Route>
          <Route
            element={
              <Suspense fallback={<Spinner />}>
                <LayOutAdmin />
              </Suspense>
            }
          >
            <Route
              path="admin/shop"
              element={<AdminShop proudcts={data} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: { duration: 4000 },
          error: { duration: 5000 },

          style: {
            maxWidth: "500px",
            fontSize: "16px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </>
  );
}

export default App;
