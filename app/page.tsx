"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // استخدام هذا الهوك الجديد مع App Router

import "./src/public/assets/css/style.css";
import logo from "./src/public/images/logo.png";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home"); // التوجيه إلى صفحة "home" بعد 5 ثواني
    }, 1000);

    // تنظيف التايمر لتجنب أي مشاكل
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bg-gray-800 w-full h-screen text-white">
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src={logo}
          alt="Logo"
          width={200} // عرض الصورة
          height={200} // ارتفاع الصورة
          priority // لتحميل الصورة بشكل فوري
          className="bg-white rounded-lg p-4"
        />
        <h2 className="text-white text-center text-3xl p-4">دفتر دين</h2>
      </div>
    </div>
  );
}
