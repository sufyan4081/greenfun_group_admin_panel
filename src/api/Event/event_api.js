import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // Event
  addEvent: "createEvent",
  getEvent: "fetchEvent",
  updateEvent: "updateEventData",
  deleteEvent: "deleteEventData",
};

const API_URLS = {
  // Event
  GET_ALL_EVENT: `${URL}/event/${endPoints.getEvent}`,
  CREATE_EVENT: `${URL}/event/${endPoints.addEvent}`,
  UPDATE_EVENT: `${URL}/event/${endPoints.updateEvent}`,
  DELETE_EVENT: `${URL}/event/${endPoints.deleteEvent}`,
};

export const fetchEvent = async () => {
  try {
    const url = `${API_URLS.GET_ALL_EVENT}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createEvent = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_EVENT}`;

    const response = await client.post(url, postData);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const deleteEvent = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_EVENT}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditEvent = async (_id, values) => {
  try {
    const url = `${API_URLS.UPDATE_EVENT}/${_id}`;

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
