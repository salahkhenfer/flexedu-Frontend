import React from "react";
import { Star, Clock, Users, Book } from "lucide-react";

const CourseCard = ({ title, category, rating, price, linkImg, sale }) => {
  // Calculate a fake number of students and lessons based on the rating
  const enrolledStudents = Math.floor(rating * 1000);
  const numLessons = Math.floor(rating * 10);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img src={linkImg} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 left-0 bg-blue-500 text-white m-3 px-2 py-1 rounded-full text-sm font-semibold">
          {category}
        </div>
        {sale && (
          <div className="absolute top-0 right-0 bg-red-500 text-white m-3 px-2 py-1 rounded-full text-sm font-semibold">
            {sale}% OFF
          </div>
        )}
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2 line-clamp-2">{title}</h2>
        <div className="flex items-center mb-2">
          <Star className="w-5 h-5 text-yellow-400 mr-1" />
          <span className="font-semibold">{rating}</span>
          <span className="text-gray-500 ml-2">
            ({enrolledStudents} students)
          </span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <Clock className="w-4 h-4 mr-2" />
          <span>{Math.floor(numLessons * 0.5)} hours</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <Book className="w-4 h-4 mr-2" />
          <span>{numLessons} lessons</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">{price}</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
