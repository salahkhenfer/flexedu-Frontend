import React from "react";
import { useAppContext } from "../../../AppContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Teacher_Profile() {
    const { user } = useAppContext();
    useEffect(() => {
        console.log(user);
    }, [user]);
    return (
        <div>
            <div>Teacher Page</div>
            {/* <div>{user}</div>
            {console.log(user)} */}
        </div>
    );
}

export default Teacher_Profile;
