"use client";

import Link from "next/link";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { sendNewMessage } from "@/actions";
import CustomServerButton from "@/components/serverButtons/custom-server-button";

export default function MessageAndUpload({ isAdmin, groupId }) {
  const [state, formAction] = useActionState(sendNewMessage, {
    message: "",
    error: [],
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      window.location.reload();
    }
  }, [state]);


  return (
    <>
      <form className="flex gap-4" action={formAction}>
        <div className="w-full flex gap-2">
          {isAdmin && (
            <div className="flex-1">
              <Input
                name="messageContent"
                className="w-full"
                placeholder="შეიყვანეთ ტექსტი..."
              />
            </div>
          )}

          <input type="text" name="groupId" defaultValue={groupId} hidden />
        </div>

        <div>
          <CustomServerButton message="გაგზავნა" pendingMessage="მესიჯი იგზავნება"  />
        </div>
      </form>

      {state && state.error && state.error.length > 0 && (
        <div className="mt-4">
          <p className="text-yellow-200">{state.error[0]}</p>
        </div>
      )}
    </>
  );
}
