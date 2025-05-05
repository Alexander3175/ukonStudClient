import { useEffect, useState } from "react";
import {
  fetchDeleteUser,
  fetchGetAllUsers,
  fetchUpdateUser,
} from "../../service/adminService";
import EditUserModal from "./ui/editModal";
import DeleteUserModal from "./ui/deleteModal";
import { IUser } from "../../types/User";
import { toast } from "react-toastify";

const UserTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  async function fetchUsers() {
    setLoading(true);

    try {
      const response = await fetchGetAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Помилка при отриманні користувачів", error);
      toast.error("Помилка при отриманні користувачів");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleEdit(user: IUser) {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }

  function handleDelete(user: IUser) {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  }

  async function handleDeleteUser(user: IUser) {
    try {
      await fetchDeleteUser(user.id);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      setIsDeleteModalOpen(false);
      toast.success("Користувача успішно видалено");
    } catch (error) {
      console.log("deleteUser:", error);
      toast.error("Помилка при видаленні користувача");
    }
  }

  const handleSaveUser = async (updatedUser: IUser) => {
    if (!updatedUser.username || !updatedUser.email) {
      toast.error("Ім'я та Email не можуть бути порожніми");
      return;
    }

    try {
      await fetchUpdateUser(updatedUser.id, updatedUser);
      setUsers((prevUsers: IUser[]) => {
        return prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      });
      setIsEditModalOpen(false);
      toast.success("Користувача успішно оновлено");
    } catch (error) {
      console.log("updateUser:", error);
      toast.error("Помилка при оновленні користувача");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Користувачі
      </h2>
      <div className="overflow-x-auto">
        {loading ? (
          <div>Loading....</div>
        ) : (
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
                    <td className=" flex py-3 px-6 text-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                      >
                        Редагувати
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                      >
                        Ban
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    Немає користувачів для відображення
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {selectedUser && isEditModalOpen && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
          onSave={handleSaveUser}
        />
      )}
      {selectedUser && isDeleteModalOpen && (
        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          user={selectedUser}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default UserTable;
