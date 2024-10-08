import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAppContext } from "../../../../AppContext";
import Not_pending_view from "./Not_pending_view";
import Pending_View from "./Pending_View";

dayjs.extend(customParseFormat);

function Enrollment() {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [purchase, setPurchase] = useState(null);
  const location = useLocation();
  const courseId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/Students/Courses/${courseId}`,
          {
            withCredentials: true,
            validateStatus: () => true,
          }
        );

        if (response.status === 200) {
          const { Course, isEnrolled, paymentStatus, purcase } = response.data;
          setCourse(Course);
          setIsEnrolled(isEnrolled);
          setPaymentStatus(paymentStatus);
          setPurchase(purcase);
        } else if (response.status === 401) {
          Swal.fire("Error", "You should log in again", "error");
          navigate("/Login");
        } else {
          setError(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate]);

  if (loading) {
    return (
      <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-[calc(100vh-60px)] flex items-center justify-center">
        <div className="text-red-600 font-semibold">{error.message}</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
          <IoIosWarning />
          <h1>Course Not Found</h1>
        </div>
      </div>
    );
  }

  if (isEnrolled) {
    navigate(`/Student/Purchased/Courses/${courseId}`);
    return null;
  }

  if (!paymentStatus || paymentStatus === "rejected") {
    return (
      <Not_pending_view
        course={course}
        Purcase={purchase}
        setPayment_Status={setPaymentStatus}
      />
    );
  }

  if (paymentStatus === "pending") {
    return <Pending_View course={course} Purcase={purchase} />;
  }

  return null;
}

export default Enrollment;
