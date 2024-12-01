import { Outlet, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import queryClient from "../util/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useUserStore } from "../stores/userStore";
import { useEffect, useState } from "react";
import NavigationMenu from "../components/NavigationMenu";

function Root() {
  const { isAuthenticated, checkAuthentication, setAuthenticated } =
    useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkResult = checkAuthentication();
    setAuthenticated(checkResult);
    if (isAuthenticated) {
      navigate("/contact");
    } else {
      navigate("/auth");
    }
    setIsLoading(false);
  }, [checkAuthentication, isAuthenticated, navigate, setAuthenticated]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <NavigationMenu />
      <QueryClientProvider client={queryClient}>
        <Outlet />

        <ToastContainer autoClose={1500} />
      </QueryClientProvider>
    </>
  );
}

export default Root;