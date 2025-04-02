import { useEffect, useState } from "react";
import { fetchGetAllUsers, fetchUpdateUser } from "../../service/adminService";
import EditUserModal from "./ui/editModal";
import { IUser } from "../../types/User";

const UserTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchUsers() {
    try {
      const response = await fetchGetAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Помилка при отриманні користувачів", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleEdit(user: IUser) {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  const handleSaveUser = async (updatedUser: IUser) => {
    try {
      await fetchUpdateUser(updatedUser.id, updatedUser);
      setUsers((prevUsers: IUser[]) => {
        return prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      });
      setIsModalOpen(false);
      await fetchUsers();
    } catch (e) {
      console.error("Помилка при збереженні користувача", e);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Користувачі
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Ім'я</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Роль</th>
              <th className="py-3 px-6 text-center">Дії</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-black">{user.id}</td>
                  <td className="py-3 px-6 text-black">{user.username}</td>
                  <td className="py-3 px-6 text-black">{user.email}</td>
                  <td className="py-3 px-6 text-black">
                    {user.roles
                      .map((roleObj: { role: string }) => roleObj.role)
                      .join(", ")}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                    >
                      Редагувати
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
                  Немає користувачів для відображення
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <EditUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default UserTable;
