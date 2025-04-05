import RegisterForm from "@/components/register/register-form";
import GoBack from "@/components/navigation/arrows/go-back";

export default function RegistrationPage() {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-950 to-blue-800 p-12 text-white">
      <div>
        <GoBack />
      </div>

      <div className="text-center">
        <p className="text-4xl font-bold">რეგისტრაცია</p>
      </div>

      <RegisterForm />
    </div>
  );
}
