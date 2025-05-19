import Cookies from "js-cookie";
import { useUserStore } from "../stores/userStore";
import { useUserSteamStore } from "../stores/userSteamStore";
import { jwtDecode } from "jwt-decode";
import { TWitchUser } from "../types/User";

export const checkAuthentication = async () => {
  try {
    const token = Cookies.get("accessToken");
    if (!token) return false;
    const data: TWitchUser = jwtDecode(token);
    if ("roles" in data) {
      useUserStore.getState().setUser(data);
      useUserStore.getState().setAuthenticated(true);
    } else if ("steamId" in data) {
      useUserSteamStore.getState().setUser(data);
      useUserSteamStore.getState().setAuthenticated(true);
    }

    return true;
  } catch (e) {
    console.error("Auth check failed:", e);
    return false;
  }
};
