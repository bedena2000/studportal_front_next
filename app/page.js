import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HomeWelcome from "@/components/home/home-welcome";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/background-2.png')",
      }}
      className="h-screen bg-cover bg-center relative overflow-hidden p-12"
    >
      <div className="flex items-center justify-center flex-col gap-2">
        <p className="text-white text-6xl">სტუდენტური ჯგუფები</p>
        <p className="text-gray-300 text-2xl">(StudGroups)</p>
      </div>

      <div className="flex mt-12 items-center gap-10">
        <HomeWelcome />
      </div>
    </div>
  );
}
