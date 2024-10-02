import React from "react";
import { Link } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import {
  FaStar,
  FaStarHalf,
  FaUsers,
  FaBookOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Student_Summaries_Card({ Summary }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
      <div className="flex">
        <div className="w-1/3 bg-gradient-to-br from-purple-500 to-indigo-600 p-6 flex items-center justify-center">
          {Summary?.Summary?.Image ? (
            <img
              className="w-full h-48 object-cover rounded-lg"
              src={`http://localhost:3000/${Summary?.Summary?.Image}`}
              alt="Summary"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <CiImageOn className="text-5xl text-gray-400" />
            </div>
          )}
        </div>
        <div className="w-2/3 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {Summary?.Summary?.Title}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {Summary?.Summary?.Category}
          </p>

          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, index) =>
                index < Math.floor(Summary?.Summary?.Rate || 0) ? (
                  <FaStar key={index} className="text-yellow-400" />
                ) : index < Math.ceil(Summary?.Summary?.Rate || 0) ? (
                  <FaStarHalf key={index} className="text-yellow-400" />
                ) : (
                  <FaStar key={index} className="text-gray-300" />
                )
              )}
            </div>
            <span className="text-sm text-gray-600">
              ({Summary?.Summary?.Rate?.toFixed(1) || 0})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <FaUsers className="mr-2 text-indigo-500" />
              {Summary?.Summary?.Students_count || 0} Enrolments
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaBookOpen className="mr-2 text-indigo-500" />
              {Summary?.Summary?.Pages_Count || 0} Pages
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaCalendarAlt className="mr-2 text-indigo-500" />
              {dayjs(Summary?.Summary?.createdAt).format("DD MMM YYYY")}
            </div>
            {Summary?.Summary?.Price && (
              <div className="flex items-center text-sm font-semibold text-green-600">
                {Summary?.Summary?.Price} DA
              </div>
            )}
          </div>

          <Link
            to={`/Student/Purchased/Summaries/${Summary?.Summary?.id}`}
            className="inline-block bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
          >
            View Summary
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Student_Summaries_Card;
