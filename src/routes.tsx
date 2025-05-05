import { createBrowserRouter, Navigate } from "react-router-dom";
import ContactPage from "./routers/contact";
import Authentication from "./routers/authentication";
import MainPage from "./routers/main";
import UserProfile from "./routers/UserProfile";
import AdminPanel from "./routers/adminPanel";
import GameDetailPage from "./routers/GameDetailPage";
import GuestAccess from "./routers/GuestAccess";
import ErrorPage from "./routers/error";
import RegForm from "./components/auth/RegForm";
import LoginForm from "./components/auth/LoginForm";
import UnAuthentication from "./routers/unAuthentication";
import Root from "./routers/root";
import ServerDown from "./routers/server-down";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <GuestAccess />,
        children: [
          {
            path: "",
            element: <Navigate to="home" replace />,
          },
          {
            path: "home",
            element: <MainPage />,
          },
          {
            path: "contact",
            element: <ContactPage />,
          },
          {
            path: "game/:gameId",
            element: <GameDetailPage />,
          },
        ],
      },
      {
        path: "",
        element: <Authentication />,
        children: [
          {
            path: "profile",
            element: <UserProfile />,
          },
          {
            path: "adminPanel",
            element: <AdminPanel />,
          },
        ],
      },
      {
        path: "auth",
        element: <UnAuthentication />,
        children: [
          {
            path: "",
            element: <Navigate to="login" replace />,
          },
          {
            path: "login",
            element: <LoginForm />,
          },
          {
            path: "reg",
            element: <RegForm />,
          },
        ],
      },
      {
        path: "server-down",
        element: <ServerDown />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default routes;
