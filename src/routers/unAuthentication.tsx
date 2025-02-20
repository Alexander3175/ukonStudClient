import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useEffect, useState } from "react";

const UnAuthentication = (): JSX.Element | null => {
  const { isAuthenticated } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isAuthenticated in UnAuthentication:", isAuthenticated);
    if (isAuthenticated !== undefined) {
      if (isAuthenticated) {
        navigate("/");
      }
      setIsLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return null;
  }

  return <Outlet />;
};

export default UnAuthentication;
