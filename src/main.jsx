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

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" exact element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/library" element={<Library />} />
                <Route path="/*" element={<App />} />
                <Route path="/order" element={<Form />} />
                <Route path="/orders" element={<OrdersList />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
