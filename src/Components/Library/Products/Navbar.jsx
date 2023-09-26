import React from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import  { useEffect, useState } from "react";
import { cartC } from './atoms';
export default function Navbar({  handleSearch, showForm }) {
  const [form, setForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useAtom(cartC);
  return (
    <div>
      <div className="navbar bg-sky-700 p-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div className="relative flex items-center max-w-lg flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 flex-1"
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <i className="fa-solid fa-search text-gray-400"></i>
            </div>
          </div>
          <button
            type="button"
            className="transition duration-150 ease-in-out text-gray-300 w-8 h-12 text-center"
            onClick={showForm}
          >
            <i className="fa-solid fa-cart-shopping">
              {cartCount > 0 && (
                <div className="bg-red-500 text-white text-xs rounded-full w-auto h-auto flex items-center justify-center absolute -top-0 -right-0">
                  {cartCount}
                </div>
              )}
            </i>
          </button>
        </div>
      </div>
    
    </div>
  );
}
