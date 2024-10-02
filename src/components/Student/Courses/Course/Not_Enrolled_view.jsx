import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import { IoAdd } from "react-icons/io5";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CiImageOn } from "react-icons/ci";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useAppContext } from "../../../../AppContext";
function Not_Enrolled_view({ course }) {
    const [showDescription, setShowDescription] = useState(false);

    function toggleDescription() {
        setShowDescription(!showDescription);
    }
    const navigate = useNavigate(); // Fixed typo

    return (
        <div>
            <div>
                {!course ? (
                    <div className=" flex flex-col gap-6 items-center justify-center">
                        <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                            <IoIosWarning />
                            <h1>course Not Found</h1>
                        </div>
                    </div>
                ) : (
                    <div className=" flex flex-col items-center justify-center gap-6 p-4">
                        <div className=" flex justify-between w-full ">
                            <div className=" w-[90%] ">
                                <div className=" flex flex-col gap-2 ">
                                    <div className=" flex gap-2 ">
                                        {course?.Image ? (
                                            <img
                                                className="w-[220px] h-[220px] object-cover"
                                                src={`http://localhost:3000/${course?.Image}`}
                                                alt="course image"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-[220px] h-[220px] bg-gray-100 ">
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
                                                    {dayjs(
                                                        course?.createdAt
                                                    ).format("DD MMMM YYYY")}
                                                </div>
                                            </div>
                                            <div className=" flex justify-start gap-6 font-semibold text-sm text-gray_v pt-6">
                                                <div className="flex gap-4 w-full">
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map(
                                                            (_, index) =>
                                                                index <
                                                                Math.floor(
                                                                    course?.Rate ||
                                                                        0
                                                                ) ? (
                                                                    <FaStar
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="text-yellow-400"
                                                                    />
                                                                ) : index <
                                                                  Math.ceil(
                                                                      course?.Rate ||
                                                                          0
                                                                  ) ? (
                                                                    <FaStarHalf
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="text-yellow-400"
                                                                    />
                                                                ) : (
                                                                    <FaStar
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="text-gray-400"
                                                                    />
                                                                )
                                                        )}
                                                    </div>
                                                </div>

                                                <div className=" shrink-0">
                                                    {course?.Students_count ? (
                                                        <div>
                                                            {" "}
                                                            {
                                                                course?.Students_count
                                                            }{" "}
                                                            Enrolment
                                                        </div>
                                                    ) : (
                                                        <div>0 Enrolment</div>
                                                    )}
                                                </div>
                                                <div className=" shrink-0">
                                                    {course?.Course_Videos ? (
                                                        <div>
                                                            {" "}
                                                            {
                                                                course
                                                                    ?.Course_Videos
                                                                    .length
                                                            }{" "}
                                                            Vedios
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            No Vedios in this
                                                            course
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" text-gray-600 font-semibold text-sm">
                                    <div className="w-[80%] pl-8 py-4">
                                        <div className="pb-4">
                                            {course?.Description && (
                                                <p className="text-gray text-base">
                                                    {course?.Description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" w-[10%]  ">
                                <Link
                                    to={`/Student/Courses/${course?.id}/Enrollment`}
                                    className=" flex items-center justify-center font-bold p-2 mt-6 bg-green-500 text-white cursor-pointer  rounded-lg "
                                >
                                    {/* <IoAdd className="  font-bold text-xl" /> */}
                                    Enroll
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Not_Enrolled_view;
