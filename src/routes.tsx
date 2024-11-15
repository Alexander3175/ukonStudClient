import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm.tsx";
import RegForm from "./components/auth/RegForm.tsx";
import ErrorPage from "./routers/error.tsx";
import MainPage from "./routers/main.tsx";
import Auth from "./routers/auth.tsx";

const routes = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />
  },
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />
  },

  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginForm />,

      },
      {
        path: "reg",
        element: <RegForm />,
      }
    ]
  },
]);

export default routes;