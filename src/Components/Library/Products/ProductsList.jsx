import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CartForm from "./CartForm";
import { useAtom } from 'jotai';
import { cartC , cartP} from './atoms';



export default function ProductsList() {
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [form, setForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useAtom(cartC);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartProducts, setCartProducts] = useAtom(cartP);
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
      <Navbar
        handleSearch={handleSearch}
        showForm={showForm}
      />
      <CartForm
        form={form}
        hide={hide}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
        handleRemoveProduct={handleRemoveProduct}
        create_order={create_order}
      />

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
            <Link
              to={`/products/${product.id}`}
              className="text-xl font-semibold text-gray-800 hover:text-sky-600"
            >
              {product.name}
            </Link>
            <div className="flex justify-between items-center">
              <p className="text-lg text-sky-600">{product.price} D.A</p>
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
