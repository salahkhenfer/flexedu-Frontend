import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAppContext } from "../../AppContext";
import axios from "axios";
import { Outlet } from "react-router";
import NavBar from "./NavBar/NavBar";

import Logo from "../../../public/Logo.png";

function Teacher() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isProfileCompleted, setisProfileCompleted] = useState(false);
    const {
        userId,
        userType,
        isAuth,
        set_user,
        user,
        set_Profile_Completed,
        show_Alert_completeProfile,
        set_show_Alert_completeProfile,
        set_Notifications,
    } = useAppContext();

    useEffect(() => {
        if (!isAuth || !userId) {
            // window.location.href = "/Login";
            Navigate("/");
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Teachers/${userId}/Profile`,
                    {
                        withCredentials: true,
                        // validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    set_user(response.data.User);
                } else {
                    set_Auth(false);
                    // window.location.href = "/Login";
                    Navigate("/Login");
                }
            } catch (error) {
                set_Auth(false);
                // window.location.href = "/Login";
                Navigate("/Login");
            }
        };
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Teachers/${userId}/Notifications`,
                    {
                        withCredentials: true,
                        // validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    set_Notifications(response.data.Notifications);
                } else {
                    set_Notifications([]);
                }
            } catch (error) {
                set_Notifications([]);
            }
        };
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [Logo];
                let loadedCount = 0;
                if (images.length === 0) resolve();
                images.forEach((imageSrc) => {
                    const img = new Image();
                    img.onload = () => {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            resolve();
                        }
                    };
                    img.onerror = () => {
                        resolve();
                    };
                    img.src = imageSrc;
                });
            });
        };
        // Promise.all([fetchData()]);
        Promise.all([fetch_images(), fetchData(), fetchNotifications()])
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!user) return;
        else if (
            !user?.firstName ||
            !user?.lastName ||
            !user?.email ||
            !user?.telephone ||
            !user?.nationalCardNumber ||
            !user?.company_Name ||
            !user?.company_WorkField
            // ||
            // !user?.profile_pic_link
        ) {
            // if (isProfileIncomplete(user)) {
            setisProfileCompleted(false);
            set_Profile_Completed(false);
            set_show_Alert_completeProfile(true);
        } else {
            setisProfileCompleted(true);
            set_Profile_Completed(true);
            set_show_Alert_completeProfile(false);
        }
    }, [user]);
    if (loading)
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                <img src={Logo} alt="Logo" />
                <span className="loader"></span>
            </div>
        );
    else
        return (
            <div className="relative h-screen overflow-y-auto custom-overflow overflow-x-hidden ">
                <NavBar isProfileCompleted={isProfileCompleted} />
                <div className=" pt-[60px]">
                    <Outlet />
                </div>
            </div>
        );
}

export default Teacher;
