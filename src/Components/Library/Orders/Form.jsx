import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// components

export default function Form({ action, data, Order, hide }) {
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL;
  const method = "post";
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    { id: "", price: "", qte: 1 },
  ]);
  const [availableProducts, setAvailableProducts] = useState([]);

  const handleInputChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };
  const handleAddProduct = () => {
    setProducts([...products, { id: "", price: "", qte: 1 }]);
  };
  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const add_order = () => {
    axios({
      
      url: url + "/orders",
      method: 'post',
      data: {
        products: products,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      
      .then((response) => {
        console.log("Order created successfully");
      })

      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    
    axios
      .get(url + "/products") // Adjust the API endpoint accordingly
      .then((response) => {
        setAvailableProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product names:", error);
      });
  }, []);
  return (
    <div className=" flex flex-col max-w-[600px] h-fit break-words w-full bg-slate-100  shadow-lg rounded-lg border-0 m-auto">
      <div className="rounded-t bg-white mb-0 px-6 py-3 align-middle">
        <div className="text-center flex justify-between">
          <h6 className="text-slate-700 text-xl font-bold capitalize">
            {action} Order
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
                  Products
                </label>
                {products.map((product, index) => (
                  <div key={index} className="flex gap-4 my-3">
                    <select
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={product.id}
                      onChange={(e) =>
                        handleInputChange(index, "id", e.target.value)
                      }
                    >
                      <option value="">Select a product</option>
                      {availableProducts.map((product,index) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Price"
                      value={product.price}
                      onChange={(e) =>
                        handleInputChange(index, "price", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Quantity"
                      value={product.qte}
                      onChange={(e) =>
                        handleInputChange(index, "qte", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="hover:text-red-600 transition duration-150 ease-in-out p-2 bg-white rounded-full shadow-md hover:shadow-lg w-8 h-8 text-center"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <i className="fa-solid fa-trash"></i> 
                    </button>
                  </div>
                ))}
                <button type="button" onClick={handleAddProduct}>
                  Add Product
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className=" text-white bg-sky-600 active:bg-sky-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => add_order()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
