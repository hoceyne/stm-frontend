import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// components

export default function Form({ action, data, getProducts, hide }) {
    const token = localStorage.getItem("token");
    const url = import.meta.env.VITE_API_URL;
    const method = action === "add" ? "post" : "put";
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [qte, setQte] = useState("");
    const [purchase_date, setPurchaseDate] = useState("");
    const [uploaded_images, setUploadedImages] = useState([]);

    const navigate = useNavigate();

    const add_product = () => {
        axios({
            // Endpoint to send files
            url: url + "/products",
            method: method,
            data: {
                name,
                description,
                price,
                qte,
                purchase_date,
                pictures:uploaded_images,
            },
            headers: {
                "Content-Type": "multipart/form-data",
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

    const handleFileUpload = (event) => {
        event.preventDefault();
        const files = event.target.files;
        const updatedImages = [...uploaded_images];

        for (let i = 0; i < files.length; i++) {
            updatedImages.push(files[i]);
        }

        setUploadedImages(updatedImages);
    };

    const handleRemoveImage = (event, index) => {
        event.preventDefault();
        const updatedImages = [...uploaded_images];
        updatedImages.splice(index, 1);
        setUploadedImages(updatedImages);
    };
    useEffect(() => {
        if(action==="add"){
            setName("");
            setPrice();
            setQte();
            setDescription();
            setPurchaseDate();
        }else { 
            setName(data.name);
            setPrice(data.price);
            setQte(data.qte);
            setDescription(data.description);
            setPurchaseDate(data.purchase_date);
        }
    }, []);
    return (
        <div className=" flex flex-col max-w-[600px] h-fit break-words w-full bg-slate-100  shadow-lg rounded-lg border-0 m-auto">
            <div className="rounded-t bg-white mb-0 px-6 py-3 align-middle">
                <div className="text-center flex justify-between">
                    <h6 className="text-slate-700 text-xl font-bold capitalize">
                        {action} Post
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
                                    Name
                                </label>
                                <input
                                    type="name"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Name"
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
                                    Price
                                </label>
                                <input
                                    type="number"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Price"
                                    onChange={(event) => {
                                        setPrice(event.target.value);
                                    }}
                                    value={price}
                                />
                            </div>
                        </div>
                        <div className="w-full px-4">
                            <div className=" w-full mb-3">
                                <label
                                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Quantity"
                                    onChange={(event) => {
                                        setQte(event.target.value);
                                    }}
                                    value={qte}
                                />
                            </div>
                        </div>
                        <div className="w-full px-4">
                            <div className=" w-full mb-3">
                                <label
                                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Puchase Date
                                </label>
                                <input
                                    type="date"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Purchase Date"
                                    onChange={(event) => {
                                        setPurchaseDate(event.target.value);
                                    }}
                                    value={purchase_date}
                                />
                            </div>
                        </div>
                        <div className="w-full  px-4">
                            <div className=" w-full mb-3">
                                <label
                                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Description
                                </label>
                                <textarea
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-20"
                                    placeholder="Description"
                                    onChange={(event) => {
                                        setDescription(event.target.value);
                                    }}
                                    value={description}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" px-4 mb-3">
                        <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                            Upload Photos
                        </label>
                        <div className="flex flex-row  w-full  overflow-auto pb-4">
                            <div>
                                <label className="text-slate-500 text-md">
                                    <div className="w-[200px] h-[120px] rounded-xl border-dashed border-2 border-slate-200px text-slate-500 flex justify-center items-center p-4 hover:cursor-pointer hover:border-blue-500 transition-all duration-200 ease-in-out text-xl hover:text-blue-500 hover:border-solid">
                                        <i className="fa-solid fa-add p-2"></i>{" "}
                                        Add Image{" "}
                                    </div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {uploaded_images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative min-w-fit mx-2"
                                >
                                    <img
                                        src={URL.createObjectURL(image)}
                                        className="w-[200px] h-[120px] object-contain rounded-xl "
                                        alt={`uploaded-image-${index}`}
                                    />
                                    <button
                                        className="absolute top-0 right-0 m-2 rounded-full bg-black bg-opacity-50 text-white !w-8 h-8 hover:text-red-600 transition-all duration-200"
                                        onClick={(event) =>
                                            handleRemoveImage(event, index)
                                        }
                                    >
                                        <i className="fa-solid fa-close"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className=" text-white bg-sky-600 active:bg-sky-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => add_product()}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
