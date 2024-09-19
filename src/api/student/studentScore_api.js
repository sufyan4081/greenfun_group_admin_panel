import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // score
  addScore: "createScore",
  getScore: "fetchAllScore",
  fetchUserById: "fetchScoreByStudentId",
  editScore: "updateUser",
  deleteScore: "deleteScore",
};

const API_URLS = {
  // score
  GET_ALL_SCORE: `${URL}/score/${endPoints.getScore}`,
  CREATE_SCORE: `${URL}/score/${endPoints.addScore}`,
  VIEW_SCORE: `${URL}/score/${endPoints.fetchUserById}`,
  EDIT_SCORE: `${URL}/score/${endPoints.editScore}`,
  DELETE_SCORE: `${URL}/score/${endPoints.deleteScore}`,
};

export const fetchScore = async () => {
  try {
    const url = `${API_URLS.GET_ALL_SCORE}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createScore = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_SCORE}`;

    const response = await client.post(url, postData);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const fetchScoreById = async (_id) => {
  try {
    if (!_id) {
      throw new Error("Invalid ID"); // Check for valid ID
    }

    const url = `${API_URLS.VIEW_SCORE}/${_id}`;
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

export const EditScore = async (userId, values) => {
  try {
    if (userId) {
      // const id = userId.toString();
      const url = `${API_URLS.EDIT_SCORE}/${userId}`;

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

export const deleteScore = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_SCORE}/${_id}`;
    const response = await client.delete(url);

    // After a successful DELETE request, invalidate the 'posts' query
    // QueryClient.invalidateQueries('posts');

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};
