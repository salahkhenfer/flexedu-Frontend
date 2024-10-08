import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import VideoComponent from "./Vedio_Component";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";
import CourseReview from "./Review/Course_Review";
import { FaStar, FaUsers, FaPlay, FaChevronRight } from "react-icons/fa";
import Rating from "react-rating-stars-component"; // Import the rating component

function CourseComponent() {
  const { user } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.pathname.split("/")[4];
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const vedioId = new URLSearchParams(location.search).get("video");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [userRating, setUserRating] = useState(0); // State for storing user's rating

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

  const handleRatingSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/Students/${user.id}/Courses/${courseId}/Review`,
        {
          rating: userRating,

          review: userRating,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log(response.status);

        Swal.fire("Success", "Rating submitted successfully", "success");
        setCourseData((prevData) => ({
          ...prevData,
          Course: {
            ...prevData.Course,
            Rate: (prevData.Course.Rate + userRating) / 2,
          },
        }));
      } else if (response.status === 401) {
        Swal.fire("Error", "You should login again", "error");
        navigate("/Login");
      }
    } catch (error) {
      if (error.status === 404) {
        Swal.fire("woring", "Review already exists", "error");
      }
      console.log(error);
      //   Swal.fire("Error", "Failed to submit rating", "error");
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-600 font-semibold text-xl bg-white p-8 rounded-lg shadow-lg">
          {error.message || error}
        </div>
      </div>
    );
  }

  if (!courseData?.isEnrolled || courseData?.paymentStatus !== "accepted") {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-600 font-semibold text-xl bg-white p-8 rounded-lg shadow-lg">
          You are not enrolled in this course
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <div
        className={`flex-1 transition-all duration-300 ${
          showSidebar ? "mr-80" : "mr-0"
        }`}
      >
        <div className="bg-white shadow-lg rounded-lg m-4">
          {courseData?.Course?.Course_Videos?.length > 0 ? (
            <VideoComponent
              videoData={courseData.Course.Course_Videos[activeVideoIndex]}
            />
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
                <span className="font-semibold mr-1">Rating:</span>{" "}
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.round(courseData?.Course?.Rate)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </p>
              <p className="mb-2 flex items-center">
                <FaUsers className="mr-1" />
                <span className="font-semibold">Students:</span>{" "}
                {courseData?.Course?.Students_count}
              </p>
            </div>

            {/* Rating section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Rate this Course:</h2>
              <Rating
                count={5}
                size={24}
                activeColor="#ffd700"
                value={userRating}
                onChange={(newRating) => setUserRating(newRating)}
              />
              <button
                onClick={handleRatingSubmit}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>

        {!courseData?.isReviewed && (
          <div className="bg-white shadow-lg rounded-lg m-4 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Leave a Review
            </h2>
            <CourseReview userId={user.id} courseId={courseId} />
          </div>
        )}
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
          <h2 className="text-xl font-semibold mb-4">Course Videos</h2>
          <ul>
            {courseData?.Course?.Course_Videos?.map((video, index) => (
              <li
                key={video.id}
                className={`p-3 mb-2 rounded-md cursor-pointer transition-colors duration-200 flex items-center ${
                  activeVideoIndex === index
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
                onClick={() =>
                  navigate(
                    `/Student/Purchased/Courses/${courseId}?video=${video.id}`
                  )
                }
              >
                <FaPlay className="mr-2" />
                <span>{video.title || `Video ${index + 1}`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseComponent;
