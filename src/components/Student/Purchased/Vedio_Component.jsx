import React from "react";
import { useEffect } from "react";
function Vedio_Component({ videoData }) {
  const handleVideoError = () => {
    // alert("Video source is unavailable. Please try again later.");
  };
  useEffect(() => {
    console.log("ved", videoData);
  }, [videoData]);
  if (!videoData) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="text-gray-600 font-semibold">
          No video data available
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:h-[80vh] bg-black">
      <video
        className="w-full h-full object-cover"
        controls
        onError={handleVideoError}
      >
        <source
          src={`http://localhost:3000/${videoData.Video}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Vedio_Component;
