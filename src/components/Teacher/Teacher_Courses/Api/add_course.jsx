import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
async function handleRegister(values, { setSubmitting }) {
    const Navigate = useNavigate();
    try {
        let response = await Axios.post(
            `http://localhost:3000/Techers/${values.TeacherId}/Courses`,
            values,
            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );
        if (response.status == 200) {
            Swal.fire("Success", "Registered Successfully", "success");
            Navigate("/Teacher/Courses");
        } else if (response.status == 400) {
            setSubmitting(false);
            Swal.fire("Error", `${response.data.message} `, "error");
        } else if (response.status == 409) {
            setSubmitting(false);
            Swal.fire("Error!", `${response.data.message} `, "error");
        } else if (response.status == 500) {
            setSubmitting(false);
            Swal.fire("Error!", `Internal Server Error   `, "error");
        } else {
            setSubmitting(false);
            Swal.fire(
                "Error!",
                `Something Went Wrong ,please trye again latter, ${response.data.message} `,
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

    // setSubmitting(false);
}
export default handleRegister;
