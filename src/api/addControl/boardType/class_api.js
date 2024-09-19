import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // class
  addClass: "createClass",
  getClass: "fetchClass",
  updateClass: "updateClassData",
  deleteClass: "deleteClassData",
};

const API_URLS = {
  // class
  GET_ALL_CLASS: `${URL}/class/${endPoints.getClass}`,
  CREATE_CLASS: `${URL}/class/${endPoints.addClass}`,
  UPDATE_CLASS: `${URL}/class/${endPoints.updateClass}`,
  DELETE_CLASS: `${URL}/class/${endPoints.deleteClass}`,
};

export const fetchClass = async () => {
  try {
    const url = `${API_URLS.GET_ALL_CLASS}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createClass = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_CLASS}`;

    const response = await client.post(url, postData);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const deleteClass = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_CLASS}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditClass = async (_id, values) => {
  try {
    const url = `${API_URLS.UPDATE_CLASS}/${_id}`;

    const response = await client.put(url, values);

    if (response.status === 200) {
      const updatedUserData = response.data;

      return updatedUserData;
    } else {
      console.error("Update failed with status:", response.status);
      throw new Error(`Update request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};
