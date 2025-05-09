import { FaLongArrowAltLeft } from "react-icons/fa";

export default function NavigationCalendar({ goBackFunc, groupId }) {
  return (
    <div>
      <div
        className="inline-block p-2 bg-white/70 rounded-md cursor-pointer"
        onClick={goBackFunc}
      >
        <FaLongArrowAltLeft size={18} color="black" />
      </div>

      <div className="mt-4">
        <p>კალენდარი:</p>
      </div>
    </div>
  );
}
