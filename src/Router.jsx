import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorElement from "./components/ErrorElement";
import LandingPage from "./landingPage/LandingPage";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage />, errorElement: <ErrorElement /> },
    ],
  },
]);

export default Routers;
