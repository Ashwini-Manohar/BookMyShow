// import { axiosInstance } from "./index";
// export const makePayment = async (token, amount) => {
// try {
// const response = await axiosInstance.post("/api/bookings/make-payment", {
// token,
// amount,
// });
// // console.log(token, amount, response);
// return response.data;
// } catch (err) {
// return err.response;
// }
// };

// // export const makePayment = async (amount) => {
// //   try {
// //     const response = await axiosInstance.post("/api/bookings/make-payment", {
// //       amount,
// //     });
// //     return response.data;
// //   } catch (err) {
// //     return err.response;
// //   }
// // };

// export const bookShow = async (payload) => {
// try {
// const response = await axiosInstance.post(
// "/api/bookings/book-show",
// payload
// );
// console.log(response.data);
// return response.data;
// } catch (err) {
// return err.response;
// }
// };

// export const getAllBookings = async () => {
//   try {
//     const response = await axiosInstance.get("/api/bookings/get-all-bookings");
//     return response.data;
//   } catch (err) {
//     return err.response;
//   }
// };


// src/api/bookings.js


// export const makePayment = async ({ amount }) => {
//   try {
//     const response = await axiosInstance.post("/api/bookings/create-payment-intent", { amount });
//     return response.data;
//   } catch (err) {
//     return err.response?.data || { success: false, message: err.message };
//   }
// };

import { axiosInstance } from "./index";

export const makePayment = async (token, amount) => {
try {
const response = await axiosInstance.post("/api/bookings/create-payment-intent", {
token,
amount,
});
console.log(token, amount, response);
return response.data;
} catch (err) {
return err.response;
}
};

export const bookShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/bookings/book-show", payload);
    return response.data;
  } catch (err) {
    return err.response?.data || { success: false, message: err.message };
  }
};

export const getAllBookings = async () => {
  try {
    const response = await axiosInstance.get("/api/bookings/get-all-bookings");
    return response.data;
  } catch (err) {
    return err.response?.data || { success: false, message: err.message };
  }
};
