import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useAppContext } from "../../../../AppContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function Not_pending_view({ course, Purcase }) {
    const { user } = useAppContext();
    const location = useLocation();
    const CourseId = location.pathname.split("/")[3];
    const fileInputRef = useRef(null);
    const [imageChanged, setimageChanged] = useState(false);
    const [image_state, setimage_state] = useState(null);
    useEffect(() => {
        console.log("Purcase", Purcase);
    }, [Purcase]);

    return (
        <div>
            <div className=" ">
                <div
                    key={course?.id}
                    className="flex items-center justify-between border rounded-md p-4 my-4"
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            {course?.Image ? (
                                <img
                                    className="w-[120px] h-[120px] object-cover"
                                    src={`http://localhost:3000/${course?.Image}`}
                                    alt="course image"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-[120px] h-[120px] bg-gray-100">
                                    <CiImageOn className="text-xl" />
                                </div>
                            )}
                            <div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-sm mb-6 font-semibold text-white">
                                        <div className="text-gray_v text-lg">
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
                                    {course?.Price && (
                                        <div className="text-sm text-gray_v font-semibold">
                                            {course?.Price} DA
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-between w-full font-semibold">
                                    <div className="text-sm pt-1 text-gray_v">
                                        Created at:{" "}
                                        {dayjs(course?.createdAt).format(
                                            "DD MMMM YYYY"
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-start gap-6 font-semibold text-sm text-gray_v pt-6">
                            <div className="flex gap-4 w-full">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) =>
                                        index <
                                        Math.floor(course?.Rate || 0) ? (
                                            <FaStar
                                                key={index}
                                                className="text-yellow-400"
                                            />
                                        ) : index <
                                          Math.ceil(course?.Rate || 0) ? (
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

                            <div className="shrink-0">
                                {course?.Students_count ? (
                                    <div>
                                        {course?.Students_count} Enrolment
                                    </div>
                                ) : (
                                    <div>0 Enrolment</div>
                                )}
                            </div>
                            <div className="shrink-0">
                                {course?.Vedios_count ? (
                                    <div>{course?.Vedios_count} Videos</div>
                                ) : (
                                    <div>No Videos in this course</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" text-2xl font-seminbold text-center py-4 text-gray-400">
                Please wiat till ower Team validate your payment{" "}
            </div>
            <div>
                <div className="flex flex-col text-sm md:text-lg gap-4 text-black_text">
                    <div className="max-w-[400px] mx-auto">
                        <div className="font-semibold text-sm pb-1">
                            Your CCP Number:
                        </div>
                        <div className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full">
                            {Purcase?.CCP_number || "N/A"}
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="relative">
                            <img
                                src={
                                    "http://localhost:3000" +
                                    Purcase?.screenShot
                                }
                                alt="Screenshot"
                                className="w-[150px] h-[150px] object-cover rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Not_pending_view;
