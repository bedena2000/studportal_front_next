"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function JoinGroup() {
  const { pending } = useFormStatus();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (pending) {
      setStatus("sending");
    } else if (status === "sending") {
      setStatus("sent");
      const timer = setTimeout(() => setStatus("idle"), 2000);
      return () => clearTimeout(timer);
    }
  }, [pending]);

  const buttonText = {
    idle: "გაწევრიანება",
    sending: "იგზავნება",
    sent: "გაგზავნილია",
  }[status];

  return (
    <Button disabled={pending} type="submit" className="cursor-pointer">
      {buttonText}
    </Button>
  );
}
