import React from "react";
import CourseCard from "./CourseCard";
import { courses } from "../data/courses";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Courses = () => {
    return (
        <section className="w-full bg-white py-24 p-4">
            <div className="md:max-w-[1100px] m-auto max-w-[400px]">
                <h1 className="py-4 text-3xl font-bold">
                    Most Popular <span className="text-[#20B486]">Courses</span>
                </h1>
                <p className="text-[#6D737A] py-3">
                    Various versions have evolved over the years, sometimes by
                    accident.
                </p>
            </div>

            <div className="md:max-w-[1100px] m-auto max-w-[400px] gap-5">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        500: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        300: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    className="px-5"
                >
                    {courses &&
                        courses.map((course) => (
                            <SwiperSlide key={course?.id}>
                                <Link to={`/CourseDetails`}>
                                    <CourseCard
                                        title={course?.title}
                                        category={course?.category}
                                        rating={course?.rating}
                                        price={course?.price}
                                        linkImg={course?.linkImg}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Courses;
