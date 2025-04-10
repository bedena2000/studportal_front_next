"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function CreateButton() {
  const { pending } = useFormStatus();

  console.log(pending);

  return (
    <Button disabled={pending} type="submit" className="cursor-pointer">
      {pending ? "ჯგუფი იქმნება..." : "შექმნა"}
    </Button>
  );
}
