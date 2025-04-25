"use client";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { SyncLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { api } from "@/lib/fetching";
import { GetCookie } from "@/actions/helpers";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

export default function NavigationNotification({ goBackFunc, groupId }) {
  const [notificationList, setNotificationList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllNotifications = async () => {
      setIsLoading(true);
      const token = await GetCookie("token");

      try {
        const result = await api.get(`/requests/all?groupId=${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (notificationList.length === 0) {
          setNotificationList(result.data.requests);
        }

        setIsLoading(false);
        console.log(result.data.requests);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    getAllNotifications();
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
        <p>შეტყობინებები:</p>

        <div className="mt-4 flex flex-col gap-4">
          {notificationList && notificationList.length > 0 && (
            <p>ჯგუფში დამატება:</p>
          )}
          {notificationList &&
            notificationList.length > 0 &&
            notificationList.map((notificationItem) => {
              return (
                <div
                  key={notificationItem.id}
                  className="flex items-center justify-between bg-sky-800 p-2 rounded-md"
                >
                  <div>
                    <p>{notificationItem.User.username}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-sky-950 rounded-md p-2 cursor-pointer">
                      <FaCheck size={16} className="cursor-pointer" />
                    </div>

                    <div className="bg-sky-950 rounded-md p-2 cursor-pointer">
                      <IoCloseSharp size={16} className="cursor-pointer" />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {isLoading && (
        <div className="mt-4">
          <SyncLoader color="white" />
        </div>
      )}

      {isError && (
        <div className="mt-4">
          <p>დაფიქსირდა შეცდომა</p>
        </div>
      )}
    </div>
  );
}
