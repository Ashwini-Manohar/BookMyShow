
import {axiosInstance} from "./index";
import axios from "axios";

export const RegisterUser = async (values) => {
  try {
    const { data } = await axiosInstance.post("/api/users/register", values);
    return data;
  } catch (err) {
    console.log("Axios error:", err.response?.data);
    // Always return an object with success and message
    return {
      success: err.response?.data?.success || false,
      message: err.response?.data?.message || err.message,
    };
  }
};


export const LoginUser = async (values) => {
  try {
    const { data } = await axiosInstance.post("/api/users/login", values);
    return data; // {success: true/false, message: "...", data: token}
  } catch (err) {
    console.log("Axios error:", err.response?.data || err.message);
    return {
      success: err.response?.data?.success || false,
      message: err.response?.data?.message || err.message,
      data: null,
    };
  }
};



export const GetCurrentUser = async () => {
  try {
    const response = await axios.get("/api/users/get-current-user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const ForgetPassword = async (value) => {
try {
const response = await axiosInstance.patch(
"api/users/forgetpassword",
value
);
return response.data;
} catch (error) {
console.log(error);
}
};
export const ResetPassword = async (value,id) => {
try {
const response = await axiosInstance.patch(
`/api/users/resetpassword/${id}`,
value
);
return response.data;
} catch (error) {
console.log(error);
}
};