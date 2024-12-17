import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useEffect } from "react";

const UnAuthentication = (): JSX.Element | null => {
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default UnAuthentication;
