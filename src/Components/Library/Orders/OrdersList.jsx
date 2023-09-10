import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OrderProducts from "./OrderProducts";

export default function OrdersList() {
    const token = localStorage.getItem("token");

    const url = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const [method, setMethod] = useState("add");
    const [form, setForm] = useState(false);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);

    const getOrders = async () => {
        axios({
            method: "get",
            url: url + "/orders",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        })
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    navigate("/login");
                }
            });
    };

    const showForm = (action, data) => {
        setMethod(action);
        setOrder(data);
        setForm(true);
    };
    const hide = () => {
        setForm(false);
    };
    const destroy = (id) => {
        axios({
            // Endpoint to send files
            url: url + "/orders/" + id,
            method: "delete",
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            // Handle the response from backend here
            .then((response) => {
                getOrders();
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response.status === 401) {
                    navigate("/login");
                }
            });
    };
    
    useEffect(() => {
        getOrders();
    }, []);

    return (
        <>
            {form ? (
                <div className="absolute bg-black bg-opacity-25 top-0 left-0 z-50 w-full h-screen flex justify-center overflow-auto 2xl:items-center">
                    <OrderProducts
                        action={method}
                        data={order}
                        hide={hide}
                        getOrders={getOrders}
                    ></OrderProducts>
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
                                    
                                    Client name
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                                    }
                                >
                                    
                                    Phone number
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                                    }
                                >
                                   
                                    Total
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                                    }
                                >
                                   
                                    Status
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                                    }
                                >
                                    
                                    Date
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
                                        <i className="fa-solid fa-plus ml-4"></i>
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, id) => {
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
                                                {order.client.user.name}
                                            </span>
                                        </th>
                                        <td
                                            className={
                                                "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                                            }
                                        >
                                            {order.client.user.phone_num}
                                        </td>
                                        <td
                                            className={
                                                "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                                            }
                                        >
                                            {order.total}
                                        </td>
                                        <td
                                            className={
                                                "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                                            }
                                        >
                                            {order.status}
                                        </td>
                                        <td
                                            className={
                                                "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                                            }
                                        >
                                            {order.created_at}
                                        </td>

                                        <td
                                            className={
                                                "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left items-center flex justify-evenly gap-2"
                                            }
                                        >
                                            <Link
                                                role={"button"}
                                                onClick={() => {
                                                    showForm("edit", order);
                                                }}
                                                className="hover:text-yellow-400 transition duration-150 ease-in-out p-2 bg-white rounded-full shadow-md hover:shadow-lg w-8 h-8 text-center"
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            <Link
                                                role={"button"}
                                                onClick={() =>
                                                    destroy(order.id)
                                                }
                                                className="hover:text-red-600 transition duration-150 ease-in-out p-2 bg-white rounded-full shadow-md hover:shadow-lg w-8 h-8 text-center"
                                            >
                                                <i className="fa-solid fa-trash"></i>
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
