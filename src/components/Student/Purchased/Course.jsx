import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import VideoComponent from "./Vedio_Component";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";
import CourseReview from "./Review/Course_Review";
import { FaStar, FaUsers, FaPlay, FaChevronRight } from "react-icons/fa";
import Rating from "react-rating-stars-component";

function CourseComponent() {
    const { user } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    const courseId = location.pathname.split("/")[4];
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [showSidebar, setShowSidebar] = useState(true);
    const [activeVideo, setActiveVideo] = useState(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Students/${user.id}/Purchased/Courses/${courseId}`,
                    { withCredentials: true }
                );
                console.log(response);

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
        fetchCourseData().then(() => {
            if (!courseData?.Course?.Course_Videos) {
                setShowSidebar(false);
            }
        });
    }, [courseId, user.id, activeVideoIndex]);

    useEffect(() => {
        const videoId = new URLSearchParams(location.search).get("video");
        if (videoId && courseData?.Course?.Course_Videos) {
            const videoIndex = courseData.Course.Course_Videos.findIndex(
                (video) => video.id === parseInt(videoId)
            );
            if (videoIndex !== -1) {
                setActiveVideoIndex(videoIndex);
            }
        }
        const selectedVideo =
            courseData?.Course?.Course_Videos[activeVideoIndex];
        setActiveVideo(selectedVideo);
    }, [location.search, courseData]);

    const handleVideoSelect = (index) => {
        setActiveVideoIndex(index);
        const selectedVideo = courseData.Course.Course_Videos[index];
        setActiveVideo(selectedVideo);
    };

    return (
        <div className="flex w-full  ">
            <div
                className={`flex-1 transition-all duration-300 ${
                    showSidebar ? "mr-80" : "mr-0"
                }`}
            >
                <div className="bg-white shadow-lg rounded-lg m-4">
                    {courseData?.Course?.Course_Videos?.length > 0 ? (
                        <VideoComponent videoData={activeVideo} />
                    ) : (
                        <div className="p-4 text-center text-gray-600">
                            No videos available for this course
                        </div>
                    )}

                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            {courseData?.Course?.Title}
                        </h1>
                        <p className="text-gray-600 mb-4">
                            {courseData?.Course?.Description}
                        </p>
                        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
                            <p className="mb-2">
                                <span className="font-semibold">Category:</span>{" "}
                                {courseData?.Course?.Category}
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Price:</span>{" "}
                                {courseData?.Course?.Price} DA
                            </p>
                            <p className="mb-2 flex items-center">
                                <span className="font-semibold mr-1">
                                    Rating:
                                </span>{" "}
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={
                                            i <
                                            Math.round(courseData?.Course?.Rate)
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </p>
                            <p className="mb-2 flex items-center">
                                <FaUsers className="mr-1" />
                                <span className="font-semibold">
                                    Students:
                                </span>{" "}
                                {courseData?.Course?.Students_count}
                            </p>
                        </div>
                    </div>
                </div>
                <div className=" mt-12 mb-4">
                    <CourseReview courseId={courseId} />
                </div>
            </div>

            <div
                className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-all duration-300 transform ${
                    showSidebar ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="absolute -left-10 top-1/2 bg-white p-2 rounded-l-md shadow-md"
                >
                    <FaChevronRight
                        className={`transition-transform duration-300 ${
                            showSidebar ? "" : "rotate-180"
                        }`}
                    />
                </button>
                <div className="p-4 h-full overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4">
                        Course Videos
                    </h2>
                    <ul>
                        {courseData?.Course?.Course_Videos?.map(
                            (video, index) => (
                                <li
                                    key={video.id}
                                    className={`p-3 mb-2 rounded-md cursor-pointer transition-colors duration-200 flex items-center ${
                                        activeVideoIndex === index
                                            ? "bg-blue-100 text-blue-600"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() => handleVideoSelect(index)}
                                >
                                    <FaPlay className="mr-2" />
                                    <span>
                                        {video.title || `Video ${index + 1}`}
                                    </span>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CourseComponent;
