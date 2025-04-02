import CreatePost from "../components/admin/createPosts";
import UserTable from "../components/admin/userTables";

const AdminPanel = () => {
  return (
    <div className="flex justify-between pt-32 px-5">
      <CreatePost />
      <UserTable />
    </div>
  );
};

export default AdminPanel;
