"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const router = useRouter();
  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-5">
        <div className="flex items-center space-x-3">
          <Link href="/home">
            <h1 className="text-xl font-bold tracking-wide">دفتر دين</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-indigo-400 transition-all py-2">
            الصفحة الرئيسية
          </Link>
          <Link
            href="/about"
            className="hover:text-indigo-400 transition-all py-2"
          ></Link>
          <Link
            href="/services"
            className="hover:text-indigo-400 transition-all py-2"
          >
            الحساب
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              router.push("/login");
            }}
            className="bg-red-500 p-2 rounded-lg hover:bg-red-400"
          >
            تسجيل خروج
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white py-3 space-y-2">
          <Link
            href="/"
            className="block px-4 py-2 hover:bg-gray-700 transition-all"
          >
            الصفحة الرئيسية
          </Link>
          <Link
            href="/"
            className="block px-4 py-2 hover:bg-gray-700 transition-all"
          >
            الحساب
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              router.push("/login");
            }}
            className="block px-4 py-2 hover:bg-gray-700 transition-all w-full text-start bg-red-500"
          >
            تسجيل خروج
          </button>
        </div>
      )}
    </header>
  );
}
