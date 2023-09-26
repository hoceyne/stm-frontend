import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import Library from "./Components/Library/Library.jsx";
import Form from "./Components/Library/Orders/Form.jsx";
import OrdersList from "./Components/Library/Orders/OrdersList.jsx";
import ProductsList from "./Components/Library/Products/ProductsList.jsx";
import Product from "./Components/Library/Products/Product.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" exact element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/library" element={<Library />} />
                <Route path="/order" element={<Form />} />
                <Route path="/orders" element={<OrdersList />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/products" element={<ProductsList />} />
                
                <Route path="/*" element={<App />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
