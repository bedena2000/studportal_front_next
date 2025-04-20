"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function UploadButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="cursor-pointer">
      {pending ? "ფაილი იტვირთება..." : "ფაილის ატვირთვა"}
    </Button>
  );
}
