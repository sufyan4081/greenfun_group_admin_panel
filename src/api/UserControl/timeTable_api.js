import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // TimeTable
  addTimeTable: "createTimeTable",
  getTimeTable: "fetchTimeTable",
  updateTimeTable: "updateTimeTableData",
  deleteTimeTable: "deleteTimeTableData",
};

const API_URLS = {
  // TimeTable
  GET_ALL_TIME_TABLE: `${URL}/time-table/${endPoints.getTimeTable}`,
  CREATE_TIME_TABLE: `${URL}/time-table/${endPoints.addTimeTable}`,
  UPDATE_TIME_TABLE: `${URL}/time-table/${endPoints.updateTimeTable}`,
  DELETE_TIME_TABLE: `${URL}/time-table/${endPoints.deleteTimeTable}`,
};

export const fetchTimeTable = async () => {
  try {
    const url = `${API_URLS.GET_ALL_TIME_TABLE}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createTimeTable = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_TIME_TABLE}`;

    const response = await client.post(url, postData);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const deleteTimeTable = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_TIME_TABLE}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditTimeTable = async (_id, values) => {
  try {
    const url = `${API_URLS.UPDATE_TIME_TABLE}/${_id}`;

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
