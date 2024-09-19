import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // topicPerformances
  addTopicPerformances: "createtopicPerformances",
  getTopicPerformances: "getAlltopicPerformances",
  fetchUserById: "byStudentId",
  editTopicPerformances: "updatetopicPerformances",
  deleteTopicPerformances: "deletetopicPerformances",
  searchTopicScore: "filterTopicPerformancesByClass",
};

const API_URLS = {
  // topicPerformances
  GET_ALL_TOPIC_SCORE: `${URL}/topic-performance/${endPoints.getTopicPerformances}`,
  CREATE_TOPIC_SCORE: `${URL}/topic-performance/${endPoints.addTopicPerformances}`,
  VIEW_TOPIC_SCORE: `${URL}/topic-performance/${endPoints.fetchUserById}`,
  EDIT_TOPIC_SCORE: `${URL}/topic-performance/${endPoints.editTopicPerformances}`,
  DELETE_TOPIC_SCORE: `${URL}/topic-performance/${endPoints.deleteTopicPerformances}`,
  SEARCH_TOPIC_SCORE: `${URL}/topic-performance/${endPoints.searchTopicScore}`,
};

export const fetchTopicPerformances = async () => {
  try {
    const url = `${API_URLS.GET_ALL_TOPIC_SCORE}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const searchTopicScore = async (
  classId,
  stream,
  board,
  chapter,
  topicName,
  subject
) => {
  try {
    const url = `${API_URLS.SEARCH_TOPIC_SCORE}/class/${classId}/stream/${stream}/board/${board}/chapter/${chapter}/topicName/${topicName}/subject/${subject}`;
    const response = await client.get(url);
    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while fetching topic performances.");
  }
};

export const createTopicPerformances = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_TOPIC_SCORE}`;

    const response = await client.post(url, postData);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const fetchUserById = async (_id) => {
  try {
    if (!_id) {
      throw new Error("Invalid ID"); // Check for valid ID
    }

    const url = `${API_URLS.VIEW_TOPIC_SCORE}/${_id}`;
    const response = await client.get(url);

    if (response.status !== 200) {
      throw new Error("Failed to fetch user data"); // Check for a successful response
    }

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while fetching the user data.");
  }
};

export const EditTopicPerformances = async (userId, values) => {
  try {
    if (userId) {
      // const id = userId.toString();
      const url = `${API_URLS.EDIT_TOPIC_SCORE}/${userId}`;

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

export const deleteTopicPerformances = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_TOPIC_SCORE}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};
