"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { motion } from "motion/react";

export default function Navigation() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -100,
      }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="text-white border-2 rounded-3xl w-[300px] h-[600px]">
        <div className="p-4 border-b-2 border-b-blue-200">
          <Link href="/dashboard/create">
            <Button
              variant="destructive"
              className="cursor-pointer w-full flex items-center gap-2"
            >
              <FaPlus size={26} color="white" />
              <p>ჯგუფის შექმნა</p>
            </Button>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 border-2 p-2 border-r-0 border-l-0 bg-gray-600 hover:bg-white/10"
            >
              <GoHome size={22} color="white" />
              <p className="font-normal">მთავარი</p>
            </Link>
          </div>

          <div>
            <Link
              href="/dashboard/user-groups"
              className="flex items-center gap-2 border-2 p-2 border-r-0 border-l-0 bg-gray-600 hover:bg-white/10"
            >
              <GoHome size={22} color="white" />
              <p className="font-normal">ჩემი ჯგუფები</p>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
