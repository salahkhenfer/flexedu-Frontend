import React from "react";
import { useAppContext } from "../../../AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import { IoAdd } from "react-icons/io5";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLocation } from "react-router-dom";
dayjs.extend(customParseFormat);

import { CiImageOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

function Course() {
    const Naviagte = useNavigate();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Course, setCourse] = useState();
    const location = useLocation();
    const CourseId = location.pathname.split("/")[3];
    const [showDescription, setShowDescription] = useState(false);
    function toggleDescription() {
        setShowDescription(!showDescription);
    }
    useEffect(() => {
        setLoading(true);
        const FetchCourse = async ({ setCourse, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Teachers/${user?.id}/Courses/${CourseId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                console.log(response);

                if (response.status == 200) {
                    const course = response.data.Course;
                    setCourse(course);
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
        FetchCourse({ setCourse, setLoading, setError });
    }, []);

    useEffect(() => {
        console.log(Course);
    }, [Course]);

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
                    {!Course ? (
                        <div className=" flex flex-col gap-6 items-center justify-center">
                            <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                                <IoIosWarning />
                                <h1>Course Not Found</h1>
                            </div>
                        </div>
                    ) : (
                        <div className=" flex flex-col items-center justify-center gap-6 p-4">
                            <div className=" flex justify-between w-full ">
                                <div className=" w-[90%] ">
                                    <div className=" flex flex-col gap-2 ">
                                        <div className=" flex gap-2 ">
                                            {Course.Image ? (
                                                <img
                                                    className="w-[220px] h-[220px] object-cover"
                                                    src={`http://localhost:3000/${Course.Image}`}
                                                    alt="Course image"
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
                                                            {Course?.Title}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray_v font-semibold">
                                                        {Course?.Category}
                                                    </div>
                                                </div>
                                                <div>
                                                    {Course?.Price ? (
                                                        <div className="text-sm text-gray_v font-semibold">
                                                            {Course?.Price} DA
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div className="flex items-center justify-between w-full font-semibold">
                                                    <div className="text-sm pt-1 text-gray_v">
                                                        Created at :{" "}
                                                        {/* {new Date(
                                                    Course?.createdAt
                                                ).toLocaleDateString()} */}
                                                        {dayjs(
                                                            Course?.createdAt
                                                        ).format(
                                                            "DD MMMM YYYY"
                                                        )}
                                                    </div>
                                                </div>
                                                <div className=" flex justify-start gap-6 font-semibold text-sm text-gray_v pt-6">
                                                    <div className="flex gap-4 w-full">
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map(
                                                                (_, index) =>
                                                                    index <
                                                                    Math.floor(
                                                                        Course?.Rate ||
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
                                                                          Course?.Rate ||
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
                                                        {Course?.Students_count ? (
                                                            <div>
                                                                {" "}
                                                                {
                                                                    Course?.Students_count
                                                                }{" "}
                                                                Enrolment
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                0 Enrolment
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className=" shrink-0">
                                                        {Course?.Vedios_count ? (
                                                            <div>
                                                                {" "}
                                                                {
                                                                    Course?.Vedios_count
                                                                }{" "}
                                                                Vedios
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                No Vedios in
                                                                this Course
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" text-gray-600 font-semibold text-sm">
                                        {showDescription ? (
                                            <div className="w-[80%] pl-8 py-4">
                                                <div
                                                    className="select-none flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                                                    onClick={toggleDescription}
                                                >
                                                    Show Description{" "}
                                                    <FaArrowUp />
                                                </div>
                                                <div className="pb-4">
                                                    {Course.Description && (
                                                        <p className="text-gray text-base">
                                                            {Course.Description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-[80%] pl-8 py-4">
                                                <div
                                                    className="select-none flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                                                    onClick={toggleDescription}
                                                >
                                                    Show Description{" "}
                                                    <FaArrowDown />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className=" w-[10%]  ">
                                    <Link
                                        to={`/Teacher/Courses/${Course.id}/Edit`}
                                        className=" flex items-center justify-center font-bold p-2 mt-6 bg-gray-500 text-white cursor-pointer  rounded-lg "
                                    >
                                        {/* <IoAdd className="  font-bold text-xl" /> */}
                                        Edite Course
                                    </Link>
                                </div>
                            </div>
                            <Link
                                to={`/Teacher/Courses/${Course.id}/Vedios/Add`}
                                className=" flex items-center justify-center font-bold p-2 mt-6 bg-green-600 text-white cursor-pointer  rounded-lg "
                            >
                                <IoAdd className="  font-bold text-xl" />
                                Upload Vedio
                            </Link>
                            <div>
                                <div className=" flex flex-col gap-4">
                                    {Course?.Course_Videos &&
                                    Course?.Course_Videos.length > 0
                                        ? Course?.Course_Videos.map(
                                              (vedio, index) => (
                                                  <div
                                                      className=" flex justify-between  min-w-[70vw] bg-gray-100 py-2 px-4 mb-4 rounded-lg"
                                                      key={vedio.id}
                                                  >
                                                      <div className=" flex gap-4">
                                                          <div className=" font-semibold ">
                                                              {index + 1}.
                                                          </div>

                                                          <div className=" flex gap-2">
                                                              <div className="flex flex-col gap-1">
                                                                  <div className="text-md  font-semibold">
                                                                      {
                                                                          vedio?.Title
                                                                      }
                                                                  </div>

                                                                  <div className="text-sm text-gray_v font-semibold">
                                                                      {
                                                                          vedio?.Duration
                                                                      }
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>

                                                      <div className=" flex items-center justify-center">
                                                          <Link
                                                              to={`/Teacher/Courses/${Course.id}/Vedios/${vedio.id}`}
                                                              className="bg-gray-500  px-3 py-2 rounded-md cursor-pointer
                                                     text-white font-semibold text-base"
                                                          >
                                                              View
                                                          </Link>
                                                      </div>
                                                  </div>
                                              )
                                          )
                                        : null}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default Course;
