import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // course-score
  addExamScore: "createstudentScore",
  getExamScore: "getAllStudentScore",
  editExamScore: "updateStudentScore",
  deleteExamScore: "deleteStudentScore",
  searchExamScore: "filterStudentByClass",
};

const API_URLS = {
  // ExamScore
  GET_ALL_EXAM_SCORE: `${URL}/course-score/${endPoints.getExamScore}`,
  CREATE_EXAM_SCORE: `${URL}/course-score/${endPoints.addExamScore}`,
  EDIT_EXAM_SCORE: `${URL}/course-score/${endPoints.editExamScore}`,
  DELETE_EXAM_SCORE: `${URL}/course-score/${endPoints.deleteExamScore}`,
  SEARCH_EXAM_SCORE: `${URL}/course-score/${endPoints.searchExamScore}`,
};

export const fetchExamScore = async () => {
  try {
    const url = `${API_URLS.GET_ALL_EXAM_SCORE}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const searchExamScore = async (classId, board, stream) => {
  try {
    const url = `${API_URLS.SEARCH_EXAM_SCORE}/class/${classId}/board/${board}/stream/${stream}`;
    const response = await client.get(url);

    if (response.status !== 200) {
      throw new Error("Failed to fetch topic performances");
    }

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while fetching topic performances.");
  }
};

export const createExamScore = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_EXAM_SCORE}`;

    const response = await client.post(url, postData);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const EditExamScore = async (userId, values) => {
  try {
    if (userId) {
      // const id = userId.toString();
      const url = `${API_URLS.EDIT_EXAM_SCORE}/${userId}`;

      const response = await client.put(url, values);

      if (response.status === 200) {
        const updatedUserData = response.data;

        return updatedUserData;
      } else {
        console.error("Update failed with status:", response.status);
        throw new Error(
          `Update request failed with status: ${response.status}`
        );
      }
    } else {
      // Handle the case where userId is undefined
      throw new Error("userId is undefined");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Rethrow the error so that it can be caught in the component.
  }
};

export const deleteExamScore = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_EXAM_SCORE}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};
