import React from "react";
import { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext";
import Swal from "sweetalert2";
import add_Summary from "./Api/add_Summary";
import Upload_Sumarry from "./Upload_Sumarry";
import Axios from "axios";
import axios from "axios";
import { PDFDocument } from "pdf-lib"; // A library to handle PDFs
function Add_Summary() {
    const { user } = useAppContext();
    const [summaryFile, setSummaryFile] = useState(null); // Store the selected file
    const [dragging, setDragging] = useState(false); // Track drag status
    const fileInputRef = useRef(null); // Ref to access file input
    const [progress, setProgress] = useState(0); // Track progress
    // const [Title, setTitle] = useState("");
    const [summaryPages, setSummaryPages] = useState(0); // Track the page count
    const [isUploading, setIsUploading] = useState(false); // Track if the upload is in progress
    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSummaryFile(file);
            await extractPagesFromPDF(file); // Extract page count
        } else {
            Swal.fire(
                "Invalid File",
                "Please upload a valid PDF file.",
                "error"
            );
        }
    };

    // Handle drag-and-drop functionality
    const handleDrop = async (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file && file.type === "application/pdf") {
            setSummaryFile(file);
            await extractPagesFromPDF(file); // Extract page count
        } else {
            Swal.fire(
                "Invalid File",
                "Please upload a valid PDF file.",
                "error"
            );
        }
    };

    // Extract page count from the uploaded PDF
    const extractPagesFromPDF = async (file) => {
        try {
            const fileReader = new FileReader();
            fileReader.onload = async (e) => {
                const pdfBytes = e.target.result;
                const pdfDoc = await PDFDocument.load(pdfBytes);
                const pagesCount = pdfDoc.getPageCount();
                setSummaryPages(pagesCount);
            };
            fileReader.readAsArrayBuffer(file);
        } catch (error) {
            console.error("Failed to extract PDF page count", error);
            Swal.fire(
                "Error",
                "Could not extract page count from the PDF.",
                "error"
            );
        }
    };

    // Upload summary
    // const handleUpload = () => {
    //     if (summaryFile) {
    //         setIsUploading(true); // Disable buttons during upload
    //         const formData = new FormData();
    //         formData.append("Summary", summaryFile);
    //         formData.append("Title", Title);
    //         formData.append("Pages_Count", summaryPages); // Send page count
    //         formData.append("TeacherId", user?.id);

    //         axios
    //             .post(`http://localhost:3000/upload/Summaries/`, formData, {
    //                 withCredentials: true,
    //                 validateStatus: () => true,
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //                 onUploadProgress: (progressEvent) => {
    //                     const percentCompleted = Math.round(
    //                         (progressEvent.loaded * 100) / progressEvent.total
    //                     );
    //                     setProgress(percentCompleted);
    //                 },
    //             })
    //             .then((response) => {
    //                 Swal.fire(
    //                     "Success",
    //                     `Upload Success: ${response.data.message}`,
    //                     "success"
    //                 );
    //                 setProgress(0); // Reset progress after successful upload
    //                 setSummaryFile(null); // Clear file after success
    //                 setIsUploading(false); // Re-enable buttons
    //             })
    //             .catch((error) => {
    //                 console.error("Upload Error:", error);
    //                 Swal.fire(
    //                     "Error",
    //                     "Upload failed. Please try again.",
    //                     "error"
    //                 );
    //                 setIsUploading(false); // Re-enable buttons even on failure
    //             });
    //     } else {
    //         Swal.fire("No File", "Please select a summary to upload.", "error");
    //     }
    // };
    return (
        <div className=" w-full h-screen   bg-white flex flex-col items-center pt-12 ">
            <div className=" text-black_text">
                <div className="   ">
                    <div className=" text-3xl font-semibold ">Add Summary</div>
                </div>

                <div>
                    <Formik
                        initialValues={{
                            Title: "",
                            Description: "",
                            Price: 0,
                            Category: "",
                            TeacherId: user?.id,
                        }}
                        validate={(values) => {
                            const errors = {};

                            if (!values.Title) {
                                errors.Title = "First Name is Required";
                            } else if (values.Title.length < 3)
                                errors.Title = " At least 3 chars";
                            else if (values.Title.length > 30)
                                errors.Title = " At most 30 chars";
                            if (!values.Description) {
                                errors.Description = "Last Name is Required";
                            } else if (values.Description.length < 3)
                                errors.Description = " At least 3 chars";
                            else if (values.Description.length > 30)
                                errors.Description = " At most 30 chars";
                            if (!values.Price) {
                                errors.Price = "Price is Required";
                            } else if (values.Price < 0)
                                errors.Price = "Price must be positive";
                            else if (isNaN(values.Price))
                                errors.Price = "Price must be a number";
                            if (!values.Category) {
                                errors.Category = "Category is Required";
                            }

                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            // setSubmitting(false);
                            if (!values.TeacherId) {
                                setSubmitting(false);
                                Swal.fire(
                                    "Error",
                                    "Unauthorized: missing userId",
                                    "error"
                                );
                            } else {
                                try {
                                    // add_Summary(values, { setSubmitting });
                                    if (summaryFile) {
                                        setIsUploading(true); // Disable buttons during upload
                                        const formData = new FormData();
                                        formData.append("Resume", summaryFile);
                                        formData.append("Title", values.Title);
                                        formData.append(
                                            "Description",
                                            values.Description
                                        );
                                        formData.append("Price", values.Price);
                                        formData.append(
                                            "Category",
                                            values.Category
                                        );
                                        formData.append(
                                            "Pages_Count",
                                            summaryPages
                                        ); // Send page count
                                        formData.append("TeacherId", user?.id);

                                        axios
                                            .post(
                                                `http://localhost:3000/upload/Summaries/`,
                                                formData,
                                                {
                                                    withCredentials: true,
                                                    validateStatus: () => true,
                                                    headers: {
                                                        "Content-Type":
                                                            "multipart/form-data",
                                                    },
                                                    onUploadProgress: (
                                                        progressEvent
                                                    ) => {
                                                        const percentCompleted =
                                                            Math.round(
                                                                (progressEvent.loaded *
                                                                    100) /
                                                                    progressEvent.total
                                                            );
                                                        setProgress(
                                                            percentCompleted
                                                        );
                                                    },
                                                }
                                            )
                                            .then((response) => {
                                                if (response.status == 200) {
                                                    Swal.fire(
                                                        "Success",
                                                        `Upload Success: ${response.data.message}`,
                                                        "success"
                                                    );
                                                    setProgress(0); // Reset progress after successful upload
                                                    setSummaryFile(null); // Clear file after success
                                                    setIsUploading(false); // Re-enable buttons
                                                    window.location.href =
                                                        "/Teacher/Summaries";
                                                } else if (
                                                    response.status == 401
                                                ) {
                                                    setSubmitting(false);
                                                    Swal.fire(
                                                        "Error!",
                                                        `${response.data.message} `,
                                                        "error"
                                                    );
                                                } else {
                                                    setSubmitting(false);
                                                    Swal.fire(
                                                        "Error",
                                                        `${response.data.message} `,
                                                        "error"
                                                    );
                                                }
                                            })
                                            .catch((error) => {
                                                console.error(
                                                    "Upload Error:",
                                                    error
                                                );
                                                Swal.fire(
                                                    "Error",
                                                    "Upload failed. Please try again.",
                                                    "error"
                                                );
                                                setIsUploading(false); // Re-enable buttons even on failure
                                            });
                                    } else {
                                        Swal.fire(
                                            "No File",
                                            "Please select a summary to upload.",
                                            "error"
                                        );
                                    }
                                } catch (error) {
                                    setSubmitting(false);

                                    Swal.fire(
                                        "Error!",
                                        `Something Went Wrong ,please trye again latter`,
                                        "error"
                                    );
                                }
                            }
                        }}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="  flex flex-col text-sm md:text-lg  gap-4 text-black_text">
                                <div className=" flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full pb-6 ">
                                    <div className="w-full  md:w-[50%]  relative">
                                        <div className="  font-semibold text-sm pb-1">
                                            Title
                                        </div>
                                        <Field
                                            placeholder="Title"
                                            type="text"
                                            name="Title"
                                            disabled={isSubmitting}
                                            className="w-full border border-gray_white px-4 py-2 rounded-lg  text-sm "
                                        />
                                        <ErrorMessage
                                            name="Title"
                                            component="div"
                                            style={names_errorInputMessage}
                                        />
                                    </div>
                                    <div className="  w-full  md:w-[50%] relative">
                                        <div className="font-semibold text-sm pb-1">
                                            Describtion
                                        </div>
                                        <Field
                                            placeholder="Describtion"
                                            type="text"
                                            name="Description"
                                            disabled={isSubmitting}
                                            className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                        />
                                        <ErrorMessage
                                            name="Description"
                                            component="div"
                                            style={names_errorInputMessage}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className=" font-semibold text-sm pb-1">
                                        Price{" "}
                                    </div>
                                    <Field
                                        placeholder="example@gmail.com"
                                        type="Price"
                                        name="Price"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="Price"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div>
                                    <div className=" font-semibold text-sm pb-1">
                                        Category{" "}
                                    </div>
                                    <div className=" flex items-center">
                                        <Field
                                            placeholder="Category"
                                            type="text"
                                            name="Category"
                                            disabled={isSubmitting}
                                            className="border border-gray_white px-4 py-2  rounded-lg text-sm  w-full"
                                        />
                                    </div>

                                    <ErrorMessage
                                        name="Category"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>

                                <div className="flex flex-col items-center justify-center mt-6 max-w-[90vw] m-auto">
                                    {/* Drag-and-drop area */}
                                    <div
                                        className={`w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center mb-4 ${
                                            dragging
                                                ? "border-blue-500 bg-blue-100"
                                                : "border-gray-400"
                                        }`}
                                        onDragOver={(event) =>
                                            event.preventDefault()
                                        }
                                        onDrop={handleDrop}
                                        onClick={() =>
                                            fileInputRef.current.click()
                                        } // Trigger file input on click
                                    >
                                        {summaryFile ? (
                                            <div className="text-center">
                                                <p className="font-bold text-lg">
                                                    {summaryFile.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {Math.round(
                                                        summaryFile.size /
                                                            1024 /
                                                            1024
                                                    )}{" "}
                                                    MB
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Pages: {summaryPages}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">
                                                Drag & Drop a PDF file here, or
                                                click to select one
                                            </p>
                                        )}
                                    </div>

                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="application/pdf"
                                        onChange={handleFileSelect}
                                    />

                                    {/* Summary info & control buttons */}
                                    {summaryFile && (
                                        <div className="flex flex-col items-center w-full">
                                            {/* <input
                                                type="text"
                                                placeholder="Enter Summary Title"
                                                className="w-[60%] p-2 border border-gray-400 rounded-md mb-2"
                                                value={Title}
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                                disabled={isUploading} // Disable input while uploading
                                            /> */}

                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-md mb-2"
                                                onClick={() =>
                                                    setSummaryFile(null)
                                                }
                                                disabled={isUploading} // Disable "Remove" button during upload
                                            >
                                                Remove File
                                            </button>

                                            {/* <button
                                                className={`${
                                                    isUploading
                                                        ? "bg-gray-400"
                                                        : "bg-green-500"
                                                } text-white px-4 py-2 rounded-md`}
                                                onClick={handleUpload}
                                                disabled={isUploading} // Disable "Upload" button during upload
                                            >
                                                {isUploading
                                                    ? "Uploading..."
                                                    : "Upload Summary"}
                                            </button> */}

                                            {/* Progress bar */}
                                            <div className="w-[60%] m-auto bg-gray-200 rounded-full h-4 mt-4">
                                                <div
                                                    className="bg-blue-500 h-4 rounded-full"
                                                    style={{
                                                        width: `${progress}%`,
                                                    }} // Update progress width
                                                ></div>
                                            </div>
                                            <p className="mt-2 text-gray-700">
                                                {progress}%
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {isSubmitting ? (
                                    <span className="small-loader my-5   m-auto"></span>
                                ) : (
                                    <button
                                        type="submit"
                                        className=" bg-perpol_v py-2 mt-4 rounded-2xl text-white font-semibold "
                                        disabled={isSubmitting}
                                    >
                                        Add Summary
                                    </button>
                                )}
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
export default Add_Summary;
