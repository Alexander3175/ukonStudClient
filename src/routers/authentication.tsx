import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useEffect } from "react";
import NavigationMenu from "../components/NavigationMenu";

const Authentication = (): JSX.Element | null => {
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      if (!isAuthenticated) {
        navigate("/auth");
      }
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <NavigationMenu />
      <Outlet />
    </>
  );
};

export default Authentication;
