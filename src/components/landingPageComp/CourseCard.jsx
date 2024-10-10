import React from "react";
import { Star, Clock, Book } from "lucide-react";
import { CiImageOn } from "react-icons/ci";

const CourseCard = ({ title, category, rating, price, linkImg, sale }) => {
  // Calculate a fake number of students and lessons based on the rating
  const enrolledStudents = Math.floor(rating * 1000);
  const numLessons = Math.floor(rating * 10);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 max-w-sm mx-auto">
      <div className="relative">
        {linkImg == "" ? (
          <img
            className="w-full h-48 object-cover"
            src={linkImg}
            alt="Course"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-48 bg-gray-200">
            <CiImageOn className="text-6xl text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-md">
          {category}
        </div>
        {sale && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            {sale}% OFF
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-lg font-bold mb-2 line-clamp-2 leading-tight">
          {title}
        </h2>
        <div className="flex items-center mb-2">
          <Star className="w-5 h-5 text-yellow-400 mr-1" />
          <span className="font-semibold">{rating}</span>
          <span className="text-gray-500 ml-2 text-sm">
            ({enrolledStudents.toLocaleString()} students)
          </span>
        </div>
        <div className="flex items-center text-gray-600 mb-2 text-sm">
          <Clock className="w-4 h-4 mr-2" />
          <span>{Math.floor(numLessons * 0.5)} hours</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4 text-sm">
          <Book className="w-4 h-4 mr-2" />
          <span>{numLessons} lessons</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">{price} DZ</span>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
