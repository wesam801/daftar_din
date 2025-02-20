"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../src/resources/components/models/Header";
import SearchBar from "../src/resources/components/models/SearchBar";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // التحقق من وجود المستخدم في localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      <Header />
      <SearchBar />
    </div>
  );
}
