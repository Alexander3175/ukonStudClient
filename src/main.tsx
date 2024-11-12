import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import LoginForm from "./components/auth/loginForm.tsx";
import RegForm from "./components/auth/regForm.tsx";
import ErrorPage from "./components/error-page";
import MainPage from "./components/mainPage";


const router = createBrowserRouter([
  {
    path: "*",
    errorElement: <ErrorPage />

  },
  {
    path: "/",
    element: <MainPage />,

    errorElement: <ErrorPage />

  },
  
  {
    path: "/login",
    element: <LoginForm />,
    errorElement: <ErrorPage />

  },
  {
    path: "/reg",
    element: <RegForm />,
    errorElement: <ErrorPage />

  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <RouterProvider router={router} />
  </StrictMode>
);
