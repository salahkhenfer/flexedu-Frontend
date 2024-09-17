import React, { useEffect } from "react";
import { useAppContext } from "../../../AppContext";

function Student_Profile() {
    const { user } = useAppContext();

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className=" p-6">
            <h1>Student Profile</h1>
            {user ? (
                <div>
                    <p>
                        <strong>ID:</strong> {user.id}
                    </p>
                    <p>
                        <strong>First Name:</strong> {user.firstName}
                    </p>
                    <p>
                        <strong>Last Name:</strong> {user.lastName}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Telephone:</strong> {user.telephone || "N/A"}
                    </p>
                    <p>
                        <strong>Instagram:</strong>{" "}
                        {user.instgram_Link || "N/A"}
                    </p>
                    <p>
                        <strong>LinkedIn:</strong> {user.linkedIn_Link || "N/A"}
                    </p>
                    <p>
                        <strong>Facebook:</strong> {user.facebook_Link || "N/A"}
                    </p>
                    <p>
                        <strong>Profile Picture:</strong>{" "}
                        {user.profile_pic_link ? (
                            <img src={user.profile_pic_link} alt="Profile" />
                        ) : (
                            "N/A"
                        )}
                    </p>
                    <p>
                        <strong>Rate:</strong> {user.Rate}
                    </p>
                    <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(user.createdAt).toLocaleString()}
                    </p>
                    <p>
                        <strong>Updated At:</strong>{" "}
                        {new Date(user.updatedAt).toLocaleString()}
                    </p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Student_Profile;
