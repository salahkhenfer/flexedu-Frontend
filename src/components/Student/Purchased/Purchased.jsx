import React from "react";
import { useAppContext } from "../../../AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import Courses_Card from "./CourseCard";
import SummaryCard from "./SummaryCard";

function Purcased() {
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [purcased, setpurcased] = useState([]);
    const [Courses, setCourses] = useState([]);
    const [Summaries, setSummaries] = useState([]);

    useEffect(() => {
        setLoading(true);
        const Fetchpurcased = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Students/${user.id}/Purcased`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    const data = response.data;
                    setpurcased(data);
                    setCourses(data.course_Purcase_Requests);
                  setSummaries(data.summary_Purcase_Requests);
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
        Fetchpurcased();
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

export default Purcased;
