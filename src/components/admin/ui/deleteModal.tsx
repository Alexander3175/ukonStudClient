import React from "react";
import { IUser } from "../../../types/User";

interface IDeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
  onDelete: (deleteUser: IUser) => void;
}

const DeleteUserModal: React.FC<IDeleteUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onDelete,
}) => {
  if (!isOpen) return null;

  const handleDeleteUser = () => {
    if (user) {
      onDelete(user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-black">
          Ви впевнені, що хочете видалити користувача? {user.username}
        </h2>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-400 p-2 rounded">
            Скасувати
          </button>
          <button
            onClick={handleDeleteUser}
            className="bg-red-500 p-2 rounded text-white"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
