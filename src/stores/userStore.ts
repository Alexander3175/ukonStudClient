import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

interface DecodedToken {
  exp: number;
  username: string;
  email: string;
  roles: string[];
}

interface iUser {
  username: string;
  email: string;
  roles: string[];
}

interface iUserStore {
  user: iUser | null;
  userRole: string[];
  setUser: (user: iUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  checkAuthentication: () => boolean;
  setAuthenticated: (Status: boolean) => void;
}

export const useUserStore = create<iUserStore>((set) => ({
  user: null,
  userRole: [],
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, isAuthenticated: false });
  },
  isAuthenticated: false,

  checkAuthentication: () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("accessToken");
          set({ isAuthenticated: false });
          return false;
        }

        set({
          user: {
            username: decodedToken.username,
            email: decodedToken.email,
            roles: decodedToken.roles,
          },
          userRole: decodedToken.roles,
          isAuthenticated: true,
        });
        return true;
      } catch {
        localStorage.removeItem("accessToken");
        set({ isAuthenticated: false });
      }
    }
    return false;
  },

  setAuthenticated: (Status) => {
    set({ isAuthenticated: Status });
  },
}));
