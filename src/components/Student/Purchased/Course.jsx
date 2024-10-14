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
    const [userRating, setUserRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [reviewError, setReviewError] = useState(null);
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
        fetchCourseData();
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

    const handleRatingSubmit = async () => {
        try {
            const response = await axios.post(
                `http://localhost:3000/Students/${user.id}/Purchased/Courses/${courseId}/Rate`,
                { rate: userRating },
                { withCredentials: true }
            );
            if (response.status === 200) {
                setRating(userRating);
                Swal.fire(
                    "Success",
                    "Rating submitted successfully",
                    "success"
                );
            } else {
                Swal.fire("Error", response.data.message, "error");
            }
        } catch (error) {
            Swal.fire("Error", "Failed to submit rating", "error");
        }
    };

    return (
        <div className="flex w-full  bg-gray-100">
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

                        {/* Rating section */}
                        {courseData?.isReviewed ? null : (
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold mb-2">
                                    Rate this Course:
                                </h2>
                                <Rating
                                    count={5}
                                    size={24}
                                    activeColor="#ffd700"
                                    value={userRating}
                                    onChange={(newRating) =>
                                        setUserRating(newRating)
                                    }
                                />
                                <textarea
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Write a review..."
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                ></textarea>
                                <button
                                    onClick={handleRatingSubmit}
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Submit Rating
                                </button>
                            </div>
                        )}
                    </div>
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
                            showSidebar ? "rotate-180" : ""
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
