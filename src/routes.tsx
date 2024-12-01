import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import RegForm from "./components/auth/RegForm";
import ErrorPage from "./routers/error";
import ContactPage from "./routers/contact";
import Root from "./routers/root";
import Authentication from "./routers/authentication";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
        element: <Authentication />,
        errorElement: <ErrorPage />,
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
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default routes;
