import React from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import { CiImageOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function Student_Courses_Card({ course, setCourses }) {
    const Naviagte = useNavigate();
    const { user } = useAppContext();

    return (
        <div
            key={course?.id}
            className="flex items-center justify-between  border  rounded-md p-4 my-4"
        >
            <div className=" flex flex-col gap-2 ">
                <div className=" flex gap-2">
                    {course?.Image ? (
                        <img
                            className="w-[120px] h-[120px] object-cover"
                            src={`http://localhost:3000/${course?.Image}`}
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
                        <div>
                            <div className="text-sm text-gray_v font-semibold">
                                {course?.Category}
                            </div>
                        </div>
                        <div>
                            {course?.Price ? (
                                <div className="text-sm text-gray_v font-semibold">
                                    {course?.Price} {" DA"}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex items-center justify-between w-full font-semibold">
                            <div className="text-sm pt-1 text-gray_v">
                                Created at :{" "}
                                {/* {new Date(
                                                    course?.createdAt
                                                ).toLocaleDateString()} */}
                                {dayjs(course?.createdAt).format(
                                    "DD MMMM YYYY"
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" flex justify-start gap-6 font-semibold text-sm text-gray_v pt-6">
                    <div className="flex gap-4 w-full">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, index) =>
                                index < Math.floor(course?.Rate || 0) ? (
                                    <FaStar
                                        key={index}
                                        className="text-yellow-400"
                                    />
                                ) : index < Math.ceil(course?.Rate || 0) ? (
                                    <FaStarHalf
                                        key={index}
                                        className="text-yellow-400"
                                    />
                                ) : (
                                    <FaStar
                                        key={index}
                                        className="text-gray-400"
                                    />
                                )
                            )}
                        </div>
                    </div>

                    <div className=" shrink-0">
                        {course?.Students_count ? (
                            <div> {course?.Students_count} Enrolment</div>
                        ) : (
                            <div>0 Enrolment</div>
                        )}
                    </div>
                    <div className=" shrink-0">
                        {course?.Course_Videos ? (
                            <div> {course?.Course_Videos.length} Vedios</div>
                        ) : (
                            <div>No Vedios in this course</div>
                        )}
                    </div>
                </div>
            </div>
            <div className=" flex flex-col gap-4">
                <Link
                    to={`/Student/Courses/${course?.id}`}
                    className="bg-perpol_v text-center px-3 py-2 rounded-md cursor-pointer
                                                 text-white font-semibold text-base"
                >
                    View
                </Link>
            </div>
        </div>
    );
}

export default Student_Courses_Card;
