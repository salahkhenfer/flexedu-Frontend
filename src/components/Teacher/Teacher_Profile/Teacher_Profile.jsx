import React, { useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import { CiImageOn } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function Teacher_Profile() {
    const { user } = useAppContext();

   

    return (
        <div className=" p-6">
            <h1 className="py-3">Teacher Profile</h1>
            <Link
                to={"/Teacher/Profile/Edit"}
                className=" flex items-center w-fit justify-center font-bold p-2 bg-gray-600 text-white cursor-pointer  rounded-lg "
            >
                <MdEdit className="  font-bold text-xl" />
                Edit Profile
            </Link>
            <div className=" py-6">
                {user?.profile_pic_link ? (
                    <img
                        className="w-[200px] h-[200px] object-cover"
                        src={`http://localhost:3000/${user?.profile_pic_link}`}
                        alt="user image"
                    />
                ) : (
                    <div className="flex items-center justify-center w-[200px] h-[200px] bg-gray-100 ">
                        <CiImageOn className=" text-xl" />
                    </div>
                )}
            </div>

            {user ? (
                <div>
                    <p>
                        <strong>ID:</strong> {user?.id}
                    </p>
                    <p>
                        <strong>First Name:</strong> {user?.firstName}
                    </p>
                    <p>
                        <strong>Last Name:</strong> {user?.lastName}
                    </p>
                    <p>
                        <strong>Email:</strong> {user?.email}
                    </p>
                    <p>
                        <strong>Telephone:</strong> {user?.telephone || "N/A"}
                    </p>
                    <p>
                        <strong>Instagram:</strong>{" "}
                        {user?.instgram_Link || "N/A"}
                    </p>
                    <p>
                        <strong>LinkedIn:</strong>{" "}
                        {user?.linkedIn_Link || "N/A"}
                    </p>
                    <p>
                        <strong>Facebook:</strong>{" "}
                        {user?.facebook_Link || "N/A"}
                    </p>
                    <p>
                        <strong>Profile Picture:</strong>{" "}
                        {user?.profile_pic_link ? (
                            <img src={user?.profile_pic_link} alt="Profile" />
                        ) : (
                            "N/A"
                        )}
                    </p>
                    <p>
                        <strong>Rate:</strong> {user?.Rate}
                    </p>
                    <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(user?.createdAt).toLocaleString()}
                    </p>
                    <p>
                        <strong>Updated At:</strong>{" "}
                        {new Date(user?.updatedAt).toLocaleString()}
                    </p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Teacher_Profile;
