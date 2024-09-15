import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "./AppContext";

function Default() {
    const { isAuth, userType, userId } = useAppContext();
    const Navigate = useNavigate();
    useEffect(() => {
        if (!isAuth || !userType) Navigate("/Home");
        else if (isAuth && userType == "teacher") {
            // Navigate(`/Teacher/${userId}`);
            Navigate(`/Teacher`);
        } else if (isAuth && userType == "student") {
            // Navigate(`/Student/${userId}`);
            Navigate(`/Student`);
        } else Navigate("/Home");
    }, []);
}
export default Default;
