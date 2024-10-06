import React from "react";
import { Link } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import {
  FaStar,
  FaStarHalf,
  FaUsers,
  FaBookOpen,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import dayjs from "dayjs";

const Student_Summaries_Card = ({ Summary }) => {
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
    <div className="group relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 h-60 md:h-auto overflow-hidden">
          {Summary?.Summary?.Image ? (
            <img
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              src={`http://localhost:3000/${Summary?.Summary?.Image}`}
              alt="Summary"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <CiImageOn className="text-6xl text-white/80" />
            </div>
          )}
        </div>

        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
              {Summary?.Summary?.Title}
            </h2>
            <p className="text-sm text-gray-600 mb-4 italic">
              {Summary?.Summary?.Category}
            </p>

            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(Summary?.Summary?.Rate || 0)}
              </div>
              <span className="text-sm text-gray-600">
                ({Summary?.Summary?.Rate?.toFixed(1) || 0})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <FaUsers className="mr-2 text-indigo-500" />
              <span className="group-hover:font-semibold transition-all duration-300">
                {Summary?.Summary?.Students_count || 0} Enrolments
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaBookOpen className="mr-2 text-indigo-500" />
              <span className="group-hover:font-semibold transition-all duration-300">
                {Summary?.Summary?.Pages_Count || 0} Pages
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaCalendarAlt className="mr-2 text-indigo-500" />
              <span className="group-hover:font-semibold transition-all duration-300">
                {dayjs(Summary?.Summary?.createdAt).format("DD MMM YYYY")}
              </span>
            </div>
            {Summary?.Summary?.Price && (
              <div className="flex items-center text-sm font-semibold text-green-600">
                {Summary?.Summary?.Price} DA
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_Summaries_Card;
