import React, { useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
function Upload_Video() {
    const [videoFile, setVideoFile] = useState(null); // Store the selected file
    const [dragging, setDragging] = useState(false); // Track drag status
    const fileInputRef = useRef(null); // Ref to access file input
    const [progress, setProgress] = useState(0); // Track progress
    const location = useLocation();
    const CourseId = location.pathname.split("/")[3];
    // Handle file selection
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("video/")) {
            setVideoFile(file);
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
        } else {
            alert("Please upload a valid video file.");
        }
    };

    // Upload video
    const handleUpload = () => {
        if (videoFile) {
            const formData = new FormData();
            formData.append("CourseVedio", videoFile);

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
                })
                .catch((error) => {
                    console.error("Upload Error:", error);
                    alert("Upload failed. Please try again.");
                });
        } else {
            alert("Please select a video to upload.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
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
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md mb-2"
                        onClick={() => setVideoFile(null)}
                    >
                        Remove File
                    </button>

                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                        onClick={handleUpload}
                    >
                        Upload Video
                    </button>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
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
