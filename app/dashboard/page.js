import DashboardHeader from "@/components/dashboard/header";
import { Input } from "@/components/ui/input";
import { getAllGroups } from "@/actions";
import Link from "next/link";
import GroupsList from "@/components/dashboard/main/GroupsList";

export default async function Dashboard() {
  let error = null;
  let groups = [];

  try {
    groups = await getAllGroups();
  } catch (error) {
    error = "ჯგუფების მიღებისას დაფიქსირდა შეცდომა";
  }



  return (
    <div>
      <div>
        <p className="text-center font-bold">მოძებნეთ ჯგუფები:</p>
      </div>

      {error && <p className="mt-4">დაფიქსირდა შეცდომა...</p>}

      {groups && groups.groups.length > 0 && (
        <GroupsList groups={groups.groups} />
      )}
    </div>
  );
}
