import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useEffect } from "react";
import NavigationMenu from "../components/NavigationMenu";

const Authentication = (): JSX.Element | null => {
  const { isAuthenticated, isLoading } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, isLoading, navigate]);
  if (isLoading) {
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
