import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes.tsx";

import "./index.css";
import App from "./App.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <RouterProvider router={routes} />
  </StrictMode>
);
