import React, { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex relative">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:block w-[16rem] h-screen sticky top-0 bg-gray-100 p-4">
        <Sidebar />
      </aside>

      {/* Burger button (mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-2xl text-gray-700"
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={open ? faTimes : faBars} />
      </button>

      {/* Sidebar (mobile overlay) */}
      <aside
        className={`fixed top-0 left-0 h-full w-[70%] bg-gray-100 p-4 z-40 transform transition-transform duration-300 md:hidden 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
