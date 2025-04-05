import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

import RegisterForm from "@/components/register/register-form";
import LoginForm from "@/components/login/login-form";
import GoBack from "@/components/navigation/arrows/go-back";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-950 to-blue-800 p-12 text-white">
      <div>
        <GoBack />
      </div>

      <div className="text-center">
        <p className="text-4xl font-bold">ავტორიზაცია</p>
      </div>

      <LoginForm />


    </div>
  );
}
