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
import Teacher_Payments from "./components/Teacher/Teacher_Payments/Teacher_Payments";
import Teacher_Summaries from "./components/Teacher/Teacher_Summaries/Teacher_Summaries";
import Teacher_Add_Summary from "./components/Teacher/Teacher_Summaries/Add_Summary";
import Teacher_Summary from "./components/Teacher/Teacher_Summaries/Summary";
import Teacher_Edit_Summary from "./components/Teacher/Teacher_Summaries/Edit_Summary";

import Student from "./components/Student/Student";
import Student_Default from "./components/Student/Student_Default";
import Student_Profile from "./components/Student/Student_Profile/Student_Profile";
import Student_Courses from "./components/Student/Courses/Courses";
import Student_Purchased from "./components/Student/Purchased/Purchased";
import Student_Purchased_Course from "./components/Student/Purchased/Course";

import Student_Edit_Profile from "./components/Student/Student_Edit_Profile/Student_Edit_Profile";
import Student_Course from "./components/Student/Courses/Course/Course";
import Student_Course_Enrollemnt from "./components/Student/Courses/Enrollment/Enrollment";
import Student_Summaries from "./components/Student/Summaries/Student_Summaries";
import Student_Summary from "./components/Student/Summaries/Summary";
import Student_Summary_Enrollemnt from "./components/Student/Summaries/Enrollment/Enrollment";

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
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Profile/Edit",
                        element: <Teacher_Edit_Profile />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Courses",
                        element: <Teacher_Courses />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Courses/Add",
                        element: <Teacher_Add_Course />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Courses/:id",
                        element: <Teacher_Course />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Courses/:id/Edit",
                        element: <Teacher_Edit_Course />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Courses/:id/Vedios/:vedioId",
                        element: <Teacher_Course_Vedio />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Courses/:id/Vedios/Add",
                        element: <Teacher_Upload_Vedio />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Payments",
                        element: <Teacher_Payments />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Summaries",
                        element: <Teacher_Summaries />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Summaries/Add",
                        element: <Teacher_Add_Summary />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Summaries/:id",
                        element: <Teacher_Summary />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Summaries/:id/Edit",
                        element: <Teacher_Edit_Summary />,
                        errorElement: <ErrorElement />,
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
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Profile/Edit",
                        element: <Student_Edit_Profile />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Courses",
                        element: <Student_Courses />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Courses/:id",
                        element: <Student_Course />,
                        errorElement: <ErrorElement />,
                    },

                    {
                        path: "/Student/Purchased",
                        element: <Student_Purchased />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Purchased/Courses/:id",
                        element: <Student_Purchased_Course />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Courses/:id/Enrollment",
                        element: <Student_Course_Enrollemnt />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Summaries",
                        element: <Student_Summaries />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Summaries/:id",
                        element: <Student_Summary />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Summaries/:id/Enrollment",
                        element: <Student_Summary_Enrollemnt />,
                        errorElement: <ErrorElement />,
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
