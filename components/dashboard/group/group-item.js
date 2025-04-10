import Link from "next/link";

export default function GroupItem({ group }) {
  return (
    <Link key={group.id} href={`/dashboard/groups/${group.id}`}>
      <div
        key={group.id}
        className="border rounded-sm p-2 flex flex-col gap-2 cursor-pointer hover:scale-95 transition-all ease-in duration-100"
      >
        <p className="truncate">სახელი: {group.name}</p>
        <p className="truncate">აღწერა: {group.description}</p>
      </div>
    </Link>
  );
}
