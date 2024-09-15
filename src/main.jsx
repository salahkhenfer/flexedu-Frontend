import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routers from "./Router.jsx";
import { AppProvider } from "./AppContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppProvider>
            <RouterProvider router={Routers} />
        </AppProvider>
    </StrictMode>
);
