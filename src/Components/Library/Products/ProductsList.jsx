import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProductsList() {
    const url = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const [form, setForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [cartProducts, setCartProducts] = useState([]);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [wilaya, setWilaya] = useState("");
    const [phone_num, setPhone] = useState("");
    const hide = () => {
        setForm(false);
    };
    const showForm = () => {
        setForm(true);
    };
    const handleInputChange = (index, field, value) => {
        value = value.trim();
        if (value === "") {
            value = "0";
        }
        value = parseInt(value, 10);
        if (isNaN(value) || value < 0) {
            return;
        }

        const updatedCartProducts = [...cartProducts];
        updatedCartProducts[index][field] = value;

        const updatedCartCount = updatedCartProducts.reduce(
            (count, product) => count + product.qte,
            0
        );

        setCartProducts(updatedCartProducts);
        setCartCount(updatedCartCount);
    };

    const handleRemoveProduct = (index, qte) => {
        setCartCount(cartCount - qte);
        const updatedProducts = cartProducts.filter(
            (product) => product.id !== index
        );
        setCartProducts(updatedProducts);
    };
    const handleAddButton = (data) => {
        const existingProduct = cartProducts.find(
            (product) => product.id === data.id
        );

        if (existingProduct) {
            const updatedCartProducts = cartProducts.map((product) => {
                if (product.id === data.id) {
                    return { ...product, qte: product.qte + 1 };
                }
                return product;
            });
            setCartProducts(updatedCartProducts);
        } else {
            setCartProducts([
                ...cartProducts,
                { id: data.id, name: data.name, price: data.price, qte: 1 },
            ]);
        }
        setCartCount(cartCount + 1);
    };
    const getProducts = async () => {
        axios({
            method: "get",
            url: url + "/products",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        }).then((response) => {
            setProducts(response.data);
        });
    };

    const create_order = async () => {
        axios({
            method: "post",
            url: url + "/clients",
            data: {
                name,
                email,
                phone_num,
                city,
                wilaya,
            },
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        }).then((response) => {
            const id = response.data.id;
            axios({
                method: "post",
                url: url + "/orders/clients/" + id,
                data: {
                    products: cartProducts,
                },
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "Application/json",
                },
            }).then((response) => {
                setForm(false);
            });
        });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="navbar bg-sky-700 p-4 h-14 flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1 justify-end">
                    <div className="relative flex items-center max-w-lg flex-1">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-2 py-1 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 flex-1"
                            onChange={handleSearch}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <i className="fa-solid fa-search text-gray-400"></i>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="transition duration-150 ease-in-out text-gray-300 w-8 h-12 text-center"
                        onClick={showForm}
                    >
                        <i className="fa-solid fa-cart-shopping">
                            {cartCount > 0 && (
                                <div className="bg-red-500 text-white text-xs rounded-full w-auto h-auto flex items-center justify-center absolute -top-0 -right-0">
                                    {cartCount}
                                </div>
                            )}
                        </i>
                    </button>
                </div>
            </div>
            {form ? (
                <div className="absolute bg-black bg-opacity-25 top-0 left-0 z-50 w-full h-screen flex justify-center overflow-auto 2xl:items-center">
                    <div className=" flex flex-col max-w-[600px] h-fit break-words w-full bg-slate-100  shadow-lg rounded-lg border-0 m-auto">
                        <div className="rounded-t bg-white mb-0 px-6 py-3 align-middle">
                            <div className="text-center flex justify-between">
                                <h6 className="text-slate-700 text-xl font-bold capitalize">
                                    Cart
                                </h6>
                                <button
                                    className=" text-white bg-red-600 hover:bg-white hover:border hover:border-solid hover:text-red-600 w-8 h-8 rounded-full shadow hover:shadow-lg outline-none  ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        hide();
                                    }}
                                >
                                    <i className="fa-solid fa-close"></i>
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-10 py-4">
                            <form>
                                <div className="flex flex-wrap">
                                    <div className="w-full px-4">
                                        <div className=" w-full mb-3">
                                            <label
                                                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                email
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="email"
                                                onChange={(event) => {
                                                    setEmail(
                                                        event.target.value
                                                    );
                                                }}
                                                value={email}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <div className=" w-full mb-3">
                                            <label
                                                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                name
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="name"
                                                onChange={(event) => {
                                                    setName(event.target.value);
                                                }}
                                                value={name}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <div className=" w-full mb-3">
                                            <label
                                                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                phone number
                                            </label>
                                            <input
                                                type="number"
                                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="phone number"
                                                onChange={(event) => {
                                                    setPhone(
                                                        event.target.value
                                                    );
                                                }}
                                                value={phone_num}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <div className=" w-full mb-3">
                                            <label
                                                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                city
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="city"
                                                onChange={(event) => {
                                                    setCity(event.target.value);
                                                }}
                                                value={city}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <div className=" w-full mb-3">
                                            <label
                                                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                wilaya
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="wilaya"
                                                onChange={(event) => {
                                                    setWilaya(
                                                        event.target.value
                                                    );
                                                }}
                                                value={wilaya}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <div className=" w-full mb-3">
                                            <label
                                                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Products
                                            </label>
                                            {cartProducts.map(
                                                (product, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-4 my-3"
                                                    >
                                                        <p className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                                            {product.name}
                                                        </p>
                                                        <p className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                                            {product.price} D.A
                                                        </p>
                                                        <input
                                                            type="number"
                                                            className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            placeholder="Quantity"
                                                            value={product.qte}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    index,
                                                                    "qte",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            type="button"
                                                            className="hover:text-red-600 transition duration-150 ease-in-out p-2 bg-white rounded-full shadow-md hover:shadow-lg w-8 h-8 text-center"
                                                            onClick={() =>
                                                                handleRemoveProduct(
                                                                    product.id,
                                                                    product.qte
                                                                )
                                                            }
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        className=" text-white bg-sky-600 active:bg-sky-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={create_order}
                                    >
                                        Order now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="flex flex-wrap justify-center">
                {filteredProducts.map((product) => (
                    <div
                        className="w-40 h-50 rounded-md m-2 shadow-md product-card flex flex-col"
                        key={product.id}
                    >
                        {product.pictures &&
                        product.pictures[0] &&
                        product.pictures[0].content ? (
                            <img
                                src={`data:image/jpeg;base64,${product.pictures[0].content}`}
                                alt=""
                                className="w-full h-30 rounded-t-md"
                            />
                        ) : (
                            <p>Error: Image data not available</p>
                        )}
                        <p className="text-xl font-semibold text-gray-800">
                            {product.name}
                        </p>
                        <div className="flex justify-between items-center">
                            <p className="text-lg text-sky-600">
                                {product.price} D.A
                            </p>
                            <button
                                type="button"
                                className="transition duration-150 ease-in-out text-slate-100 bg-sky-600 rounded w-6 h-6 text-center"
                                onClick={() => handleAddButton(product)}
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
