import React, { useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import { CiImageOn } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function Student_Profile() {
    const { user } = useAppContext();

    return (
        <div className=" p-6">
            <h1 className="py-3">Student Profile</h1>
            <Link
                to={"/Student/Profile/Edit"}
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

export default Student_Profile;
