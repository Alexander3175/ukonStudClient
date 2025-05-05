import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getTokenAndUserId = (): { token: string; userId: number } => {
  const token = Cookies.get("accessToken");
  if (!token) throw new Error("Користувач не авторизований");

  const decoded = jwtDecode<{ id: number }>(token);

  return { token, userId: decoded.id };
};
