import React, { useEffect, useState } from "react";
import { IUser, Role } from "../../../types/User";
import { fetchGetAllRoles } from "../../../service/adminService";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
  onSave: (updatedUser: IUser) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [roles, setRoles] = useState<Role[]>(user.roles);
  const [allRoles, setAllRoles] = useState<Role[]>([]);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const rolesData: Role[] = await fetchGetAllRoles();
        setAllRoles(rolesData);
      } catch (error) {
        console.error("Помилка при отриманні ролей", error);
      }
    }
    fetchRoles();
  }, []);

  useEffect(() => {
    setRoles(user.roles);
  }, [user]);

  if (!isOpen) return null;

  const handleRoleChange = (role: Role) => {
    setRoles((prevRoles) =>
      prevRoles.some((r) => r.role === role.role)
        ? prevRoles.filter((r) => r.role !== role.role)
        : [...prevRoles, role]
    );
  };

  const handleSaveUser = () => {
    if (!username || !email) {
      console.error("Ім'я та електронна пошта не можуть бути порожніми");
      return;
    }
    const updatedUser = { ...user, username, email, roles };
    onSave(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-black">
          Редагувати користувача
        </h2>

        <label className="block mb-2">Ім'я</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Ролі</label>
        <div>
          {allRoles.map((role) => (
            <label key={role.role} className="block text-black">
              <input
                type="checkbox"
                checked={roles.some((r) => r.role === role.role)}
                onChange={() => handleRoleChange(role)}
              />
              {role.role}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-400 p-2 rounded">
            Скасувати
          </button>
          <button
            onClick={handleSaveUser}
            className="bg-blue-500 p-2 rounded text-white"
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
