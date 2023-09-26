import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import CartForm from "./CartForm";

export default function Product({
  email,
  name,
  phone_num,
  city,
  wilaya,
  cartProducts,
  
  handleInputChange,
  handleRemoveProduct,
  create_order,
  searchQuery,
  
}) {
  const [form, setForm] = useState(false);
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };
  const currentImage =
    product && product.pictures && product.pictures[currentImageIndex];
  const getProduct = async () => {
    axios({
      method: "get",
      url: url + "/products/" + id,
      headers: {
        Authorization: "Bearer " + token,
        Accept: "Application/json",
      },
    }).then((response) => {
      setProduct(response.data);
    });
  };
  const showForm = () => {
    setForm(true);
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const hide = () => {
    setForm(false);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Navbar
        handleSearch={handleSearch}
        showForm={showForm}
      />
      <CartForm
        form={form}
        hide={hide}
        email={email}
        name={name}
        phone_num={phone_num}
        city={city}
        wilaya={wilaya}
        cartProducts={cartProducts}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
        handleRemoveProduct={handleRemoveProduct}
        create_order={create_order}
      />
      <div>
        {product ? (
          <div>
            <h1 className="text-5xl text-sky-700 px-5   block   font-bold ">
              {product.name}
            </h1>

            <div className="image-slider mt-4 relative bg-gray-100">
              <button
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 hover:text-red-600 transition duration-150 ease-in-out ml-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg ${
                  currentImageIndex === 0 ? "hidden" : ""
                }`}
                onClick={handlePreviousImage}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              {currentImage ? (
                <img
                  className="max-w-full mx-auto h-96 image-large"
                  src={`data:image/jpeg;base64,${product.pictures[currentImageIndex].content}`}
                  alt=""
                />
              ) : null}
              <button
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 hover:text-red-600 transition duration-150 ease-in-out mr-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg ${
                  currentImageIndex ===
                  (product.pictures ? product.pictures.length - 1 : 0)
                    ? "hidden"
                    : ""
                }`}
                onClick={handleNextImage}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="block uppercase text-sky-600 text-xl font-bold mb-2">
                Price :{" "}
                <span className="text-lg text-gray-700 mt-2">
                  {product.price} D.A
                </span>{" "}
              </p>

              <h2 className="block uppercase text-sky-600 text-xl font-bold mb-2">
                Description :
              </h2>
              <p className="text-lg text-gray-700 mt-2">
                {product.description}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
