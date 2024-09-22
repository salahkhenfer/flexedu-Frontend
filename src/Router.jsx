import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Default from "./Default";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";

import Teacher from "./components/Teacher/Teacher";
import Teacher_Default from "./components/Teacher/Teacher_Default";
import Teacher_Profile from "./components/Teacher/Teacher_Profile/Teacher_Profile";
import Teacher_Courses from "./components/Teacher/Teacher_Courses/Teacher_Courses";
import Teacher_Add_Course from "./components/Teacher/Teacher_Courses/Add_Course";
import Teacher_Course from "./components/Teacher/Teacher_Courses/Course";
import Teacher_Edit_Profile from "./components/Teacher/Teacher_Edit_Profile/Teacher_Edit_Profile";
import Teacher_Edit_Course from "./components/Teacher/Teacher_Courses/Edit_Course";
import Teacher_Course_Vedio from "./components/Teacher/Teacher_Courses/Vedio";
import Teacher_Upload_Vedio from "./components/Teacher/Teacher_Courses/Upload_Vedio";

import Student from "./components/Student/Student";
import Student_Default from "./components/Student/Student_Default";
import Student_Profile from "./components/Student/Student_Profile/Student_Profile";

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
                path: "/Teacher",
                element: <Teacher />,
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <Teacher_Default />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Profile",
                        element: <Teacher_Profile />,
                    },
                    {
                        path: "/Teacher/Profile/Edit",
                        element: <Teacher_Edit_Profile />,
                    },
                    {
                        path: "/Teacher/Courses",
                        element: <Teacher_Courses />,
                    },
                    {
                        path: "/Teacher/Courses/Add",
                        element: <Teacher_Add_Course />,
                    },
                    {
                        path: "/Teacher/Courses/:id",
                        element: <Teacher_Course />,
                    },
                    {
                        path: "/Teacher/Courses/:id/Edit",
                        element: <Teacher_Edit_Course />,
                    },
                    {
                        path: "/Teacher/Courses/:id/Vedios/:vedioId",
                        element: <Teacher_Course_Vedio />,

                    },
                    {
                        path: "/Teacher/Courses/:id/Vedios/Add",
                        element: <Teacher_Upload_Vedio />,
                    },
                ],
            },
            {
                path: "/Student",
                element: <Student />,
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <Student_Default />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Profile",
                        element: <Student_Profile />,
                    },
                ],
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
