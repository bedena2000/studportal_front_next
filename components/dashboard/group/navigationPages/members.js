"use client";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import { api } from "@/lib/fetching";
import { GetCookie } from "@/actions/helpers";
import { BounceLoader } from "react-spinners";
import { SyncLoader } from "react-spinners";

export default function NavigationMembers({ goBackFunc, groupId }) {
  const [members, setMembers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllMembers = async () => {
      setIsLoading(true);
      const token = await GetCookie("token");

      try {
        const members = await api.get(
          `groups/group_members?groupId=${Number(groupId)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMembers(members.data.members);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllMembers();
  }, []);

  return (
    <div>
      <div
        className="inline-block p-2 bg-white/70 rounded-md cursor-pointer"
        onClick={goBackFunc}
      >
        <FaLongArrowAltLeft size={18} color="black" />
      </div>

      <div className="mt-4">
        <p>ჯგუფის წევრები:</p>
      </div>

      {isError && (
        <div className="mt-4">
          <p>დაფიქსირდა შეცდომა</p>
        </div>
      )}

      <div className="mt-8">
        {members &&
          members.length > 0 &&
          members.map((member) => (
            <div className="bg-indigo-900 p-2 rounded-md" key={member.id}>
              <p className="text-white font-bold">{member.username}</p>
            </div>
          ))}
      </div>

      {isLoading && (
        <div className="mt-4">
          <SyncLoader color="white" />
        </div>
      )}
    </div>
  );
}
