import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // stu Leave App
  getLeaveApplication: "getLeaveApplication",
  searchLeaveApplication: "getLeaveApplication",
};

const API_URLS = {
  // stu Leave App
  GET_STU_LEAVE_APP: `${URL}/parent/admin/${endPoints.getLeaveApplication}`,
  SEARCH_STU_LEAVE_APP: `${URL}/parent/admin/${endPoints.searchLeaveApplication}`,
};

export const getStuLeaveApp = async () => {
  try {
    const url = `${API_URLS.GET_STU_LEAVE_APP}`;
    const response = await client.get(url);

    const data = response.data;
    console.log("data", data);
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const searchStuLeaveApp = async (status) => {
  try {
    const url = `${API_URLS.SEARCH_STU_LEAVE_APP}?status=${status}`;

    const response = await client.get(url);
    const data = response?.data;
    return data;
  } catch (error) {
    console.error("Search Subject Error:", error);
    throw new Error("An error occurred while fetching the data.");
  }
};
