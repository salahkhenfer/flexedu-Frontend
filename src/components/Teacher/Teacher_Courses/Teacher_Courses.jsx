import React from "react";
import { useAppContext } from "../../../AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function Teacher_Courses() {
    const Naviagte = useNavigate();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Courses, setCourses] = useState([]);
    useEffect(() => {
        setLoading(true);
        const FetchCourses = async ({ setCourses, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Teachers/${user?.id}/Courses`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    const courses = response.data.Courses;
                    setCourses(courses);
                } else if (response.status == 401) {
                    Swal.fire("Error", "you should login again", "error");
                    Naviagte("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        FetchCourses({ setCourses, setLoading, setError });
    }, []);

    if (loading) {
        return (
            <div className=" w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error)
        return (
            <div className=" w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    else
        return (
            <div>
                <div>
                    {!Courses || Courses?.length == 0 ? (
                        <div className=" flex flex-col items-center justify-center">
                            <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                                <IoIosWarning />
                                <h1>No Courses Found</h1>
                            </div>
                        </div>
                    ) : (
                        <div className=" flex flex-col items-center justify-center">
                            <div className=" w-[90%] mx-auto">
                                {Courses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="flex flex-col items-center justify-center border  rounded-md p-4 my-4"
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <div className="text-sm  mb-6 font-semibold text-white">
                                                <div className=" text-gray_v text-lg">
                                                    {course?.Title}
                                                </div>
                                            </div>
                                            <Link
                                                to={`/Teacher/Courses/${course.id}`}
                                                className="bg-perpol_v px-3 py-2 rounded-md cursor-pointer text-white font-semibold text-base"
                                            >
                                                View
                                            </Link>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <div
                                                className={`text-sm  font-semibold text-gray_v `}
                                            ></div>
                                        </div>

                                        <div className="flex items-center justify-between w-full font-semibold">
                                            <div className="text-sm pt-1 text-gray_v">
                                                Created at :{" "}
                                                {/* {new Date(
                                                    course?.createdAt
                                                ).toLocaleDateString()} */}
                                                {dayjs(
                                                    course?.createdAt
                                                ).format("DD MMMM YYYY")}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default Teacher_Courses;
