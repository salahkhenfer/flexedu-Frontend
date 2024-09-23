import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Upload_Vedio() {
    const navigate = useNavigate();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [videoData, setVideoData] = useState(null);
    const videoRef = useRef(null);
    const location = useLocation();
    const CourseId = location.pathname.split("/")[3];
    const VedioId = location.pathname.split("/")[5];

    useEffect(() => {
        const fetchVideo = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Teachers/${user?.id}/Courses/${CourseId}/Videos/${VedioId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                console.log(response);

                if (response.status === 200) {
                    setVideoData(response.data.Vedio);
                } else if (response.status === 404) {
                    setError({ message: "Video not found" });
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    navigate("/Login");
                } else {
                    setError({ message: "An unexpected error occurred" });
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [CourseId, VedioId, user?.id, navigate]);

    if (loading) {
        return (
            <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-screen h-[80vh] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message || "An error occurred"}
                </div>
            </div>
        );
    }

    if (!videoData) {
        return (
            <div className="w-screen h-[80vh] flex items-center justify-center">
                <div className="text-gray-600 font-semibold">
                    Video data is missing
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen">
            {/* Video player at the top with full width */}
            <div className="w-full h-[80vh] bg-black">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    controls
                >
                    <source
                        src={`http://localhost:3000${videoData.Video}`} // Video URL
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Video info & course details in normal mode */}
            <div className="max-w-4xl mx-auto p-4">
                <div className="mt-4">
                    <h1 className="text-2xl font-bold mb-2">
                        {videoData.Title}
                    </h1>
                    <p className="text-gray-600">
                        Duration: {videoData.Duration}
                    </p>
                    <p className="text-gray-600">
                        Course: {videoData.Course.Title}
                    </p>
                </div>

                {/* Additional course details */}
                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-semibold">
                        Course Information
                    </h2>
                    <p>
                        <strong>Category:</strong> {videoData.Course.Category}
                    </p>
                    <p>
                        <strong>Price:</strong> ${videoData.Course.Price}
                    </p>
                    <p>
                        <strong>Description:</strong>{" "}
                        {videoData.Course.Description}
                    </p>
                    <p>
                        <strong>Rating:</strong> {videoData.Course.Rate} stars
                    </p>
                    <p>
                        <strong>Number of students:</strong>{" "}
                        {videoData.Course.Students_count}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Upload_Vedio;
