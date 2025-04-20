"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useActionState } from "react";
import { SendImage } from "@/actions";
import UploadButton from "../../buttons/upload-button";

export default function FilesUpload({ groupId }) {
  const [state, formAction] = useActionState(SendImage, {
    error: [],
  });
  const uploadElement = useRef();

  const handleUpload = () => {
    uploadElement.current.click();
  };

  useEffect(() => {
    if (state.success) {
      window.location.reload();
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="mt-4 flex items-center justify-between"
    >
      <div>
        <div
          onClick={handleUpload}
          className="flex items-center gap-2 border w-fit p-2 cursor-pointer transition-all ease-in duration-100 bg-transparent hover:bg-white/10 rounded-lg"
        >
          <FaCloudUploadAlt
            size={18}
            color="white"
            className="cursor-pointer"
          />
          <p className="text-sm">ფაილის ატვირთვა</p>
        </div>

        <input ref={uploadElement} type="file" name="uploadedFile" hidden />

        <input type="hidden" name="groupId" defaultValue={groupId} />
      </div>

      <div>
        <UploadButton />
      </div>

      {state &&
        state.error &&
        state.error.map((error) => (
          <div className="mt-4" key={error}>
            <p>{error}</p>
          </div>
        ))}
    </form>
  );
}
