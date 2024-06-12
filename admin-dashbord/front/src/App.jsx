import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Products from "./Pages/Products";
import Admin from "./Pages/Admin";
import ProductDetails from "./Pages/ProductDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./Pages/Auth";
import AuthContext from "./Utils/AuthContext";
export default function App() {
  const [token, setToken] = useState();
  const handleToken=(e)=>{
    setToken(e)
  }
  return (
    <>
      <AuthContext.Provider value={{ token, handleToken}}>
        <Navbar />
        <Box minHeight={"80vh"}>
          <Routes>
            <Route exact path={"/"} element={<Products />} />
            <Route path={"/admin"} element={token?<Admin />:<Navigate to={'/auth'}/>} />
            <Route
              path={"/product-details/:id/:name"}
              element={<ProductDetails />}
            />
            <Route path={"/auth"} element={token?<Navigate to={'/admin'}/>:<Auth />} />
          </Routes>
        </Box>
        <Footer />
      </AuthContext.Provider>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
}
