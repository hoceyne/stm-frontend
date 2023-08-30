import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const url = import.meta.env.VITE_API_URL;

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    let navigate = useNavigate();

    const login = () => {
        let data = {
            email,
            password,
        };
        axios({
            // Endpoint to send files
            url: url + "/login",
            method: "POST",
            headers: {
                Accept: "Application/json",
                "Access-Control-Allow-Origin": "*",
            },

            // Attaching the form data
            data: data,
        }).then((response) => {
            localStorage.setItem("token", response.data);
            navigate("/library")
        });
    };

    useEffect(() => {}, []);

    return (
        <div className="flex flex-col bg-gradient-to-r min-h-screen from-[rgb(1,42,74)] to-sky-600 w-full h-fit justify-between">
            <div className="container mx-auto px-4 z-50 my-12">
                <div className="flex content-center  justify-center mt-24">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col break-words w-full mb-6 shadow-lg rounded-3xl bg-slate-200 border-0">
                            <div className="py-6 mt-12">
                                <div className="flex-auto px-6">
                                    <div className="flex flex-row items-center justify-center">
                                        <div className="mx-1">
                                            <Link
                                                to={"/login"}
                                                className="text-slate-900 bg-slate-300 rounded-full px-6 py-2 bold font-semibold"
                                            >
                                                Login
                                            </Link>
                                        </div>
                                        <div className="mx-1">
                                            <Link
                                                to={"/register"}
                                                className="text-slate-900 bg-white rounded-full px-6 py-2 bold hover:shadow-lg transition-all duration-300 ease-in-out font-semibold"
                                            >
                                                Sign Up
                                            </Link>
                                        </div>
                                    </div>
                                    <form>
                                        <div className="relative w-full my-2">
                                            <label
                                                className="block capitalize text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Email"
                                                onChange={(event) => {
                                                    setEmail(
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </div>

                                        <div className="relative w-full my-2">
                                            <label
                                                className="block capitalize text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-slate-600 bg-white rounded-xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Password"
                                                onChange={(event) => {
                                                    setPassword(
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                            <div className="flex flex-wrap relative">
                                                <div className="w-full">
                                                    <Link
                                                        to={"/forgot.password"}
                                                        className="text-slate-600"
                                                    >
                                                        <small>
                                                            Forgot password?
                                                        </small>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center my-4">
                                            <button
                                                className="bg-[rgb(10,58,92)] text-white active:bg-slate-600 text-sm font-bold capitalize px-6 py-3 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full align-middle flex justify-center"
                                                type="submit"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    login();
                                                }}
                                            >
                                                Sign In
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
