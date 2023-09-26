import axios from "axios";
//import { useAtom } from "jotai";
//import { urlAtom } from "index";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import moment from "moment";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";

export default function Receipt({ data, hide }) {
  const token = window.localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [order, setOrder] = useState("");

  //const [amount, setAmount] = useState(500);

  var ReceiptRef = useRef();

  // const create_inscription_fee = () => {
  //   axios({
  //     // Endpoint to send files
  //     url: url + "/receipts",
  //     method: "post",
  //     data: {
  //       //date: moment().format("YYYY-MM-DD"),
  //       order_id: order.id,
  //     },
  //     headers: {
  //       Accept: "Application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     // Handle the response from backend here
  //     .then((response) => {})

  //     // Catch errors if any
  //     .catch((error) => {
  //       if (error.response.status === 401) {
  //         Swal.fire({
  //           title: "Please sign in",
  //           text: "You are not signed in",
  //           icon: "error",
  //         }).then(() => {
  //           window.localStorage.clear();
  //           navigate("/login");
  //         });
  //       } else {
  //         Swal.fire({
  //           title: error.response?.statusText,
  //           text: error.response.data.message,
  //           icon: "error",
  //         });
  //       }
  //     });
  // };

  const create_receipt = () => {
    axios({
      // Endpoint to send files
      url: url + "/receipts",
      method: "post",
      data: {
        order_id: data.id,
      },
      headers: {
        Accept: "Application/json",
        Authorization: "Bearer " + token,
      },
    })
      // Handle the response from backend here
      .then((response) => {})

      // Catch errors if any
      .catch((error) => {
        if (error.response.status === 401) {
          Swal.fire({
            title: "Please sign in",
            text: "You are not signed in",
            icon: "error",
          }).then(() => {
            window.localStorage.clear();
            navigate("/login");
          });
        } else {
          Swal.fire({
            title: error.response?.statusText,
            text: error.response.data.message,
            icon: "error",
          });
        }
      });
  };

  useEffect(() => {
    setOrder(data);
    console.log(data.id);
  }, []);
  return (
    <div className="flex-auto py-4 h-fit m-auto">
      <div className="block w-full overflow-x-auto">
        <div className="flex flex-row items-center justify-between px-10">
          <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
            Receipt
          </h6>

          <Link
            className=" text-slate-400 ease-linear transition-all duration-150 hover:text-slate-700 text-sm mt-3 mb-6 font-bold uppercase"
            role={"button"}
            onClick={() => {
              hideReceipt();
            }}
          >
            <>
              <i className="fa-solid fa-close"></i> Cancel
            </>
          </Link>
        </div>
        {/* <div className="flex flex-wrap">
          <div className="w-full px-10">
            <div className="w-full mb-3">
              <div
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Amount
              </div>
              <div className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                {order.total}
              </div>
            </div>
          </div>
        </div> */}
        <div className=" px-10">
          <div className="flex overflow-auto justify-center items-center">
            <div
              className="border border-black p-4 flex flex-col bg-white w-96 "
              ref={(el) => (ReceiptRef = el)}
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col  items-center">
                  <h1 className="text-xl font-bold ">Receipt</h1>
                  <span>{moment().format("MMMM Do YYYY, h:mm")}</span>
                </div>
                <img className="w-36 h-36" src="src/assets/logo.png"></img>
              </div>

              <div className="flex flex-row items-center">
                <label className="mx-4">Client: </label>
                <span className="mx-4">{data.client.user.name}</span>
              </div>

               <div className="flex flex-row items-center">
               <div className="w-full">
  <div className="flex flex-col">
    <div className="flex justify-between border-b pb-2 mb-2">
      <div className="text-xs uppercase font-semibold text-slate-500">
        Product name
      </div>
      <div className="text-xs uppercase font-semibold text-slate-500">
        Unit price
      </div>
      <div className="text-xs uppercase font-semibold text-slate-500">
        Qte
      </div>
      <div className="text-xs uppercase font-semibold text-slate-500">
        Total
      </div>
    </div>
    
    {data.products.map((product, id) => (
      <div key={id} className="flex justify-between items-center mb-2">
        <div className="text-xs font-bold">{product.name}</div>
        <div className="text-xs">{product.pivot.price}</div>
        <div className="text-xs">{product.pivot.qte}</div>
        <div className="text-xs">
          {product.pivot.qte * product.pivot.price}
        </div>
      </div>
    ))}
  </div>
</div>

                            </div>
                            <div className="flex flex-row items-center">
                                <lable className="mx-4">Total:</lable>
                                <span className="mx-4">{data.total}.00 DA</span>
          </div>
              <div className="flex flex-row justify-center items-center">
                <Barcode
                  fontSize={18}
                  //text={process.env.REACT_APP_URL}
                  height={30}
                  width={3}
                  value={/*process.env.REACT_APP_URL*/0}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center my-4 flex-row gap-3">
            <ReactToPrint
              trigger={() => {
                return (
                  <button
                    className=" text-white bg-sky-600 active:bg-sky-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Pay
                  </button>
                );
              }}
              onAfterPrint={() => {
                create_receipt();
                //create_inscription_fee();
                toast.success("Inscription fee payed successful", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }}
              content={() => ReceiptRef}
            />
            {/* <button
              className=" text-white bg-sky-600 active:bg-sky-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                create_inscription_fee();
                next();
                toast.success("Inscription fee created successful", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }}
            >
              Next
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
