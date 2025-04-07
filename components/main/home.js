import { GoHome } from "react-icons/go";
import Link from "next/link";

export default function GoToHome() {
  return (
    <Link href="/" className="absolute top-4 right-4 rounded-md bg-white p-2">
      <GoHome size={22} color="black" />
    </Link>
  );
}
