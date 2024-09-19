import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  markAttendanceTeacher: "markAttendance",
  getDaysAbsentTeacher: "getDaysAbsent",
};

export const API_URLS = {
  TEACHER_MARK_ATTENDANCE: `${URL}/teacher-attendance/${endPoints.markAttendanceTeacher}`,
  GET_ALL_TEACHER_ABSENT_DAYS: `${URL}/teacher-attendance/${endPoints.getDaysAbsentTeacher}`,
};

export const getAllTeacherAbsentDays = async (postData) => {
  try {
    const url = `${API_URLS.GET_ALL_TEACHER_ABSENT_DAYS}`;
    const response = await client.get(url, postData);
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};
