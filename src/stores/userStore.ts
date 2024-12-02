import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

interface DecodedToken {
  username: string;
  email: string;
}

interface iUser {
  username: string;
  email: string;
}

interface iUserStore {
  user: iUser | null;
  setUser: (user: iUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  checkAuthentication: () => boolean;
  setAuthenticated: (Status: boolean) => void;
}

export const useUserStore = create<iUserStore>((set) => ({
  user: null,
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
        set({
          user: { username: decodedToken.username, email: decodedToken.email },
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
