import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // notification
  addNotification: "send-notification",
};

const API_URLS = {
  // notification
  CREATE_NOTIFICATION: `${URL}/${endPoints.addNotification}`,
};

export const createNotification = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_NOTIFICATION}`;

    const response = await client.post(url, postData);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};
