import { getUsersGroups } from "@/actions";
import GroupsList from "@/components/dashboard/main/GroupsList";

export default async function UserGroups() {
  let groups = [];
  let error;

  try {
    groups = await getUsersGroups();
  } catch (error) {
    error = "დაფიქსირდა შეცდომა";
  }

  return (
    <div className="mt-4">
      <p className="text-2xl">ჩემი ჯგუფები</p>

      <div className="mt-4">
        {error && <p className="text-bold">{error}</p>}

        {groups && groups.length > 0 ? (
          <GroupsList groups={groups} />
        ) : (
          <p>შენ არხარ არცერთ ჯგუფში გაწევრიანებული</p>
        )}
      </div>
    </div>
  );
}
