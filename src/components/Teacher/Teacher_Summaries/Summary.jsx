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
import Upload_Sumarry from "./Upload_Sumarry";
import PDFReader from "./PdfReader";
function Summary() {
    const Naviagte = useNavigate();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Summary, setSummary] = useState();
    const location = useLocation();
    const SummaryId = location.pathname.split("/")[3];
    const [showDescription, setShowDescription] = useState(false);
    function toggleDescription() {
        setShowDescription(!showDescription);
    }
    useEffect(() => {
        setLoading(true);
        const FetchSummary = async ({ setSummary, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Teachers/${user?.id}/Summaries/${SummaryId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                console.log(response);

                if (response.status == 200) {
                    const Summary = response.data.Summary;
                    setSummary(Summary);
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
        FetchSummary({ setSummary, setLoading, setError });
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
                    {!Summary ? (
                        <div className=" flex flex-col gap-6 items-center justify-center">
                            <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                                <IoIosWarning />
                                <h1>Summary Not Found</h1>
                            </div>
                        </div>
                    ) : (
                        <div className=" flex flex-col items-center justify-center gap-6 p-4">
                            <div className=" flex justify-between w-full ">
                                <div className=" w-[90%] ">
                                    <div className=" flex flex-col gap-2 ">
                                        <div className=" flex gap-2 ">
                                            {Summary?.Image ? (
                                                <img
                                                    className="w-[220px] h-[220px] object-cover"
                                                    src={`http://localhost:3000/${Summary?.Image}`}
                                                    alt="Summary image"
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
                                                            {Summary?.Title}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray_v font-semibold">
                                                        {Summary?.Category}
                                                    </div>
                                                </div>
                                                <div>
                                                    {Summary?.Price ? (
                                                        <div className="text-sm text-gray_v font-semibold">
                                                            {Summary?.Price}
                                                            {" DA"}
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div className="flex items-center justify-between w-full font-semibold">
                                                    <div className="text-sm pt-1 text-gray_v">
                                                        Created at :{" "}
                                                        {/* {new Date(
                                                    Summary?.createdAt
                                                ).toLocaleDateString()} */}
                                                        {dayjs(
                                                            Summary?.createdAt
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
                                                                        Summary?.Rate ||
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
                                                                          Summary?.Rate ||
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
                                                        {Summary?.Students_count ? (
                                                            <div>
                                                                {" "}
                                                                {
                                                                    Summary?.Students_count
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
                                                        {Summary?.Pages_Count ? (
                                                            <div>
                                                                {" "}
                                                                {
                                                                    Summary?.Pages_Count
                                                                }{" "}
                                                                Pages
                                                            </div>
                                                        ) : (
                                                            <div>0 Pages</div>
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
                                                    {Summary?.Description && (
                                                        <p className="text-gray text-base">
                                                            {
                                                                Summary?.Description
                                                            }
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
                                        to={`/Teacher/Summaries/${Summary?.id}/Edit`}
                                        className=" flex items-center justify-center font-bold p-2 mt-6 bg-gray-500 text-white cursor-pointer  rounded-lg "
                                    >
                                        {/* <IoAdd className="  font-bold text-xl" /> */}
                                        Edite Summary
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <div className=" flex flex-col gap-4">
                                    {Summary?.file_link ? (
                                        <PDFReader
                                            fileLink={`http://localhost:3000/${Summary?.file_link}`}
                                        />
                                    ) : (
                                        <div>No file uploaded</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default Summary;
