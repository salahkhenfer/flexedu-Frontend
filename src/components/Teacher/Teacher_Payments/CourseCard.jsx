import React from "react";
import { Link } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import { FaStar, FaStarHalf, FaUsers, FaVideo } from "react-icons/fa";
import dayjs from "dayjs";

const StudentCoursesCard = ({ course }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      if (index < Math.floor(rating)) {
        return <FaStar key={index} className="text-yellow-400" />;
      } else if (index < Math.ceil(rating)) {
        return <FaStarHalf key={index} className="text-yellow-400" />;
      }
      return <FaStar key={index} className="text-gray-300" />;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex">
        <div className="w-1/3">
          {course?.Course?.Image ? (
            <img
              className="w-full h-full object-cover"
              src={`http://localhost:3000/${course?.Course?.Image}`}
              alt={course?.Course?.Title}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <CiImageOn className="text-4xl text-gray-400" />
            </div>
          )}
        </div>
        <div className="w-2/3 p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {course?.Course?.Title}
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            {course?.Course?.Category}
          </p>
          {course?.Course?.Price && (
            <p className="text-lg font-bold text-green-600 mb-2">
              {course?.Course?.Price} DA
            </p>
          )}
          <p className="text-xs text-gray-500 mb-4">
            Purchased on: {dayjs(course?.createdAt).format("DD MMMM YYYY")}
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex">{renderStars(course?.Course?.Rate || 0)}</div>
            <div className="flex items-center text-sm text-gray-600">
              <FaUsers className="mr-1" />
              {course?.Course?.Students_count || 0} Enrolled
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaVideo className="mr-1" />
              {course?.Course_Videos?.length || 0} Videos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCoursesCard;
