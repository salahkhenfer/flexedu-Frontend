import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorElement from "./components/ErrorElement";
import LandingPage from "./landingPage/LandingPage";
import CourseDetails from "./components/landingPageComp/CourseDetails";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage />, errorElement: <ErrorElement /> },

      {
        path: "CourseDetails",
        element: <CourseDetails />,
      },
    ],
  },
]);

export default Routers;
