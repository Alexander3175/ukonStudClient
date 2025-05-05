import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import queryClient from "../util/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useUserStore } from "../stores/userStore";
import { useEffect, useState } from "react";
import ServerChecker from "./serverChecker";

const Root = () => {
  const { checkAuthentication, setAuthenticated } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuthentication = async () => {
      const checkResult = await checkAuthentication();
      setAuthenticated(checkResult);
      setIsLoading(false);
    };
    initializeAuthentication();
  }, [checkAuthentication, setAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ServerChecker>
        <Outlet />
      </ServerChecker>
      <ToastContainer autoClose={1500} />
    </QueryClientProvider>
  );
};

export default Root;
