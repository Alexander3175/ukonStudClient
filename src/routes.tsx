import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import RegForm from "./components/auth/RegForm";
import ErrorPage from "./routers/error";
import ContactPage from "./routers/contact";
import Root from "./routers/root";
import Authentication from "./routers/authentication";
import UnAuthentication from "./routers/unAuthentication";
import MainPage from "./routers/main";
import UserProfile from "./components/profile/UserProfile";
import AdminPanel from "./routers/adminPanel";
import GameDetailPage from "./routers/GameDetailPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
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
        path: "",
        element: <Authentication />,
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
            path: "profile",
            element: <UserProfile />,
          },
          {
            path: "adminPanel",
            element: <AdminPanel />,
          },
          {
            path: "game/:gameId",
            element: <GameDetailPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default routes;
