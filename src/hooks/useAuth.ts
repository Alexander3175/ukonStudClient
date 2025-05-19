import { useUserStore } from "../stores/userStore";
import { useUserSteamStore } from "../stores/userSteamStore";

export const useAuth = () => {
  const localUser = useUserStore((state) => state.user);
  const steamUser = useUserSteamStore((state) => state.user);

  const logoutLocal = useUserStore((state) => state.logout);
  const logoutSteam = useUserSteamStore((state) => state.logout);

  const isSteamAuth = !!steamUser;
  const isLocalAuth = !!localUser;
  const isAuthenticated = isSteamAuth || isLocalAuth;

  const user = steamUser || localUser || null;
  const userRole = localUser?.roles || [];

  const logout = () => {
    if (isSteamAuth) logoutSteam();
    if (isLocalAuth) logoutLocal();
  };

  return {
    isAuthenticated,
    user,
    logout,
    userRole: userRole ?? [],
  };
};
