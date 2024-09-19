import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL;

const endPoints = {
  // teacher
  getTeacher: "getAllDeletedTeacher",
  getTeachersByCriteria: "deleted-teachers",
};

export const API_URLS = {
  // teacher
  GET_ALL_TEACHER: `${URL}/teacher/${endPoints.getTeacher}`,
  SEARCH_TEACHER: `${URL}/teacher/${endPoints.getTeachersByCriteria}`,
};

export const fetchAllDeletedTeachers = async () => {
  try {
    const url = `${API_URLS.GET_ALL_TEACHER}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("Fetch Teachers Error:", error);
    throw new Error("An error occurred while fetching the data.");
  }
};

export const searchDeletedTeacher = async (ph) => {
  try {
    const url = `${API_URLS.SEARCH_TEACHER}/${ph}`;

    const response = await client.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Search Deleted Teacher Error:", error);
    throw new Error("An error occurred while fetching the data.");
  }
};
