import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../AppContext";
import { CiImageOn } from "react-icons/ci";
import {
  FaStar,
  FaStarHalf,
  FaBookOpen,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Teacher_Summaries_Card({ Summary, setSummaries }) {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteSummary = async () => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:3000/Teachers/${user?.id}/Summaries/${Summary?.id}`,
        {
          withCredentials: true,
          validateStatus: () => true,
        }
      );
      if (response.status === 200) {
        Swal.fire("Success", "Summary Deleted Successfully", "success");
        setSummaries((prev) => prev.filter((c) => c.id !== Summary?.id));
      } else {
        Swal.fire("Error", response.data.error, "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="group  my-4 relative bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>

      <div className="relative p-6">
        <div className="flex items-center mb-4">
          {Summary?.Image ? (
            <img
              className="w-24 h-24 object-cover rounded-lg mr-4"
              src={`http://localhost:3000/${Summary?.Image}`}
              alt="Summary"
            />
          ) : (
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-lg mr-4">
              <CiImageOn className="text-4xl text-gray-400" />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {Summary?.Title}
            </h2>
            <p className="text-sm text-gray-600 mb-2">{Summary?.Category}</p>
            {Summary?.Price && (
              <p className="text-lg font-semibold text-green-600">
                {Summary?.Price} DA
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            {dayjs(Summary?.createdAt).format("DD MMM YYYY")}
          </div>
          <div className="flex items-center">
            <FaUsers className="mr-2" />
            {Summary?.Students_count || 0} Enrolments
          </div>
          <div className="flex items-center">
            <FaBookOpen className="mr-2" />
            {Summary?.Pages_Count || 0} Pages
          </div>
        </div>

        <div className="flex items-center mb-6">
          <div className="flex mr-2">
            {[...Array(5)].map((_, index) =>
              index < Math.floor(Summary?.Rate || 0) ? (
                <FaStar key={index} className="text-yellow-400" />
              ) : index < Math.ceil(Summary?.Rate || 0) ? (
                <FaStarHalf key={index} className="text-yellow-400" />
              ) : (
                <FaStar key={index} className="text-gray-300" />
              )
            )}
          </div>
          <span className="text-gray-600 text-sm">
            {Summary?.Rate?.toFixed(1) || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <Link
            to={`/Teacher/Summaries/${Summary?.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            View Details
          </Link>

          {deleteLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <button
              onClick={deleteSummary}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teacher_Summaries_Card;
