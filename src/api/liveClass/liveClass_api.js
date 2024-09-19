import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // LiveClass
  addLiveClass: "createlive-classes",
  getLiveClass: "getAllLive-classes",
  updateLiveClass: "updatelive-classes",
  deleteLiveClass: "deletelive-classes",
  getLiveClassByCriteria: "criteria",
};

export const API_URLS = {
  // LiveClass
  GET_ALL_LIVE_CLASS: `${URL}/live-classes/${endPoints.getLiveClass}`,
  CREATE_LIVE_CLASS: `${URL}/live-classes/${endPoints.addLiveClass}`,
  UPDATE_LIVE_CLASS: `${URL}/live-classes/${endPoints.updateLiveClass}`,
  DELETE_LIVE_CLASS: `${URL}/live-classes/${endPoints.deleteLiveClass}`,
  SEARCH_LIVE_CLASS: `${URL}/live-classes/live-classes/${endPoints.getLiveClassByCriteria}`,
};

export const searchLiveClass = async (
  ClassName,
  board,
  stream,
  subject,
  chapter
) => {
  try {
    const url = `${API_URLS.SEARCH_LIVE_CLASS}?class=${ClassName}&board=${board}&stream=${stream}&subject=${subject}&chapter=${chapter}`;
    const response = await client.get(url);

    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const fetchLiveClass = async () => {
  try {
    const url = `${API_URLS.GET_ALL_LIVE_CLASS}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createLiveClass = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_LIVE_CLASS}`;
    const response = await client.post(url, postData);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const deleteLiveClass = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_LIVE_CLASS}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditLiveClass = async (_id, values) => {
  try {
    if (_id) {
      const url = `${API_URLS.UPDATE_LIVE_CLASS}/${_id}`;

      await client.put(url, values);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};
