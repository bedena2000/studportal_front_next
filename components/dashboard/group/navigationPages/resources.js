"use client";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import { api } from "@/lib/fetching";
import { GetCookie } from "@/actions/helpers";
import { SyncLoader } from "react-spinners";

export default function NavigationResources({ goBackFunc, groupId }) {
  const [resourceList, setResourceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getAllResources = async () => {
      setIsLoading(true);
      const token = await GetCookie("token");
      try {
        const result = await api.get(`/files/all?groupId=${Number(groupId)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResourceList(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    };

    getAllResources();
  }, []);

  console.log(resourceList);

  return (
    <div>
      <div
        className="inline-block p-2 bg-white/70 rounded-md cursor-pointer"
        onClick={goBackFunc}
      >
        <FaLongArrowAltLeft size={18} color="black" />
      </div>

      <div className="mt-4">
        <p>მასალები:</p>
      </div>

      {isLoading && (
        <div className="mt-6">
          <SyncLoader color="white" />
        </div>
      )}

      {isError && (
        <div className="mt-6">
          <p>დაფიქსირდა შეცდომა</p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2">
        {resourceList &&
          resourceList.length > 0 &&
          resourceList.map((resource) => (
            <div key={resource.id} className="w-full">
              <a
                href={`http://localhost:5000${resource.fileUrl}`}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="truncate bg-purple-800 p-2 rounded-md border text-white">
                  📎 {resource.fileName}
                </p>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
