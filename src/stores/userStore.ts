import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import Cookies from "js-cookie";
import { IUser, IRole } from "../types/User";
import { isTokenExpired } from "../util/decodeToken";

interface DecodedToken {
  id: number;
  exp: number;
  username: string;
  email: string;
  roles: IRole[];
}

interface IUserStore {
  user: IUser | null;
  userRole: IRole[];
  setUser: (user: IUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  checkAuthentication: () => Promise<boolean>;
  setAuthenticated: (Status: boolean) => void;
  refreshToken: () => Promise<boolean | undefined>;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  userRole: [],
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({ user: null, isAuthenticated: false, userRole: [] });
    window.location.reload();
  },
  isAuthenticated: false,

  checkAuthentication: async () => {
    console.log("Cookies content:", Cookies.get());
    const token = Cookies.get("accessToken");
    if (token) {
      console.log("One if");

      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log("Decoded Token:", decodedToken);

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
            id: decodedToken.id,
            username: decodedToken.username,
            email: decodedToken.email,
            roles: decodedToken.roles,
          },
          userRole: decodedToken.roles.filter(
            (roleObj) => roleObj.role !== "GUEST"
          ),
          isAuthenticated: true,
        });
        console.log("User authenticated successfully");
        return true;
      } catch {
        console.log("Store Catch");

        Cookies.remove("accessToken");
        set({
          isAuthenticated: false,
          user: null,
          userRole: [{ id: 0, role: "GUEST", valueRole: null }],
        });
        return false;
      }
    }
    set({ userRole: [{ id: 0, role: "GUEST", valueRole: null }] });
    return false;
  },

  refreshToken: async () => {
    console.log("refreshToken One");
    try {
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        console.log("refreshToken Two");

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
        console.log("REFRESH GOOO CLIENT");

        const data = await response.json();
        if (data.accessToken) {
          Cookies.set("accessToken", data.accessToken);
          const decodedToken = jwtDecode<DecodedToken>(data.accessToken);
          set({
            user: {
              id: decodedToken.id,
              username: decodedToken.username,
              email: decodedToken.email,
              roles: decodedToken.roles,
            },
            userRole: decodedToken.roles,
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

  setAuthenticated: (Status) => {
    set({ isAuthenticated: Status });
  },
}));
