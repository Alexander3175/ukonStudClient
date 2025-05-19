import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const UnAuthentication = (): JSX.Element | null => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
