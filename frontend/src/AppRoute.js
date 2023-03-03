import Home from "./pages/Home/Home";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import HomeAdmin from "./pages/Admin/HomeAdmin";

const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/admin" element={<HomeAdmin />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoute;
 