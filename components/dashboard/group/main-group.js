import { gellAllGroupsFiles, getAllGroupMessages } from "@/actions";
import { sendNewMessage } from "@/actions";
import GroupNavigation from "./navigation/group-navigation";
import MessageAndUpload from "./controllers/message-upload";
import ContentList from "./list/content-list";
import FilesUpload from "./controllers/files-upload";

export default async function MainGroup({ groupInfo, isAdmin }) {
  const messages = await getAllGroupMessages(groupInfo.id);
  const files = await gellAllGroupsFiles(groupInfo.id);
  let sortedContent = [];

  if (messages.messages.length > 0 || files.length > 0) {
    const combinedArray = [...messages.messages, ...files];

    sortedContent = combinedArray.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  return (
    <div className="h-full grid grid-cols-5 grid-rows-5 gap-4">
      <div className="col-span-3 bg-[#1e1a4d] rounded-md p-4">
        <p>ჯგუფის სახელი: {groupInfo.name}</p>
      </div>
      <div className="col-span-3 col-start-1 row-start-5 rounded-md p-4 bg-[#1e1a4d] ">
        <MessageAndUpload isAdmin={isAdmin} groupId={groupInfo.id} />
        <FilesUpload groupId={groupInfo.id} />
      </div>
      <div className="col-span-3 row-span-3 col-start-1 row-start-2 rounded-md p-4 bg-[#312c85] overflow-auto flex flex-col gap-2">
        {sortedContent && sortedContent.length > 0 && (
          <ContentList content={sortedContent} />
        )}
      </div>
      <div className="col-span-2 row-span-5 col-start-4 row-start-1 rounded-md p-4 bg-[#1e1a4d] flex flex-col gap-2">
        <GroupNavigation isAdmin={isAdmin} />
      </div>
    </div>
  );
}
