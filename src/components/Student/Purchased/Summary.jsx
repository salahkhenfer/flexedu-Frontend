import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import VideoComponent from "./Vedio_Component";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";
import PDFReader from "./Summary/PdfReader";
function SummaryComponent() {
    const { user } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    const summaryId = location.pathname.split("/")[4]; // Get summary ID from URL
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const vedioId = new URLSearchParams(location.search).get("video");
    const [activeVideoIndex, setActiveVideoIndex] = useState(0); // Handle active video state

    // Fetch summary data
    useEffect(() => {
        const fetchSummaryData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Students/${user.id}/Purchased/Summaries/${summaryId}`,
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    setSummaryData(response.data);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                } else {
                    setError(response.data);
                }
                setLoading(false);
            } catch (error) {
                setError("Failed to load summary data");
                setLoading(false);
            }
        };
        fetchSummaryData();
    }, [summaryId, user.id]);

    // Update the active video index when vedioId changes
    useEffect(() => {
        if (vedioId && summaryData?.Summary?.Summary_Videos) {
            const videoIndex = summaryData.Summary.Summary_Videos.findIndex(
                (video) => video.id === parseInt(vedioId)
            );
            if (videoIndex !== -1) {
                setActiveVideoIndex(videoIndex);
            }
        }
    }, [vedioId, summaryData]);

    if (loading) {
        return (
            <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message || error}
                </div>
            </div>
        );
    }

    if (summaryData?.paymentStatus !== "accepted") {
        return (
            <div className="w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    You are not enrolled in this summary
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <div className="flex-1">
                {summaryData?.Summary?.file_link ? (
                    <PDFReader
                        fileLink={`http://localhost:3000/${summaryData?.Summary?.file_link}`}
                    />
                ) : (
                    <div>No file uploaded</div>
                )}

                <div className="p-4">
                    <h1 className="text-2xl font-bold">
                        {summaryData?.Summary?.Title}
                    </h1>
                    <p className="text-gray-600">
                        {summaryData?.Summary?.Description}
                    </p>
                    <p className="mt-2">
                        <strong>Category:</strong>{" "}
                        {summaryData?.Summary?.Category}
                    </p>
                    <p>
                        <strong>Price:</strong> {summaryData?.Summary?.Price} DA
                    </p>
                    <p>
                        <strong>Rating:</strong> {summaryData?.Summary?.Rate}{" "}
                        stars
                    </p>
                    <p>
                        <strong>Number of students:</strong>{" "}
                        {summaryData?.Summary?.Students_count}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SummaryComponent;
