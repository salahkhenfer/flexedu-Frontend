import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import VideoComponent from "./Vedio_Component";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";

function CourseComponent() {
    const { user } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    const courseId = location.pathname.split("/")[4]; // Get course ID from URL
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const vedioId = new URLSearchParams(location.search).get("video");
    const [activeVideoIndex, setActiveVideoIndex] = useState(0); // Handle active video state

    // Fetch course data
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Students/${user.id}/Purchased/Courses/${courseId}`,
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    setCourseData(response.data);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                } else {
                    setError(response.data);
                }
                setLoading(false);
            } catch (error) {
                setError("Failed to load course data");
                setLoading(false);
            }
        };
        fetchCourseData();
    }, [courseId, user.id]);

    // Update the active video index when vedioId changes
    useEffect(() => {
        if (vedioId && courseData?.Course?.Course_Videos) {
            const videoIndex = courseData.Course.Course_Videos.findIndex(
                (video) => video.id === parseInt(vedioId)
            );
            if (videoIndex !== -1) {
                setActiveVideoIndex(videoIndex);
            }
        }
    }, [vedioId, courseData]);

    if (loading) {
        return (
            <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message || error}
                </div>
            </div>
        );
    }

    if (!courseData?.isEnrolled || courseData?.paymentStatus !== "accepted") {
        return (
            <div className="w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    You are not enrolled in this course
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full h-screen">
            {/* Left: Video and Course Description */}
            <div className="flex-1">
                {courseData?.Course?.Course_Videos?.length > 0 ? (
                    <VideoComponent
                        videoData={
                            courseData.Course.Course_Videos[activeVideoIndex]
                        }
                    />
                ) : (
                    <div className="p-4">
                        No videos available for this course
                    </div>
                )}

                <div className="p-4">
                    <h1 className="text-2xl font-bold">
                        {courseData?.Course?.Title}
                    </h1>
                    <p className="text-gray-600">
                        {courseData?.Course?.Description}
                    </p>
                    <p className="mt-2">
                        <strong>Category:</strong>{" "}
                        {courseData?.Course?.Category}
                    </p>
                    <p>
                        <strong>Price:</strong> {courseData?.Course?.Price} DA
                    </p>
                    <p>
                        <strong>Rating:</strong> {courseData?.Course?.Rate}{" "}
                        stars
                    </p>
                    <p>
                        <strong>Number of students:</strong>{" "}
                        {courseData?.Course?.Students_count}
                    </p>
                </div>
            </div>

            {/* Right: Video List */}
            <div className="w-1/3 bg-gray-100 p-4 overflow-y-scroll">
                <h2 className="text-xl font-semibold mb-4">Course Videos</h2>
                <ul>
                    {courseData?.Course?.Course_Videos?.map((video, index) => (
                        <li
                            key={video.id}
                            className={`p-2 border-b cursor-pointer hover:bg-gray-200 ${
                                activeVideoIndex === index ? "bg-gray-200" : ""
                            }`}
                            onClick={() =>
                                navigate(
                                    `/Student/Purchased/Courses/${courseId}?video=${video.id}`
                                )
                            }
                        >
                            {index + 1}. {video.title || `Video ${index + 1}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CourseComponent;
