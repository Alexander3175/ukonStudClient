import Cookies from "js-cookie";
import { IUser } from "../types/User";
const getToken = () => {
  const token = Cookies.get("accessToken");
  if (!token) {
    console.warn("Токен доступу відсутній. Користувач не авторизований.");
    return null;
  }
  return token;
};
const fetchCreatePost = async (formData: FormData) => {
  const token = getToken();
  const response = await fetch("http://localhost:8080/games/create", {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to create game: ${errorMessage}`);
  }

  return await response.json();
};
async function fetchGetAllUsers() {
  const token = getToken();
  try {
    const response = await fetch("http://localhost:8080/users/users", {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка отримання користувачів:", error);
  }
}

async function fetchGetAllRoles() {
  const token = getToken();
  try {
    const response = await fetch(`http://localhost:8080/roles/getAllRoles`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка отримання ролів:", error);
  }
}

async function fetchUpdateUser(
  userId: number,
  updatedUser: IUser
): Promise<IUser | undefined> {
  const token = getToken();
  try {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        username: updatedUser.username,
        email: updatedUser.email,
        roles: updatedUser.roles.map((role) => role.role),
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Помилка сервера: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка отримання ролів:", error);
  }
}

async function fetchDeleteUser(userId: number) {
  return userId;
}
export {
  fetchCreatePost,
  fetchGetAllUsers,
  fetchGetAllRoles,
  fetchUpdateUser,
  fetchDeleteUser,
};
