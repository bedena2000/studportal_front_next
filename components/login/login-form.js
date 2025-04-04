"use client";

import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { LoginUser } from "@/actions";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(LoginUser, {
    errors: [],
    values: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state?.success, router]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-[#cad5e2] mt-8 rounded-md p-4 text-black w-[60%] m-auto"
    >
      <form className="p-8" action={formAction}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">სახელი: </label>
            <Input
              type="text"
              id="username"
              placeholder="შეიყვანეთ სახელი..."
              style={{
                textTransform: "none",
              }}
              name="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">პაროლი: </label>
            <Input
              type="password"
              id="password"
              placeholder="შეიყვანეთ პაროლი..."
              name="password"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <Button className="cursor-pointer">შესვლა</Button>
          <Link href="/register">
            <Button className="cursor-pointer" variant="destructive">
              რეგისტრაცია
            </Button>
          </Link>
        </div>

        {/* Errors */}
        <div className="mt-12 flex flex-col gap-2">
          {state &&
            state.errors &&
            state.errors.map((error) => (
              <p key={error} className="text-bold text-amber-900">
                {error}
              </p>
            ))}
        </div>
      </form>
    </motion.div>
  );
}
