"use client";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { SyncLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { api } from "@/lib/fetching";
import { GetCookie } from "@/actions/helpers";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useActionState } from "react";

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
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    getAllNotifications();
  }, []);

  const handleAccept = async (event) => {
    const userId = Number(
      event.currentTarget.parentElement.parentElement.dataset.userid
    );
    const token = await GetCookie("token");
    console.log(token);
    console.log(groupId);
    try {
      await api.post(
        `/requests/accept?userId=${userId}&groupId=${groupId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const handleDecline = async (event) => {
    const userId = Number(
      event.currentTarget.parentElement.parentElement.dataset.userid
    );
    const token = await GetCookie("token");
    console.log(token);
    console.log(groupId);
    try {
      await api.post(
        `/requests/decline?userId=${userId}&groupId=${groupId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
      return;
    }
  };

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
                  data-userid={notificationItem.User.id}
                  key={notificationItem.id}
                  className="flex items-center justify-between bg-sky-800 p-2 rounded-md"
                >
                  <div>
                    <p>{notificationItem.User.username}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="bg-sky-950 rounded-md p-2 cursor-pointer"
                      onClick={handleAccept}
                    >
                      <FaCheck size={16} className="cursor-pointer" />
                    </div>

                    <div
                      className="bg-sky-950 rounded-md p-2 cursor-pointer"
                      onClick={handleDecline}
                    >
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
