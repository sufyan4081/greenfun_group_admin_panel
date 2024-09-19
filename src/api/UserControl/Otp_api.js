import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // otp
  sendOtp: "send-otp",
  verifyOtp: "verify-otp",
};

export const API_URLS = {
  // otp
  SEND_OTP: `${URL}/admin/${endPoints.sendOtp}`,
  VERIFY_OTP: `${URL}/admin/${endPoints.verifyOtp}`,
};

// api.js
export const createOtp = async ({ phoneNumber }) => {
  try {
    const url = `${API_URLS.SEND_OTP}`;
    const data = JSON.stringify({ mobileNumber: phoneNumber });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const verifyOtpFun = async ({ enteredOTP }) => {
  try {
    const url = `${API_URLS.VERIFY_OTP}`;

    // Include enteredOTP in the request payload
    const requestBody = {
      // mobileNumber: phoneNumber,
      enteredOTP: enteredOTP,
    };

    const response = await client.post(url, requestBody);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};
