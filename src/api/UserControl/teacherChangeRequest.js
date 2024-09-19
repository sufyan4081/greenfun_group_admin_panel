import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  pendingDeleteRequests: "pendingDeleteRequests",
  deleteRequestStatus: "deleteRequestStatus",
};

export const API_URLS = {
  GET_ALL_REQUEST_TEACHER: `${URL}/teacher/admin/${endPoints.pendingDeleteRequests}`,
  DELETE_REQUEST_TEACHER: `${URL}/teacher/admin/${endPoints.deleteRequestStatus}`,
};

export const getAllTeacherRequest = async (postData) => {
  try {
    const url = `${API_URLS.GET_ALL_REQUEST_TEACHER}`;
    const response = await client.post(url, postData);
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const changeTeacherRequest = async (postData) => {
  try {
    console.log("postData", postData); // Debugging response
    const url = `${API_URLS.DELETE_REQUEST_TEACHER}`;
    console.log("API Call URL:", url); // Debugging URL
    const payload = {
      teacherId: postData.teacherId, // Match the expected format
      status: postData.status,
    };

    console.log("Payload being sent:", payload);
    const response = await client.post(url, payload);

    console.log("response", response); // Debugging response
    const data = response.data;
    console.log("API Response Data:", data); // Debugging response
    return data;
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else {
      console.error("An error occurred:", error.message);
    }
    throw new Error("An error occurred while creating the post.");
  }
};
