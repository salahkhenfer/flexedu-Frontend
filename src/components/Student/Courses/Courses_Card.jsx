import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { CiImageOn } from "react-icons/ci";
import {
  FaCalendarAlt,
  FaStar,
  FaStarHalf,
  FaUsers,
  FaVideo,
} from "react-icons/fa";
import { Link } from "react-router-dom";

dayjs.extend(customParseFormat);

function Student_Courses_Card({ course }) {
  return (
    <div className="bg-white cursor-pointer my-3 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <div className="flex flex-col md:flex-row">
        {/* Course Image Section */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-4 flex items-center justify-center">
          {course?.Image ? (
            <img
              className="w-full h-48 object-cover rounded-lg shadow-lg"
              src={`http://localhost:3000/${course?.Image}`}
              alt="Course"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <CiImageOn className="text-5xl text-gray-400" />
            </div>
          )}
        </div>

        {/* Course Details Section */}
        <div className="w-full md:w-2/3 p-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {course?.Title}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{course?.Category}</p>

          {/* Rating Section */}
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, index) =>
                index < Math.floor(course?.Rate || 0) ? (
                  <FaStar key={index} className="text-yellow-400" />
                ) : index < Math.ceil(course?.Rate || 0) ? (
                  <FaStarHalf key={index} className="text-yellow-400" />
                ) : (
                  <FaStar key={index} className="text-gray-300" />
                )
              )}
            </div>
            <span className="text-sm text-gray-600">
              ({course?.Rate?.toFixed(1) || 0})
            </span>
          </div>

          {/* Course Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <FaUsers className="mr-2 text-purple-500" />
              {course?.Students_count || 0} Enrolment
              {course?.Students_count !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaVideo className="mr-2 text-purple-500" />
              {course?.Course_Videos?.length || 0} Video
              {course?.Course_Videos?.length !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaCalendarAlt className="mr-2 text-purple-500" />
              Purchased: {dayjs(course?.createdAt).format("DD MMM YYYY")}
            </div>
            {course?.Price && (
              <div className="flex items-center text-sm font-semibold text-green-600">
                {course?.Price} DA
              </div>
            )}
          </div>

          {/* View Course Button */}
          <Link
            to={`/Student/Courses/${course?.id}`}
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-gradient-to-l transition-colors duration-300"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Student_Courses_Card;
