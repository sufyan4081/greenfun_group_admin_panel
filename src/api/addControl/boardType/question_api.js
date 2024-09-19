import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // questions
  addQuestions: "createQuestion",
  getAllQuestions: "getAllQuestions",
  updateQuestions: "updateQuestion",
  deleteQuestions: "deleteQuestion",
  getQuestionByCriteria: "getQuestionByCriteria",
};

export const API_URLS = {
  // questions
  GET_ALL_QUESTIONS: `${URL}/questions/${endPoints.getAllQuestions}`,
  CREATE_QUESTIONS: `${URL}/questions/${endPoints.addQuestions}`,
  UPDATE_QUESTIONS: `${URL}/questions/${endPoints.updateQuestions}`,
  DELETE_QUESTIONS: `${URL}/questions/${endPoints.deleteQuestions}`,
  SEARCH_QUESTIONS: `${URL}/questions/${endPoints.getQuestionByCriteria}`,
};

export const searchQuestion = async (
  questionClass,
  questionStream,
  questionChapter,
  questionBoard,
  questionSubject,
  questionTopic
) => {
  try {
    const url = `${API_URLS.SEARCH_QUESTIONS}?questionClass=${questionClass}&questionStream=${questionStream}&questionChapter=${questionChapter}&questionBoard=${questionBoard}&questionSubject=${questionSubject}`;

    const response = await client.get(url);

    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const fetchQuestions = async () => {
  try {
    const url = `${API_URLS.GET_ALL_QUESTIONS}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createQuestions = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_QUESTIONS}`;

    const response = await client.post(url, postData);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const deleteQuestions = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_QUESTIONS}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditQuestions = async (userId, values) => {
  try {
    if (userId) {
      // const id = userId.toString();
      const url = `${API_URLS.UPDATE_QUESTIONS}/${userId}/0`;

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
