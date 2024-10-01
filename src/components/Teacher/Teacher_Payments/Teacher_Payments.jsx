import React from "react";
import { useAppContext } from "../../../AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import Courses_Card from "./CourseCard";
import SummaryCard from "./SummaryCard";
import { MdAttachMoney } from "react-icons/md";
function Purchased() {
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Page_Data, setPage_Data] = useState([]);
    const [Courses, setCourses] = useState([]);
    const [Summaries, setSummaries] = useState([]);
    const [CCP_number, setCCP_number] = useState("");
    const [CCP_number_changed, setCCP_number_changed] = useState("");
    const [change_ccp_loading, setChange_ccp_loading] = useState(false);
    const Change_CCp = async () => {
        setChange_ccp_loading(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/Teachers/${user.id}/CCP`,
                { CCP_number },
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            console.log(response);
            
            if (response.status === 200) {
                Swal.fire(
                    "Success",
                    "CCP number changed successfully",
                    "success"
                );
                setCCP_number_changed(false);
            } else {
                Swal.fire("Error", response.data.error, "error");
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        } finally {
            setChange_ccp_loading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        const FetchPurchased = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Teachers/${user.id}/Payments`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    const data = response.data;
                    setPage_Data(data);
                    setCourses(data.course_Purcase_Requests);
                    setSummaries(data.summary_Purcase_Requests);
                    setCCP_number(data.CCP_number);
                    console.log(data);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        FetchPurchased();
    }, [user.id]);

    if (loading) {
        return (
            <div className=" w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className=" flex flex-col gap-4 justify-center items-center my-10 ">
                <div>Your CCP number </div>
                <input
                    type="text"
                    name="CCP_number"
                    id="CCP_number"
                    value={CCP_number ? CCP_number : ""}
                    placeholder="0"
                    onChange={(e) => {
                        setCCP_number(e.target.value);
                        setCCP_number_changed(true);
                    }}
                    className="border rounded shadow-sm p-3"
                />

                <>
                    {change_ccp_loading ? (
                        <div className="flex justify-center">
                            <span className="small-loader"></span>
                        </div>
                    ) : (
                        <div
                            onClick={() => {
                                if (!CCP_number) {
                                    Swal.fire(
                                        "Error",
                                        "CCP number is required",
                                        "error"
                                    );
                                } else if (CCP_number.length < 5) {
                                    Swal.fire(
                                        "Error",
                                        "CCP number must be at least 5 digits",
                                        "error"
                                    );
                                } else if (isNaN(CCP_number)) {
                                    Swal.fire(
                                        "Error",
                                        "CCP number must be a number",
                                        "error"
                                    );
                                } else Change_CCp();
                            }}
                            className={`bg-green-500 px-3 py-2 text-center rounded-md cursor-pointer
                               text-white font-semibold text-base ${
                                   CCP_number_changed ? "block" : "invisible"
                               }`}
                        >
                            save
                        </div>
                    )}
                </>
            </div>
            <div className="w-full flex gap-12 justify-center py-4">
                <div className="max-w-[300px] border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                    <div className="text-xs font-semibold pb-5 text-gray_v w-full">
                        Total Number of Courses Payment:
                    </div>
                    <div className="flex justify-between gap-2 mx-2 w-full">
                        <div className="font-semibold text-2xl">
                            {/* {payments.reduce(
                                            (total, payment) =>
                                                total +
                                                payment.applicationsCount,
                                            0
                                        )} */}
                            {Courses.length}
                        </div>
                        <div className="shrink-0 text-blue-600 border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                            <MdAttachMoney className="shrink-0 text-2xl" />
                        </div>
                    </div>
                </div>{" "}
                <div className="max-w-[300px] border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                    <div className="text-xs font-semibold pb-5 text-gray_v w-full">
                        Total Number of Summaries Payment:
                    </div>
                    <div className="flex justify-between gap-2 mx-2 w-full">
                        <div className="font-semibold text-2xl">
                            {/* {payments.reduce(
                                            (total, payment) =>
                                                total +
                                                payment.applicationsCount,
                                            0
                                        )} */}
                            {Summaries.length}
                        </div>
                        <div className="shrink-0 text-blue-600 border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                            <MdAttachMoney className="shrink-0 text-2xl" />
                        </div>
                    </div>
                </div>{" "}
            </div>
            <div className="w-[90%] mx-auto">
                <h2 className="text-2xl font-bold mb-4">Courses</h2>
                {Courses.length === 0 ? (
                    <div className="flex items-center justify-center text-gray-500">
                        <IoIosWarning />
                        <span>No courses purchased yet</span>
                    </div>
                ) : (
                    Courses.map((course) => (
                        <Courses_Card key={course.id} course={course} />
                    ))
                )}
            </div>
            <div className="w-[90%] mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Summaries</h2>
                {Summaries.length === 0 ? (
                    <div className="flex items-center justify-center text-gray-500">
                        <IoIosWarning />
                        <span>No summaries purchased yet</span>
                    </div>
                ) : (
                    Summaries.map((summary) => (
                        <SummaryCard key={summary.id} Summary={summary} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Purchased;
