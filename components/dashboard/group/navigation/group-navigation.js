"use client";
import { IoMdNotifications } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { PiBooks } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import NavigationCalendar from "../navigationPages/calendar";
import NavigationNotification from "../navigationPages/notifications";
import NavigationMembers from "../navigationPages/members";
import NavigationResources from "../navigationPages/resources";

export default function GroupNavigation({ isAdmin, groupId }) {
  const [isNavigationActive, setIsNavigationActive] = useState(false);
  const [currentActiveNavigationPage, setCurrentActiveNavigationPage] =
    useState("");

  const goBackFunc = () => {
    setIsNavigationActive(false);
    setCurrentActiveNavigationPage("");
  };

  const navigationContent = {
    calendar: <NavigationCalendar goBackFunc={goBackFunc} groupId={groupId} />,
    resources: (
      <NavigationResources goBackFunc={goBackFunc} groupId={groupId} />
    ),
    members: <NavigationMembers goBackFunc={goBackFunc} groupId={groupId} />,
    notifications: (
      <NavigationNotification goBackFunc={goBackFunc} groupId={groupId} />
    ),
  };

  const handleNavigation = (event) => {
    setIsNavigationActive((prev) => !prev);
    const clickedElement = event.currentTarget;
    const metadata = clickedElement.dataset.pagename;
    setCurrentActiveNavigationPage(metadata);
  };

  return (
    <>
      {!isNavigationActive && (
        <div className="h-full rounded-md p-4 bg-[#1e1a4d] flex flex-col gap-2">
          {isAdmin && (
            <div
              data-pagename="notifications"
              className="flex gap-2 items-center cursor-pointer rounded-md hover:bg-[#053345] bg-[#052f4a] p-2"
              onClick={handleNavigation}
            >
              <IoMdNotifications size={32} color="white" />
              <p>შეტყობინებები</p>
            </div>
          )}
          <div
            data-pagename="members"
            className="flex gap-2 items-center cursor-pointer rounded-md hover:bg-[#053345] bg-[#052f4a] p-2"
            onClick={handleNavigation}
          >
            <BsPeopleFill size={32} color="white" />
            <p>ჯგუფის წევრები</p>
          </div>

          <div
            data-pagename="resources"
            className="flex gap-2 items-center cursor-pointer rounded-md hover:bg-[#053345] bg-[#052f4a] p-2"
            onClick={handleNavigation}
          >
            <PiBooks size={32} color="white" />
            <p>ჯგუფის მასალები</p>
          </div>

          <div
            data-pagename="calendar"
            className="flex gap-2 items-center cursor-pointer rounded-md hover:bg-[#053345] bg-[#052f4a] p-2"
            onClick={handleNavigation}
          >
            <FaCalendarAlt size={32} color="white" />
            <p>კალენდარი</p>
          </div>
        </div>
      )}

      {isNavigationActive && (
        <div className="h-full rounded-md p-4 bg-[#1e1a4d] flex flex-col gap-2">
          {navigationContent[currentActiveNavigationPage]}
        </div>
      )}
    </>
  );
}
