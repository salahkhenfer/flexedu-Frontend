import Axios from "axios";
import Swal from "sweetalert2";
async function handleLogin(values, { setSubmitting }) {
  try {
    let response = await Axios.post(
      "https://api.flexedu-dz.com/Login",
      values,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    if (response.status == 200) {
      if (response.data.userType == "teacher") {
        window.location.href = `/Teacher`;
      } else if (response.data.userType == "student") {
        window.location.href = `/Student`;
      } else window.location.href = `/Home`;
    } else if (response.status == 401) {
      setSubmitting(false);
      Swal.fire("Error!", "Username or Password isn't correct", "error");
    } else if (response.status == 409) {
      setSubmitting(false);
      Swal.fire("Error!", `${response.data.message} `, "error");
    } else if (response.status == 500) {
      setSubmitting(false);
      Swal.fire("Error!", `Internal Server Error   `, "error");
    } else {
      setSubmitting(false);
      Swal.fire("Error!", `Something Went Wrong ,`, "error");
    }
  } catch (error) {
    setSubmitting(false);
    Swal.fire("Error!", `Something Went Wrong `, "error");
  }
  // setSubmitting(false);
}
export default handleLogin;
