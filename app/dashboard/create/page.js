import CreateGroup from "@/components/dashboard/create/create-group";

export default async function DashbordCreatePage() {
  return (
    <div>
      <div className="text-center">
        <p className="text-2xl">ჯგუფის შექმნა</p>
      </div>

      <div>
        <CreateGroup />
      </div>
    </div>
  );
}
