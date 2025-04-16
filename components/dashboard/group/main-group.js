import { IoMdNotifications } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { PiBooks } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function MainGroup({ groupInfo, isAdmin }) {
  return (
    <div className="h-full grid grid-cols-5 grid-rows-5 gap-4">
      <div className="col-span-3 bg-[#1e1a4d] rounded-md p-4">
        <p>ჯგუფის სახელი: {groupInfo.name}</p>
      </div>
      <div className="col-span-3 col-start-1 row-start-5 rounded-md p-4 bg-[#1e1a4d] flex gap-4">
        <div className="w-full flex gap-2">
          <div>
            <div className="flex items-center gap-2 border w-fit p-2 cursor-pointer transition-all ease-in duration-100 bg-transparent hover:bg-white/10 rounded-lg">
              <FaCloudUploadAlt
                size={18}
                color="white"
                className="cursor-pointer"
              />
              <p className="text-sm">ფაილის ატვირთვა</p>
            </div>
          </div>

          {isAdmin && (
            <div className="flex-1">
              <Input className="w-full" placeholder="შეიყვანეთ ტექსტი..." />
            </div>
          )}
        </div>

        <div>
          <Button className="cursor-pointer" variant="secondary">
            გაგზავნა
          </Button>
        </div>
      </div>
      <div className="col-span-3 row-span-3 col-start-1 row-start-2 rounded-md p-4 bg-[#312c85]"></div>
      <div className="col-span-2 row-span-5 col-start-4 row-start-1 rounded-md p-4 bg-[#1e1a4d] flex flex-col gap-2">
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
      </div>
    </div>
  );
}
