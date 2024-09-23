import React, { useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../../AppContext";
import { useNavigate, Link } from "react-router-dom";
function Upload_Video() {
    const { user } = useAppContext();

    const [videoFile, setVideoFile] = useState(null); // Store the selected file
    const [dragging, setDragging] = useState(false); // Track drag status
    const fileInputRef = useRef(null); // Ref to access file input
    const [progress, setProgress] = useState(0); // Track progress
    const [Title, setTitle] = useState("");
    const [videoDuration, setVideoDuration] = useState(null); // Track video duration
    const [isUploading, setIsUploading] = useState(false); // Track if the upload is in progress
    const location = useLocation();
    const CourseId = location.pathname.split("/")[3];

    // Function to format seconds to HH:MM:SS
    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h > 0 ? h + ":" : ""}${m > 9 ? m : "0" + m}:${
            s > 9 ? s : "0" + s
        }`;
    };

    // Handle file selection
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("video/")) {
            setVideoFile(file);

            // Create a temporary URL and load it into a hidden video element to extract duration
            const videoURL = URL.createObjectURL(file);
            const video = document.createElement("video");
            video.src = videoURL;
            video.onloadedmetadata = () => {
                const duration = formatDuration(video.duration);
                setVideoDuration(duration); // Set the formatted duration
                URL.revokeObjectURL(videoURL); // Clean up URL after loading metadata
            };
        } else {
            alert("Please upload a valid video file.");
        }
    };

    // Handle drag-and-drop functionality
    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith("video/")) {
            setVideoFile(file);
            // Extract video duration
            const videoURL = URL.createObjectURL(file);
            const video = document.createElement("video");
            video.src = videoURL;
            video.onloadedmetadata = () => {
                const duration = formatDuration(video.duration);
                setVideoDuration(duration); // Set the formatted duration
                URL.revokeObjectURL(videoURL); // Clean up URL after loading metadata
            };
        } else {
            alert("Please upload a valid video file.");
        }
    };

    // Upload video
    const handleUpload = () => {
        if (videoFile) {
            setIsUploading(true); // Disable buttons during upload
            const formData = new FormData();
            formData.append("CourseVedio", videoFile);
            formData.append("Title", Title);
            formData.append("Duration", videoDuration); // Send formatted duration

            axios
                .post(
                    `http://localhost:3000/upload/Courses/${CourseId}/Vedio`,
                    formData,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            );
                            setProgress(percentCompleted);
                        },
                    }
                )
                .then((response) => {
                    alert(`Upload Success: ${response.data.message}`);
                    setProgress(0); // Reset progress after successful upload
                    setVideoFile(null); // Clear file after success
                    setIsUploading(false); // Re-enable buttons
                })
                .catch((error) => {
                    console.error("Upload Error:", error);
                    alert("Upload failed. Please try again.");
                    setIsUploading(false); // Re-enable buttons even on failure
                });
        } else {
            alert("Please select a video to upload.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-6 max-w-[90vw] m-auto">
            <Link
                to={`/Teacher/Courses/${CourseId}`}
                className=" text-green-600 pb-6 underline"
            >
                Go back
            </Link>
            {/* Drag-and-drop area */}
            <div
                className={`w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center mb-4 ${
                    dragging ? "border-blue-500 bg-blue-100" : "border-gray-400"
                }`}
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()} // Trigger file input on click
            >
                {videoFile ? (
                    <div className="text-center">
                        <p className="font-bold text-lg">{videoFile.name}</p>
                        <p className="text-sm text-gray-600">
                            {Math.round(videoFile.size / 1024 / 1024)} MB
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-500">
                        Drag & Drop a video file here, or click to select one
                    </p>
                )}
            </div>

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleFileSelect}
            />

            {/* Video info & control buttons */}
            {videoFile && (
                <div className="flex flex-col items-center w-full">
                    <input
                        type="text"
                        placeholder="Enter Video Title"
                        className="w-[60%] p-2 border border-gray-400 rounded-md mb-2"
                        value={Title}
                        onChange={(e) => {
                            const input = e.target.value;
                            if (input.length <= 50) {
                                setTitle(input); // Only set the title if the length is valid
                            }
                        }}
                        disabled={isUploading} // Disable input while uploading
                    />

                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md mb-2"
                        onClick={() => setVideoFile(null)}
                        disabled={isUploading} // Disable "Remove" button during upload
                    >
                        Remove File
                    </button>

                    <button
                        className={`${
                            isUploading ? "bg-gray-400" : "bg-green-500"
                        } text-white px-4 py-2 rounded-md`}
                        onClick={() => {
                            setProgress(0); // Reset progress
                            if (!Title)
                                alert("Please enter a title for the video");
                            else if (Title.length < 5 || Title.length > 50)
                                alert(
                                    "Title must be between 5 and 50 characters"
                                );
                            else if (!videoFile)
                                alert("Please select a video file");
                            else if (videoFile && Title) handleUpload();
                        }}
                        disabled={isUploading} // Disable "Upload" button during upload
                    >
                        {isUploading ? "Uploading..." : "Upload Video"}
                    </button>

                    {/* Progress bar */}
                    <div className="w-[60%] m-auto bg-gray-200 rounded-full h-4 mt-4">
                        <div
                            className="bg-blue-500 h-4 rounded-full"
                            style={{ width: `${progress}%` }} // Update progress width
                        ></div>
                    </div>
                    <p className="mt-2 text-gray-700">{progress}%</p>
                </div>
            )}
        </div>
    );
}

export default Upload_Video;
