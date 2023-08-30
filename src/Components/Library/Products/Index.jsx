import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "./Form";

export default function Index() {
    const token = localStorage.getItem("token");

    const url = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const [method, setMethod] = useState("add");
    const [form, setForm] = useState(false);
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        axios({
            method: "get",
            url: url + "/products",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        })
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    navigate("/login");
                }
            });
    };

    const showForm = (action, data) => {
        setMethod(action);
        setProduct(data);
        setForm(true);
    };
    const hide = () => {
        setForm(false);
    };
    const destroy = (id) => {
        axios({
            // Endpoint to send files
            url: url + "/products/" + id,
            method: "delete",
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            // Handle the response from backend here
            .then((response) => {
                getProducts();
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response.status === 401) {
                    navigate("/login");
                }
            });
    };
    
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            {form ? (
                <div className="absolute bg-black bg-opacity-25 top-0 left-0 z-50 w-full h-screen flex justify-center overflow-auto 2xl:items-center">
                    <Form
                        action={method}
                        data={product}
                        hide={hide}
                        getProducts={getProducts}
                    ></Form>
                </div>
            ) : (
                ""
            )}
            
            <div className="break-words w-full shadow-lg overflow-auto p-0 m-0 border-0">
                <div className="w-full">
                    <table className=" w-full border-collapse ">
                        <thead className="sticky top-0 whitespace-nowrap">
                            <tr>
                                <th
                                    className={
                                        "   px-6 align-middle py-3 text-xs uppercase   font-semibold text-left bg-slate-50 text-slate-500 "
                                    }
                                >
                                    
                                    Name
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                                    }
                                >
                                    
                                    Price
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                                    }
                                >
                                   
                                    Qte
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                                    }
                                >
                                    
                                    purchase date
                                </th>

                                <th
                                    className={
                                        "   text-xs uppercase  font-semibold flex justify-around   transition-all duration-150 hover:bg-sky-900 text-white bg-blue-500"
                                    }
                                >
                                    <Link
                                        className="w-full ease-linear px-6 py-3 "
                                        role={"button"}
                                        onClick={() => {
                                            showForm("add");
                                        }}
                                    >
                                        Add
                                        <i class="fa-solid fa-plus ml-4"></i>
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, id) => {
                                return (
                                    <tr
                                        key={id}
                                        className="bg-white hover:bg-slate-100"
                                    >
                                        <th
                                            className={
                                                "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                                            }
                                        >
                                            <span className={"font-bold "}>
                                                {product.name}
                                            </span>
                                        </th>
                                        <td
                                            className={
                                                "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                                            }
                                        >
                                            {product.price}
                                        </td>
                                        <td
                                            className={
                                                "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                                            }
                                        >
                                            {product.qte}
                                        </td>
                                        <td
                                            className={
                                                "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                                            }
                                        >
                                            {product.purchase_date}
                                        </td>

                                        <td
                                            className={
                                                "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left items-center flex justify-evenly gap-2"
                                            }
                                        >
                                            <Link
                                                role={"button"}
                                                onClick={() => {
                                                    showForm("edit", product);
                                                }}
                                                className="hover:text-yellow-400 transition duration-150 ease-in-out p-2 bg-white rounded-full shadow-md hover:shadow-lg w-8 h-8 text-center"
                                            >
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            <Link
                                                role={"button"}
                                                onClick={() =>
                                                    destroy(product.id)
                                                }
                                                className="hover:text-red-600 transition duration-150 ease-in-out p-2 bg-white rounded-full shadow-md hover:shadow-lg w-8 h-8 text-center"
                                            >
                                                <i class="fa-solid fa-trash"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
