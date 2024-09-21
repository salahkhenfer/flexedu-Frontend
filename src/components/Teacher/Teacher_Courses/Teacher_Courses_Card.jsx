import React from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import { CiImageOn } from "react-icons/ci";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function Teacher_Courses_Card({ course, setCourses }) {
    const Naviagte = useNavigate();
    const { user } = useAppContext();
    const [delete_loading, setDeleteLoading] = useState(false);
    const DeleteCourse = async () => {
        setDeleteLoading(true);
        try {
            const response = await axios.delete(
                `http://localhost:3000/Teachers/${user.id}/Courses/${course.id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire("Success", "Course Deleted Successfully", "success");
                setDeleteLoading(false);
                setCourses((prev) => prev.filter((c) => c.id !== course.id));
            } else {
                Swal.fire("Error", response.data.error, "error");
                setDeleteLoading(false);
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
            setDeleteLoading(false);
        }
    };
    return (
        <div
            key={course.id}
            className="flex items-center justify-between  border  rounded-md p-4 my-4"
        >
            <div className=" flex gap-2">
                {course.Image ? (
                    <img
                        className="w-[120px] h-[120px] object-cover"
                        src={`http://localhost:3000/Courses_image/${course.Image}`}
                        alt="course image"
                    />
                ) : (
                    <div className="flex items-center justify-center w-[120px] h-[120px] bg-gray-100 ">
                        <CiImageOn className=" text-xl" />
                    </div>
                )}
                <div>
                    <div className="flex items-center justify-between w-full">
                        <div className="text-sm  mb-6 font-semibold text-white">
                            <div className=" text-gray_v text-lg">
                                {course?.Title}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full font-semibold">
                        <div className="text-sm pt-1 text-gray_v">
                            Created at :{" "}
                            {/* {new Date(
                                                    course?.createdAt
                                                ).toLocaleDateString()} */}
                            {dayjs(course?.createdAt).format("DD MMMM YYYY")}
                        </div>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col gap-4">
                <Link
                    to={`/Teacher/Courses/${course.id}`}
                    className="bg-perpol_v text-center px-3 py-2 rounded-md cursor-pointer
                                                 text-white font-semibold text-base"
                >
                    View
                </Link>
                <div>
                    {delete_loading ? (
                        <div className="flex justify-center ">
                            <span className="small-loader"></span>
                        </div>
                    ) : (
                        <div
                            onClick={() => DeleteCourse()}
                            className="bg-red-500 px-3 py-2 text-center rounded-md cursor-pointer
                                                         text-white font-semibold text-base"
                        >
                            Delete
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Teacher_Courses_Card;
