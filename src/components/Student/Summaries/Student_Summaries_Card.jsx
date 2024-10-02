import React from "react";
import { Link } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import { FaStar, FaStarHalf } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Student_Summaries_Card({ Summary, setSummaries }) {
  return (
    <div className="flex items-center justify-between border rounded-lg p-4 my-4 bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          {Summary?.Image ? (
            <img
              className="w-[120px] h-[120px] object-cover rounded-lg shadow-md"
              src={`http://localhost:3000/${Summary?.Image}`}
              alt="Summary"
            />
          ) : (
            <div className="flex items-center justify-center w-[120px] h-[120px] bg-gray-200 rounded-lg">
              <CiImageOn className="text-3xl text-gray-500" />
            </div>
          )}
          <div className="flex flex-col justify-between">
            <div className="text-lg font-semibold text-gray-800">
              {Summary?.Title}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {Summary?.Category}
            </div>
            {Summary?.Price && (
              <div className="text-sm text-green-600 font-semibold">
                {Summary?.Price} DA
              </div>
            )}
            <div className="text-xs text-gray-500">
              Created at: {dayjs(Summary?.createdAt).format("DD MMMM YYYY")}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center">
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
          <div>{Summary?.Students_count || 0} Enrolment</div>
          <div>{Summary?.Pages_Count || 0} Pages</div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <Link
          to={`/Student/Summaries/${Summary?.id}`}
          className="bg-purple-600 text-center px-4 py-2 rounded-md cursor-pointer text-white font-semibold transition-colors duration-300 hover:bg-purple-700"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default Student_Summaries_Card;
