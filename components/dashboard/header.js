'use client';

import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { logout } from "@/actions";
import Username from "./username/username";
import { motion } from "motion/react";

export default function DashboardHeader() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <header className="text-white border-2 p-4 rounded-3xl flex items-center justify-between">
        <div>
          <Username />
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/settings">
            <IoSettingsOutline size={26} className="cursor-pointer" />
          </Link>
          <form action={logout} className="flex">
            <button type="submit">
              <IoIosLogOut size={28} className="cursor-pointer" />
            </button>
          </form>
        </div>
      </header>
    </motion.div>
  );
}
