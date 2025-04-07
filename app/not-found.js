import { MdError } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-950 to-blue-800 p-12 text-white flex items-center justify-center">
      <div className="flex items-center gap-4 flex-col">
        <MdError size={124} color="red" />
        <p className="text-6xl">დაფიქსირდა შეცდომა</p>

        <Link href="/" className="cursor-pointer">
          <Button className="cursor-pointer">მთავარი გვერდი</Button>
        </Link>
      </div>
    </div>
  );
}
