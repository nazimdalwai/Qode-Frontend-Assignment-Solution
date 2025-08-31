import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAddressCard } from "@fortawesome/free-regular-svg-icons";

export default function Sidebar() {
  return (
    <nav className="bg-gray-100  flex flex-col gap-5">
      <Link
        to={"/"}
        className="flex gap-3 text-2xl font-bold text-green-600 py-3 mx-auto"
      >
        <img
          src={
            "https://icons.veryicon.com/png/o/business/bitcoin-icon/trade-1.png"
          }
          className="w-10 h-10"
        />
        CapitalMind
      </Link>
      <div className="h-[80vh] bg-gray-200 flex flex-col space-x-4 p-4 rounded-2xl mb-10">
        <Link
          to="/"
          className="text-gray-700 hover:text-green-600 text-xl py-4 flex gap-3"
        >
          <FontAwesomeIcon icon={faHome} className="text-xl" />
          Home
        </Link>
        <Link
          to="/portfolio"
          className="text-gray-700 hover:text-green-600 text-xl py-4 flex gap-3"
        >
          <FontAwesomeIcon icon={faAddressCard} />
          Portfolio
        </Link>
      </div>
    </nav>
  );
}
