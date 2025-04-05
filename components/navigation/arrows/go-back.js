"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function GoBack() {
  const router = useRouter();

  const handleNavigation = () => {
    router.back();
  };

  return (
    <div
      onClick={handleNavigation}
      className="bg-white inline-block p-2 rounded-md cursor-pointer"
    >
      <FaArrowLeft size={24} color="black" />
    </div>
  );
}
