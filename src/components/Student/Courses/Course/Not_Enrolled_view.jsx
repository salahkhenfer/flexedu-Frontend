import React from "react";
import { Link } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import {
  FaStar,
  FaStarHalf,
  FaUserGraduate,
  FaPlayCircle,
} from "react-icons/fa";
import dayjs from "dayjs";

function Not_Enrolled_view({ course }) {
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <IoIosWarning className="text-6xl text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Course Not Found</h1>
        <p className="text-gray-600 mt-2">
          The course you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-5xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            {course.Image ? (
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={`http://localhost:3000/${course.Image}`}
                alt={course.Title}
              />
            ) : (
              <div className="flex items-center justify-center h-48 w-full md:h-full md:w-48 bg-gray-200">
                <CiImageOn className="text-4xl text-gray-400" />
              </div>
            )}
          </div>
          <div className="p-8 w-full">
            <div className="flex justify-between items-start">
              <div>
                <p className="block mt-1 text-lg leading-tight font-medium text-black">
                  {course.Title}
                </p>
                <p className="mt-2 text-gray-500">{course.Category}</p>
              </div>
              {course.Price == 0 ? (
                <p className="text-lg font-semibold text-green-600">Free</p>
              ) : (
                <p className="text-lg font-semibold text-green-600">
                  {course.Price} DA
                </p>
              )}
            </div>
            <p className="mt-4 text-gray-500">{course.Description}</p>
            <div className="mt-6 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) =>
                  index < Math.floor(course.Rate || 0) ? (
                    <FaStar key={index} className="text-yellow-400" />
                  ) : index < Math.ceil(course.Rate || 0) ? (
                    <FaStarHalf key={index} className="text-yellow-400" />
                  ) : (
                    <FaStar key={index} className="text-gray-300" />
                  )
                )}
              </div>
              <span className="ml-2 text-gray-600">
                {course.Rate ? course.Rate.toFixed(1) : "Not rated"}
              </span>
            </div>
            <div className="mt-6 flex items-center text-sm text-gray-500">
              <FaUserGraduate className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              <span>{course.Students_count || 0} Enrollments</span>
              <FaPlayCircle className="flex-shrink-0 ml-4 mr-1.5 h-5 w-5 text-gray-400" />
              <span>
                {course.Course_Videos ? course.Course_Videos.length : 0} Videos
              </span>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <time
                className="text-sm text-gray-500"
                dateTime={course.createdAt}
              >
                Created on {dayjs(course.createdAt).format("MMMM D, YYYY")}
              </time>
              <Link
                to={`/Student/Courses/${course.id}/Enrollment`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Not_Enrolled_view;
