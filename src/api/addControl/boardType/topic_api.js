import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // topic
  addTopic: "createTopic",
  getAllTopic: "fetchAllTopics",
  updateTopic: "updateTopic",
  deleteTopic: "deleteTopic",
  fetchTopicByFilters: "fetchTopicByFilters",
};

const API_URLS = {
  // topic
  GET_ALL_TOPIC: `${URL}/chapter-topic/${endPoints.getAllTopic}`,
  CREATE_TOPIC: `${URL}/chapter-topic/${endPoints.addTopic}`,
  UPDATE_TOPIC: `${URL}/chapter-topic/${endPoints.updateTopic}`,
  DELETE_TOPIC: `${URL}/chapter-topic/${endPoints.deleteTopic}`,
  SEARCH_TOPIC: `${URL}/chapter-topic/${endPoints.fetchTopicByFilters}`,
};

export const searchTopic = async (
  className,
  subjectId,
  board,
  chapter,
  stream
) => {
  try {
    const url = `${API_URLS.SEARCH_TOPIC}?class=${className}&subject=${subjectId}&board=${board}&chapter=${chapter}&stream=${stream}`;
    const response = await client.get(url);

    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const fetchTopic = async () => {
  try {
    const url = `${API_URLS.GET_ALL_TOPIC}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createTopic = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_TOPIC}`;

    const response = await client.post(url, postData);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const deleteTopic = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_TOPIC}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditTopic = async (userId, values) => {
  try {
    if (userId) {
      // const id = userId.toString();
      const url = `${API_URLS.UPDATE_TOPIC}/${userId}`;

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
