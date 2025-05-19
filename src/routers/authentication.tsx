import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavigationMenu from "../components/navigations/NavigationMenu";
import { useAuth } from "../hooks/useAuth";

const Authentication = (): JSX.Element | null => {
  const { isAuthenticated } = useAuth();
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
