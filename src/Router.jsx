import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Default from "./Default";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";

import Student from "./components/Student/Student";
import Teacher from "./components/Teacher/Teacher";

import ErrorElement from "./components/ErrorElement";
import LandingPage from "./landingPage/LandingPage";
import ContactPage from "./components/landingPageComp/ContactPage";
import { Achievement, Courses } from "./components/landingPageComp";
import CourseDetails from "./components/landingPageComp/CourseDetails";
const Routers = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Default />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Home",
                element: <LandingPage />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Student",
                element: <Student />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Teacher",
                element: <Teacher />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Contact",
                element: <ContactPage />,
            },
            {
                path: "/Achievements",
                element: <Achievement />,
            },
            {
                path: "/Courses",
                element: <Courses />,
            },
            {
                path: "/CourseDetails",
                element: <CourseDetails />,
            },
        ],
    },

    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
]);

export default Routers;
