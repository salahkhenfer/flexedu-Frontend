import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../AppContext";
import Swal from "sweetalert2";
import add_course from "./Api/add_course";
function Add_Course() {
    const { user } = useAppContext();
    return (
        <div className="md:w-1/2 w-full h-screen  py-12 bg-white flex flex-col items-center justify-center ">
            <div className=" w-[80%] text-black_text">
                <div className=" pb-4 pt-24 md:pt-0 ">
                    <div className=" text-3xl font-semibold ">
                        Create an account
                    </div>
                    <div>Let’s get started your freelance journey.</div>
                </div>

                <div>
                    <Formik
                        initialValues={{
                            Title: "",
                            Description: "",
                            Price: "",
                            Category: "",
                            TeacherId: user.id,
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
                            else if (typeof values.Price !== "number")
                                errors.Price = "Price must be a number";
                            if (!values.Category) {
                                errors.Category = "Category is Required";
                            }

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            // console.log(values);
                            // setSubmitting(false);
                            if (!values.TeacherId) {
                                setSubmitting(false);
                                Swal.fire(
                                    "Error",
                                    "Unauthorized: missing userId",
                                    "error"
                                );
                            } else add_course(values, { setSubmitting });
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

                                {isSubmitting ? (
                                    <span className="small-loader my-5  w-full m-auto"></span>
                                ) : (
                                    <button
                                        type="submit"
                                        className=" bg-perpol_v py-2 mt-4 rounded-2xl text-white font-semibold "
                                        disabled={isSubmitting}
                                    >
                                        Get Started
                                    </button>
                                )}
                            </Form>
                        )}
                    </Formik>
                    <div className="pt-6 text-sm font-semibold text-gray_v text-center">
                        Already have an account?{" "}
                        <Link
                            to={"/Login"}
                            className=" underline text-perpol_v"
                        >
                            Sign in
                        </Link>
                    </div>
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
export default Add_Course;
