import React from "react";
import { cartC , cartP ,  clientName ,mail , phonenum , City, Wilaya} from './atoms';
import { useAtom } from 'jotai';
export default function CartForm({
  form,
  hide,

  create_order,
}) {
  const [email, setEmail] = useAtom(mail);
  const [name, setName] = useAtom(clientName);
  const [city, setCity] = useAtom(City);
  const [wilaya, setWilaya] = useAtom(Wilaya);
  const [phone_num, setPhone] = useAtom(phonenum);
  const [cartCount, setCartCount] = useAtom(cartC);
  const [cartProducts, setCartProducts] = useAtom(cartP);
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
  if (!form) return null;

  return (
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
                      setEmail(event.target.value);
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
                      setPhone(event.target.value);
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
                      setWilaya(event.target.value);
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
                  {cartProducts.map((product, index) => (
                    <div key={index} className="flex gap-4 my-3">
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
                          handleInputChange(index, "qte", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="hover:text-red-600 transition duration-150 ease-in-out p-2 bg-white rounded-full shadow-md hover:shadow-lg w-8 h-8 text-center"
                        onClick={() =>
                          handleRemoveProduct(product.id, product.qte)
                        }
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  ))}
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
  );
}
