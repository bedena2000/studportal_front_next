"use client";
import { IoMdNotifications } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { PiBooks } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";

export default function GroupNavigation({ isAdmin }) {
  return (
    <>
      {isAdmin && (
        <div className="flex gap-2 items-center cursor-pointer rounded-md hover:bg-[#053345] bg-[#052f4a] p-2">
          <IoMdNotifications size={32} color="white" />
          <p>შეტყობინებები</p>
        </div>
      )}
      <div className="flex gap-2 items-center cursor-pointer rounded-md hover:bg-[#053345] bg-[#052f4a] p-2">
        <BsPeopleFill size={32} color="white" />
        <p>ჯგუფის წევრები</p>
      </div>

      <div className="flex gap-2 items-center cursor-pointer rounded-md hover:bg-[#053345] bg-[#052f4a] p-2">
        <PiBooks size={32} color="white" />
        <p>ჯგუფის მასალები</p>
      </div>

      <div className="flex gap-2 items-center cursor-pointer rounded-md hover:bg-[#053345] bg-[#052f4a] p-2">
        <FaCalendarAlt size={32} color="white" />
        <p>კალენდარი</p>
      </div>
    </>
  );
}
