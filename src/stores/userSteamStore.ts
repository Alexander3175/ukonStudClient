import { create } from "zustand";
import { IUserSteam } from "../types/User";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "./userStore";
import { isTokenExpired } from "../util/decodeToken";

interface DecodedToken {
  exp: number;
  steamId: string;
  displayName: string;
  photos: { value: string }[];
  country: string;
  lastLogoffAt: string;
}
interface IUserSteamStore {
  user: IUserSteam | null;
  setUser: (user: IUserSteam) => void;
  logout: () => void;
  isAuthenticated: boolean;
  checkAuthentication: () => Promise<boolean>;
  setAuthenticated: (Status: boolean) => void;
  refreshToken: () => Promise<boolean | undefined>;
}
export const useUserSteamStore = create<IUserSteamStore>((set) => ({
  user: null,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({ user: null, isAuthenticated: false });
    window.location.reload();
  },
  isAuthenticated: false,
  checkAuthentication: async () => {
    const token = Cookies.get("accessToken");
    console.log("Токен на клієнті STEAM:", token);

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log("Decoded Steam Token:", decodedToken);

        if (isTokenExpired(decodedToken.exp)) {
          Cookies.remove("accessToken");
          set({ isAuthenticated: false });
          const refreshResult = await useUserStore.getState().refreshToken();
          if (!refreshResult) {
            console.log("!refreshResult");
            return false;
          }
          return true;
        }
        set({
          user: {
            steamId: decodedToken.steamId,
            displayName: decodedToken.displayName,
            photos: decodedToken.photos,
            country: decodedToken.country,
            lastLogoffAt: decodedToken.lastLogoffAt,
          },
          isAuthenticated: true,
        });
        return true;
      } catch {
        Cookies.remove("accessToken");
        set({
          isAuthenticated: false,
          user: null,
        });
        return false;
      }
    }
    return false;
  },
  setAuthenticated: (Status) => {
    set({ isAuthenticated: Status });
  },
  refreshToken: async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        const response = await fetch("http://localhost:8080/auth/refresh", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Помилка оновлення токена");
        }

        const data = await response.json();
        if (data.accessToken) {
          Cookies.set("accessToken", data.accessToken);
          const decodedToken = jwtDecode<DecodedToken>(data.accessToken);
          set({
            user: {
              steamId: decodedToken.steamId,
              displayName: decodedToken.displayName,
              photos: decodedToken.photos,
              country: decodedToken.country,
              lastLogoffAt: decodedToken.lastLogoffAt,
            },
            isAuthenticated: true,
          });
          return true;
        } else {
          throw new Error("Відсутній accessToken у відповіді сервера");
        }
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      Cookies.remove("refreshToken");
      set({ isAuthenticated: false });
      return false;
    }
  },
}));
