import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function OrderProducts({ action, data, getProducts, hide }) {
    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(data.products);
        setOrder(data);
    }, []);
    return ( 
        <div className=" flex flex-col max-w-[600px] h-fit break-words w-full bg-slate-100  shadow-lg rounded-lg border-0 m-auto">
            <div className="rounded-t bg-white mb-0 px-6 py-3 align-middle">
                <div className="text-center flex justify-between">
                    <h6 className="text-slate-700 text-xl font-bold capitalize">
                        {}
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
            <div className="w-full">
                    <table className=" w-full border-collapse ">
                        <thead className="sticky top-0 whitespace-nowrap">
                            <tr>
                                <th
                                    className={
                                        "   px-6 align-middle py-3 text-xs uppercase   font-semibold text-left bg-slate-50 text-slate-500 "
                                    }
                                >
                                    
                                    Product name
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle  py-3 text-xs uppercase  font-semibold text-left bg-slate-50 text-slate-500  "
                                    }
                                >
                                    
                                    Unit price
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
                                    
                                    Total
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
                                            {product.pivot.price}
                                        </td>
                                        <td
                                            className={
                                                "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                                            }
                                        >
                                            {product.pivot.qte}
                                        </td>
                                        <td
                                            className={
                                                "text-xs whitespace-nowrap  border border-slate-200 p-2 text-left align-middle"
                                            }
                                        >
                                            {product.pivot.qte * product.pivot.price} 
                                        </td>

                                        
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    
                </div>
        </div>
     );
}

export default OrderProducts;