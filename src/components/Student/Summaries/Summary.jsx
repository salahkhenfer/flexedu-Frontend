import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowDown,
  FaArrowUp,
  FaStar,
  FaStarHalf,
  FaUserGraduate,
  FaBook,
  FaCalendarAlt,
} from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IoIosWarning } from "react-icons/io";
dayjs.extend(customParseFormat);

function Summary() {
  const Navigate = useNavigate();
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Summary, setSummary] = useState();
  const location = useLocation();
  const SummaryId = location.pathname.split("/")[3];
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/Students/Summaries/${SummaryId}`,
          { withCredentials: true, validateStatus: () => true }
        );
        if (response.status === 200) {
          setSummary(response.data.Summary);
        } else if (response.status === 401) {
          Swal.fire("Error", "You should login again", "error");
          Navigate("/Login");
        } else {
          setError(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [SummaryId, Navigate]);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[calc(100vh-60px)] flex items-center justify-center">
        <div className="text-red-600 font-semibold">{error.message}</div>
      </div>
    );
  }

  if (!Summary) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center pt-24">
        <div className="flex justify-center items-center gap-2 text-gray-600 text-xl font-semibold">
          <IoIosWarning className="text-yellow-500 text-2xl" />
          <h1>Summary Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative h-64 sm:h-80 md:h-96">
          {Summary.Image ? (
            <img
              className="w-full h-full object-cover"
              src={`http://localhost:3000/${Summary.Image}`}
              alt="Summary"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-300 to-indigo-300 flex items-center justify-center">
              <CiImageOn className="text-6xl text-white" />
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-sm font-semibold text-purple-600 shadow-lg">
            {Summary.Category}
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {Summary.Title}
          </h1>

          <div className="flex items-center mb-6">
            {[...Array(5)].map((_, index) =>
              index < Math.floor(Summary.Rate || 0) ? (
                <FaStar key={index} className="text-yellow-400" />
              ) : index < Math.ceil(Summary.Rate || 0) ? (
                <FaStarHalf key={index} className="text-yellow-400" />
              ) : (
                <FaStar key={index} className="text-gray-300" />
              )
            )}
            <span className="ml-2 text-gray-600 text-sm">
              {Summary.Rate || 0} stars
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <FaUserGraduate className="mr-2 text-indigo-500" />
              <span>{Summary.Students_count || 0} Enrollments</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaBook className="mr-2 text-indigo-500" />
              <span>{Summary.Pages_Count || 0} Pages</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaCalendarAlt className="mr-2 text-indigo-500" />
              <span>{dayjs(Summary.createdAt).format("DD MMM YYYY")}</span>
            </div>
          </div>

          {Summary.Price && (
            <div className="text-2xl font-bold text-green-600 mb-6">
              {Summary.Price} DA
            </div>
          )}

          <div className="mb-6">
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
            >
              {showDescription ? "Hide" : "Show"} Description
              {showDescription ? (
                <FaArrowUp className="ml-2" />
              ) : (
                <FaArrowDown className="ml-2" />
              )}
            </button>
            {showDescription && Summary.Description && (
              <p className="mt-4 text-gray-700 leading-relaxed">
                {Summary.Description}
              </p>
            )}
          </div>

          <Link
            to={`/Student/Summaries/${Summary.id}/Enrollment`}
            className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Summary;
