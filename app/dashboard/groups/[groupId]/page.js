import { getGroupDetail } from "@/actions";
import JoinGroup from "@/components/dashboard/buttons/join-group";
import MainGroup from "@/components/dashboard/group/main-group";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { MdOutlineLock } from "react-icons/md";

export default async function GroupsDetails({ params }) {
  const { groupId } = await params;
  let result;

  try {
    result = await getGroupDetail(groupId);
  } catch (error) {
    return notFound();
  }

  return (
    <>
      {result.hasAccess ? (
        <div className="h-full">
          <MainGroup groupInfo={result.group} isAdmin={result.isAdmin} />
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-full relative z-10 rounded-lg ">
          <div>
            <div className="flex items-center gap-2 justify-center flex-col">
              <MdOutlineLock size={72} />
              <p>შენ არხარ გაწევრიანებული ჯგუფში</p>
            </div>

            <div className="text-center mt-2">
              {/* <Button className="cursor-pointer">გაწევრიანება</Button> */}
              <form>
                <JoinGroup />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
