"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createGroup } from "@/actions";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CreateButton from "../buttons/create-button";

export default function CreateGroup() {
  const router = useRouter();
  const [state, formAction] = useActionState(createGroup, {
    errors: [],
  });

  useEffect(() => {
    if (state.message === "success") {
      router.push("/dashboard");
      router.refresh();
    }
  }, [state]);

  return (
    <form className="h-full overflow-auto" action={formAction}>
      <div className="mt-4">
        <div className="flex flex-col gap-4">
          <label id="groupName">ჯგუფის სახელი</label>
          <Input
            name="group_name"
            type="text"
            placeholder="სახელი..."
            className="border-2"
          />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <label id="groupName">ჯგუფის აღწერა</label>
          <Textarea
            placeholder="აღწერა..."
            name="group_description"
            className="resize-none border-2 min-h-[260px]"
          />
        </div>

        <div className="mt-4">
          {/* <Button className="cursor-pointer">შექმნა</Button> */}
          <CreateButton />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {state &&
            state.errors &&
            state.errors.map((error) => (
              <p key={error} className="text-amber-200 p-2 text-bold">
                {error}
              </p>
            ))}
        </div>
      </div>
    </form>
  );
}
