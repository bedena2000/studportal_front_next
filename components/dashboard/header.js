import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { logout } from "@/actions";
import Username from "./username/username";

export default function DashboardHeader() {
  return (
    <header className="text-white border p-4 rounded-3xl flex items-center justify-between">
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
  );
}
