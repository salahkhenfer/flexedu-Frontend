import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext";
import Swal from "sweetalert2";
import Axios from "axios";

function Edit_Profile() {
    const { user } = useAppContext();

    return (
        <div className="w-full h-screen bg-white flex flex-col items-center pt-12">
            <div className="text-black_text">
                <div className="text-3xl font-semibold">Edit Profile</div>

                <div>
                    <Formik
                        initialValues={{
                            firstname: user?.firstName || "",
                            lastName: user?.lastName || "",
                            email: user?.email || "",
                            telephone: user?.telephone || "",
                            instgram_Link: user?.instgram_Link || "",
                            linkedIn_Link: user?.linkedIn_Link || "",
                            facebook_Link: user?.facebook_Link || "",
                            // password: user?.password || "",
                            TeacherId: user?.id,
                        }}
                        validate={(values) => {
                            const errors = {};

                            if (!values.firstname) {
                                errors.firstname = "firstname is Required";
                            } else if (values.firstname.length < 3)
                                errors.firstname = "At least 3 chars";
                            else if (values.firstname.length > 30)
                                errors.firstname = "At most 30 chars";

                            if (!values.lastName) {
                                errors.lastName = "lastName is Required";
                            } else if (values.lastName.length < 3)
                                errors.lastName = "At least 3 chars";
                            else if (values.lastName.length > 30)
                                errors.lastName = "At most 30 chars";

                            if (!values.email) {
                                errors.email = "email is Required";
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    values.email
                                )
                            ) {
                                errors.email = "Invalid email Editress";
                            }

                            // if (!values.password) {
                            //     errors.password = "password is Required";
                            // } else if (values.password.length < 8) {
                            //     errors.password =
                            //         "password must be at least 8 characters long";
                            // }
                            if (
                                (values.telephone &&
                                    values.telephone.length < 6) ||
                                isNaN(values.telephone) ||
                                values.telephone.length > 11
                            ) {
                                errors.telephone = "Invalid phone number";
                            }
                            if (
                                values.instgram_Link &&
                                !/^(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9_.]+\/?$/.test(
                                    values.instgram_Link.length
                                )
                            ) {
                                errors.instgram_Link = "Invalid Instagram Link";
                            }
                            if (
                                values.linkedIn_Link &&
                                !/^(https?:\/\/)?(www\.)?linkedin.com\/[a-zA-Z0-9_.]+\/?$/.test(
                                    values.linkedIn_Link.length
                                )
                            ) {
                                errors.linkedIn_Link = "Invalid LinkedIn Link";
                            }
                            if (
                                values.facebook_Link &&
                                !values.facebook_Link.length.test(
                                    /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9_.]+\/?$/
                                )
                            ) {
                                errors.facebook_Link = "Invalid Facebook Link";
                            }

                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            if (!values.TeacherId) {
                                setSubmitting(false);
                                Swal.fire(
                                    "Error",
                                    "Unauthorized: missing userId",
                                    "error"
                                );
                            } else {
                                try {
                                    let response = await Axios.put(
                                        `http://localhost:3000/Teachers/${values.TeacherId}/Profile`,
                                        values,
                                        {
                                            withCredentials: true,
                                            validateStatus: () => true,
                                        }
                                    );

                                    if (response.status === 200) {
                                        window.location.href =
                                            "/Teacher/Profile";
                                    } else if (response.status === 400) {
                                        setSubmitting(false);
                                        Swal.fire(
                                            "Error",
                                            `${response.data.message}`,
                                            "error"
                                        );
                                    } else if (response.status === 409) {
                                        setSubmitting(false);
                                        Swal.fire(
                                            "Error",
                                            `${response.data.message}`,
                                            "error"
                                        );
                                    } else if (response.status === 500) {
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
                                            `Something Went Wrong, please try again later, ${response.data.message}`,
                                            "error"
                                        );
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
                                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full pb-6">
                                    <div className="w-full md:w-[50%] relative">
                                        <div className="font-semibold text-sm pb-1">
                                            First Name
                                        </div>
                                        <Field
                                            placeholder="firstname"
                                            type="text"
                                            name="firstname"
                                            disabled={isSubmitting}
                                            className="w-full border border-gray_white px-4 py-2 rounded-lg text-sm"
                                        />
                                        <ErrorMessage
                                            name="firstname"
                                            component="div"
                                            style={names_errorInputMessage}
                                        />
                                    </div>
                                    <div className="w-full md:w-[50%] relative">
                                        <div className="font-semibold text-sm pb-1">
                                            Last Name
                                        </div>
                                        <Field
                                            placeholder="lastName"
                                            type="text"
                                            name="lastName"
                                            disabled={isSubmitting}
                                            className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                        />
                                        <ErrorMessage
                                            name="lastName"
                                            component="div"
                                            style={names_errorInputMessage}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="font-semibold text-sm pb-1">
                                        Email
                                    </div>
                                    <Field
                                        placeholder="Email"
                                        type="text"
                                        name="email"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm pb-1">
                                        Telephone
                                        <div>
                                            <Field
                                                placeholder="telephone"
                                                type="number"
                                                name="telephone"
                                                disabled={isSubmitting}
                                                className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                            />
                                            <ErrorMessage
                                                name="telephone"
                                                component="div"
                                                style={errorInputMessage}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-semibold text-sm pb-1">
                                        Instagram Link
                                    </div>
                                    <Field
                                        placeholder="Instagram Link"
                                        type="text"
                                        name="instgram_Link"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                    />
                                    <ErrorMessage
                                        name="instgram_Link"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm pb-1">
                                        LinkedIn Link
                                    </div>
                                    <Field
                                        placeholder="LinkedIn Link"
                                        type="text"
                                        name="linkedIn_Link"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                    />
                                    <ErrorMessage
                                        name="linkedIn_Link"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm pb-1">
                                        Facebook Link
                                    </div>
                                    <Field
                                        placeholder="Facebook Link"
                                        type="text"
                                        name="facebook_Link"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                    />
                                    <ErrorMessage
                                        name="facebook_Link"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>

                                {/* <div>
                                    <div className="font-semibold text-sm pb-1">
                                        password
                                    </div>
                                    <Field
                                        placeholder="*********"
                                        type="text"
                                        name="password"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div> */}

                                {isSubmitting ? (
                                    <span className="small-loader my-5 m-auto"></span>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-perpol_v py-2 mt-4 rounded-2xl text-white font-semibold"
                                        disabled={isSubmitting}
                                    >
                                        Edit Profile
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

export default Edit_Profile;
