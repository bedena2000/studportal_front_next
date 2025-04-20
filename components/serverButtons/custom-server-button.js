"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function CustomServerButton({ message, pendingMessage }) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="destructive"
      disabled={pending}
      type="submit"
      className="cursor-pointer"
    >
      {pending ? pendingMessage : message}
    </Button>
  );
}
