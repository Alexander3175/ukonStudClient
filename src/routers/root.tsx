import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import queryClient from "../util/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ServerChecker from "./serverChecker";
import { checkAuthentication } from "../service/checkAuth";

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuthentication = async () => {
      await checkAuthentication();

      setIsLoading(false);
    };
    initializeAuthentication();
  }, []);

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
