"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import logo from "../src/public/images/logo.png";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // حالة إظهار كلمة المرور

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // هنا يمكنك استبدال هذا التحقق بمناداة API حقيقي لتسجيل الدخول
    if (username === "admin" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/home");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="bg-gray-800 w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-5 w-2/5 text-center rounded-lg relative"
      >
        <div>
          <Image
            src={logo}
            alt="Logo"
            width={200} // عرض الصورة
            height={200} // ارتفاع الصورة
            priority // لتحميل الصورة بشكل فوري
            className="bg-white rounded-lg p-4 m-auto"
          />
          <h2 className="text-gray-800 text-xl">تسجيل الدخول</h2>
        </div>
        <div className="py-2 my-2">
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow-lg w-full border border-gray-800 p-2 rounded-lg"
          />
        </div>
        <div className="py-2 my-2 relative">
          <input
            type={showPassword ? "text" : "password"} // إظهار أو إخفاء كلمة المرور بناءً على حالة showPassword
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-lg w-full border border-gray-800 p-2 rounded-lg"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // عكس الحالة عند الضغط
            className="absolute left-2 top-4 text-gray-600"
          >
            {showPassword ? "إخفاء" : "إظهار"}{" "}
            {/* تغيير النص بناءً على الحالة */}
          </button>
        </div>
        <div className="py-2 my-2">
          <button
            type="submit"
            className="shadow-lg w-full bg-gray-800 border border-gray-800 p-2 rounded-lg text-white hover:bg-gray-700"
          >
            تسجيل الدخول
          </button>
        </div>
      </form>
    </div>
  );
}
