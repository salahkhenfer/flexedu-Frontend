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
function Teacher_Summaries_Card({ Summary, setSummaries }) {
    const Naviagte = useNavigate();
    const { user } = useAppContext();
    const [delete_loading, setDeleteLoading] = useState(false);
    const DeleteSummary = async () => {
        setDeleteLoading(true);
        try {
            const response = await axios.delete(
                `http://localhost:3000/Teachers/${user?.id}/Summaries/${Summary.id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire("Success", "Summary Deleted Successfully", "success");
                setDeleteLoading(false);
                setSummaries((prev) => prev.filter((c) => c.id !== Summary.id));
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
            key={Summary.id}
            className="flex items-center justify-between  border  rounded-md p-4 my-4"
        >
            <div className=" flex flex-col gap-2 ">
                <div className=" flex gap-2">
                    {Summary.Image ? (
                        <img
                            className="w-[120px] h-[120px] object-cover"
                            src={`http://localhost:3000/${Summary.Image}`}
                            alt="Summary image"
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
                                    {Summary?.Price} {" DA"}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex items-center justify-between w-full font-semibold">
                            <div className="text-sm pt-1 text-gray_v">
                                Created at :{" "}
                                {/* {new Date(
                                                    Summary?.createdAt
                                                ).toLocaleDateString()} */}
                                {dayjs(Summary?.createdAt).format(
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
                                index < Math.floor(Summary?.Rate || 0) ? (
                                    <FaStar
                                        key={index}
                                        className="text-yellow-400"
                                    />
                                ) : index < Math.ceil(Summary?.Rate || 0) ? (
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
                        {Summary?.Students_count ? (
                            <div> {Summary?.Students_count} Enrolment</div>
                        ) : (
                            <div>0 Enrolment</div>
                        )}
                    </div>
                    <div className=" shrink-0">
                        {Summary?.Vedios_count ? (
                            <div> {Summary?.Vedios_count} Vedios</div>
                        ) : (
                            <div>No Vedios in this Summary</div>
                        )}
                    </div>
                </div>
            </div>
            <div className=" flex flex-col gap-4">
                <Link
                    to={`/Teacher/Summaries/${Summary.id}`}
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
                            onClick={() => DeleteSummary()}
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

export default Teacher_Summaries_Card;
