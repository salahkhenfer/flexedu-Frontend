import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaBook,
  FaGraduationCap,
  FaStar,
} from "react-icons/fa";
import NavBar from "../../landingPage/NavBar/NavBar";

const CourseDetails = () => {
  // This would typically come from props or a data fetch
  const course = {
    id: 1,
    title: "Introduction to Computer Science",
    instructor: "Dr. Jane Smith",
    description:
      "This course provides a comprehensive introduction to computer science, covering fundamental concepts such as algorithms, data structures, and programming paradigms.",
    duration: "16 weeks",
    schedule: "Mondays and Wednesdays, 10:00 AM - 11:30 AM",
    credits: 4,
    level: "Undergraduate",
    prerequisites: ["Basic algebra", "Logical thinking skills"],
    syllabus: [
      "Week 1-2: Introduction to Programming Concepts",
      "Week 3-4: Data Types and Structures",
      "Week 5-6: Algorithms and Problem Solving",
      "Week 7-8: Object-Oriented Programming",
      "Week 9-10: Web Development Basics",
      "Week 11-12: Databases and SQL",
      "Week 13-14: Software Engineering Principles",
      "Week 15-16: Final Project and Review",
    ],
    rating: 4.8,
  };

  return (
    <div>
      <div className="min-h-screen  bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mt-10 mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-64 bg-blue-600">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white text-center px-4">
                {course.title}
              </h1>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
          </div>

          <div className="relative px-8 py-10">
            <div className="flex flex-wrap -mx-4 mb-8">
              <InfoItem icon={FaUser} text={course.instructor} />
              <InfoItem icon={FaCalendarAlt} text={course.duration} />
              <InfoItem icon={FaClock} text={course.schedule} />
              <InfoItem icon={FaBook} text={`${course.credits} credits`} />
              <InfoItem icon={FaGraduationCap} text={course.level} />
              <InfoItem icon={FaStar} text={`${course.rating}/5 rating`} />
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Course Description
              </h2>
              <p className="text-gray-600">{course.description}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
              <ul className="list-disc list-inside text-gray-600">
                {course.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Course Syllabus</h2>
              <div className="bg-gray-100 rounded-xl p-6">
                {course.syllabus.map((week, index) => (
                  <div key={index} className="flex items-start mb-4 last:mb-0">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <p className="text-gray-800">{week}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-12">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                Enroll in this Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, text }) => (
  <div className="w-1/2 sm:w-1/3 px-4 mb-4">
    <div className="flex items-center">
      <Icon className="text-blue-500 mr-2" />
      <span className="text-gray-700">{text}</span>
    </div>
  </div>
);

export default CourseDetails;
