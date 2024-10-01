import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import axios from "axios";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import { IoAdd } from "react-icons/io5";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CiImageOn } from "react-icons/ci";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useAppContext } from "../../../../AppContext";
import config from "../../../../config";
import { FaRegImage } from "react-icons/fa";
dayjs.extend(customParseFormat);
import Axios from "axios";
function Not_pending_view({ summary, Purcase, setPayment_Status }) {
    const { user } = useAppContext();
    const Navigate = useNavigate();
    const location = useLocation();
    const SummaryId = location.pathname.split("/")[3];
    const PAYMENT_EMAIL = config.PAYMENT_EMAIL;
    const PAYMENT_CCP = config.PAYMENT_CCP;
    const PAYMENT_CCP_NAME = config.PAYMENT_CCP_NAME;
    const PAYMENT_EMAIL_TITLE = config.PAYMENT_EMAIL_TITLE;
    const PAYMENT_CCP_CLE = config.PAYMENT_CCP_CLE;
    const fileInputRef = useRef(null);
    const [imageChanged, setimageChanged] = useState(false);
    const [image_state, setimage_state] = useState(null);
    const queryParams = new URLSearchParams(location.search);
    const rejected = queryParams.get("rejected"); // This will get the value of 'rejected'
    useEffect(() => {
        if (image_state) setimageChanged(true);
        else if (!image_state) setimageChanged(false);
        else setimageChanged(false);
    }, [image_state]);
    return (
        <div>
            <div className=" ">
                <div
                    key={summary?.id}
                    className="flex items-center justify-between  border  rounded-md p-4 my-4 "
                >
                    <div className=" flex flex-col gap-2 ">
                        <div className=" flex gap-2">
                            {summary?.Image ? (
                                <img
                                    className="w-[120px] h-[120px] object-cover"
                                    src={`http://localhost:3000/${summary?.Image}`}
                                    alt="summary image"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-[120px] h-[120px] bg-gray-100 ">
                                    <CiImageOn className=" text-xl" />
                                </div>
                            )}
                            <div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-sm  mb-6 font-semibold text-white">
                                        <div className=" text-gray_v text-lg">
                                            {summary?.Title}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray_v font-semibold">
                                        {summary?.Category}
                                    </div>
                                </div>
                                <div>
                                    {summary?.Price ? (
                                        <div className="text-sm text-gray_v font-semibold">
                                            {summary?.Price} {" DA"}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex items-center justify-between w-full font-semibold">
                                    <div className="text-sm pt-1 text-gray_v">
                                        Created at :{" "}
                                        {/* {new Date(
                                                    summary?.createdAt
                                                ).toLocaleDateString()} */}
                                        {dayjs(summary?.createdAt).format(
                                            "DD MMMM YYYY"
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" flex justify-start gap-6 font-semibold text-sm text-gray_v pt-6">
                            <div className="flex gap-4 w-full">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) =>
                                        index <
                                        Math.floor(summary?.Rate || 0) ? (
                                            <FaStar
                                                key={index}
                                                className="text-yellow-400"
                                            />
                                        ) : index <
                                          Math.ceil(summary?.Rate || 0) ? (
                                            <FaStarHalf
                                                key={index}
                                                className="text-yellow-400"
                                            />
                                        ) : (
                                            <FaStar
                                                key={index}
                                                className="text-gray-400"
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            <div className=" shrink-0">
                                {summary?.Students_count ? (
                                    <div>
                                        {" "}
                                        {summary?.Students_count} Enrolment
                                    </div>
                                ) : (
                                    <div>0 Enrolment</div>
                                )}
                            </div>
                            <div className=" shrink-0">
                                {summary?.Summary_Video ? (
                                    <div>
                                        {" "}
                                        {summary?.Summary_Video.length} Vedios
                                    </div>
                                ) : (
                                    <div>No Vedios in this summary</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {rejected ? (
                    <div className=" text-center border text-red-500 border-red-200 mb-6 m-auto rounded shadow-sm p-4 w-fit">
                        <div className="flex items-center justify-center gap-2 text-red-500 text-lg font-semibold">
                            <IoIosWarning className=" text-2xl" />
                            <div>Payment Rejected</div>
                        </div>
                        <div className=" text-sm font-semibold">
                            please resend the Payment screenshot or contact the
                            support.
                        </div>
                    </div>
                ) : null}
            </div>
            <div>
                <div className=" text-4xl font-semibold text-center">
                    Step 1 :
                </div>
                <div className="mb-6 border rounded-md shadow-sm flex flex-col py-6 px-3 w-fit mx-auto ">
                    <div>
                        {" "}
                        Please send the screen shot of the payment via email :{" "}
                    </div>
                    <div>
                        {PAYMENT_EMAIL ? (
                            <div className="flex items-center justify-between">
                                <div className="text-gray_v font-semibold">
                                    Email : {PAYMENT_EMAIL}
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div>
                        {PAYMENT_CCP ? (
                            <div className="flex items-center justify-between">
                                <div className="text-gray_v font-semibold">
                                    CCP : {PAYMENT_CCP}
                                </div>
                            </div>
                        ) : null}
                    </div>{" "}
                    <div>
                        {PAYMENT_CCP_CLE ? (
                            <div className="flex items-center justify-between">
                                <div className="text-gray_v font-semibold">
                                    Clé : {PAYMENT_CCP_CLE}
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div>
                        {PAYMENT_CCP_NAME ? (
                            <div className="flex items-center justify-between">
                                <div className="text-gray_v font-semibold">
                                    CCP Name : {PAYMENT_CCP_NAME}
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div>
                        {PAYMENT_EMAIL_TITLE ? (
                            <div className="flex items-center justify-between">
                                <div className="text-gray_v font-semibold">
                                    use this Title in the email please :{" "}
                                    {PAYMENT_EMAIL_TITLE}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className=" text-4xl font-semibold text-center">
                    Step 2 :
                </div>

                <div>
                    <Formik
                        initialValues={{
                            imageLink: "",
                            studentId: user?.id,
                            summaryId: SummaryId,
                            CCP_number: "",
                        }}
                        validate={(values) => {
                            const errors = {};
                            const ccpNumber = values.CCP_number;

                            if (!ccpNumber) {
                                errors.CCP_number = "Required";
                            } else if (!/^\d+\/\d{2}$/.test(ccpNumber)) {
                                errors.CCP_number =
                                    "CCP number must be in 'xxxxx/xx' format";
                            }

                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            if (!values.studentId || !values.summaryId) {
                                setSubmitting(false);
                                Swal.fire(
                                    "Error",
                                    "Unauthorized: missing userId",
                                    "error"
                                );
                            } else {
                                try {
                                    if (!image_state) {
                                        setSubmitting(false);
                                        Swal.fire(
                                            "Error",
                                            "Please select an image",
                                            "error"
                                        );
                                    } else {
                                        let formData = new FormData();
                                        formData.append("image", image_state);
                                        formData.append(
                                            "CCP_number",
                                            values.CCP_number
                                        );
                                        let Image_Response = await Axios.post(
                                            `http://localhost:3000/upload/Payment/Summaries/${summary.id}/`,
                                            formData,
                                            {
                                                withCredentials: true,
                                                validateStatus: () => true,
                                            }
                                        );

                                        if (Image_Response.status == 401) {
                                            // Swal.fire("Error", `${Image_Response.data.message} `, "error");
                                            window.location.href = "/Login";
                                        }

                                        if (Image_Response.status === 200) {
                                            Swal.fire(
                                                "Success",
                                                "Payment Screen Shot uploaded successfully , ower team is validating your payment , you will get a notification when your payment is validated",
                                                "success"
                                            );
                                            setSubmitting(false);
                                            setPayment_Status(true);
                                            Navigate(
                                                `/Student/Summaries/${summary.id}`
                                            );
                                        } else if (
                                            Image_Response.status === 400
                                        ) {
                                            setSubmitting(false);
                                            Swal.fire(
                                                "Error",
                                                `${Image_Response.data.message}`,
                                                "error"
                                            );
                                        } else if (
                                            Image_Response.status === 409
                                        ) {
                                            setSubmitting(false);
                                            Swal.fire(
                                                "Error",
                                                `${Image_Response.data.message}`,
                                                "error"
                                            );
                                        } else if (
                                            Image_Response.status === 500
                                        ) {
                                            setSubmitting(false);
                                            Swal.fire(
                                                "Error",
                                                "Internal Server Error",
                                                "error"
                                            );
                                        } else {
                                            setSubmitting(false);
                                            Swal.fire(
                                                "Error",
                                                `Something Went Wrong, please try again later, ${Image_Response.data.message}`,
                                                "error"
                                            );
                                        }
                                    }
                                } catch (error) {
                                    setSubmitting(false);
                                    Swal.fire(
                                        "Error",
                                        "Something Went Wrong, please try again later",
                                        "error"
                                    );
                                }
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col text-sm md:text-lg gap-4 text-black_text">
                                <div className=" w-full">
                                    <input
                                        id="image"
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={(event) => {
                                            setimage_state(
                                                event.currentTarget.files[0]
                                            );
                                        }}
                                        ref={fileInputRef}
                                        // disabled={isSubmitting}
                                        className="hidden" // Hide the default file input button
                                    />
                                </div>
                                <div className=" max-w-[400px] mx-auto">
                                    <div className=" font-semibold text-sm pb-1">
                                        your ccp number{" "}
                                    </div>
                                    <Field
                                        placeholder="***********/**"
                                        type="CCP_number"
                                        name="CCP_number"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="CCP_number"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    {image_state ? (
                                        <div className=" relative ">
                                            <img
                                                src={URL.createObjectURL(
                                                    image_state
                                                )} // Create a URL for the selected image
                                                alt="Selected Image"
                                                // ref={fileInputRef}
                                                className=" w-[150px] h-[150px]  object-cover rounded-full"
                                            />
                                            <div
                                                className="  mt-2 text-white w-fit mx-auto rounded-lg px-3 font-semibold text-lg
                                         bg-gray-400 cursor-pointer"
                                                onClick={() => {
                                                    setimage_state(null);
                                                    // setimageChanged(false);
                                                    if (fileInputRef.current) {
                                                        fileInputRef.current.value =
                                                            "";
                                                    }
                                                }}
                                            >
                                                {/* <IoClose /> */}
                                                Cancel
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="w-[150px] h-[150px]  bg-gray_white text-gray rounded-full flex items-center justify-center cursor-pointer"
                                            onClick={() =>
                                                document
                                                    .getElementById("image")
                                                    .click()
                                            }
                                        >
                                            <FaRegImage className=" text-gray_v text-2xl" />
                                        </div>
                                    )}
                                </div>
                                <div className=" w-full flex items-center justify-center mb-6">
                                    {isSubmitting ? (
                                        <span className=" small-loader"></span>
                                    ) : (
                                        <button
                                            type="submit"
                                            className=" mx-auto  bg-green-500 px-3 py-2 text-center rounded-md cursor-pointer
                                                         text-white font-semibold text-base w-fit "
                                            disabled={isSubmitting}
                                        >
                                            upload Payment ScreenShotc
                                        </button>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
const errorInputMessage = {
    fontSize: "12px",
    color: "red",
};

const names_errorInputMessage = {
    position: "absolute",
    bottom: "-22px",
    left: "5px",
    fontSize: "12px",
    color: "red",
};
export default Not_pending_view;
