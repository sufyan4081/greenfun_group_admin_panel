import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // Subscription
  addSubscription: "createSubscription",
  getSubscription: "getAllSubscriptions",
  editSubscription: "updatesubscriptions",
  deleteSubscription: "deletesubscription",
};

const API_URLS = {
  // Subscription
  GET_ALL_SUBSCRIPTION: `${URL}/subscription/${endPoints.getSubscription}`,
  CREATE_SUBSCRIPTION: `${URL}/subscription/${endPoints.addSubscription}`,
  EDIT_SUBSCRIPTION: `${URL}/subscription/${endPoints.editSubscription}`,
  DELETE_SUBSCRIPTION: `${URL}/subscription/${endPoints.deleteSubscription}`,
};

export const fetchSubscription = async () => {
  try {
    const url = `${API_URLS.GET_ALL_SUBSCRIPTION}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createSubscription = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_SUBSCRIPTION}`;

    const response = await client.post(url, postData);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const EditSubscription = async (userId, values) => {
  try {
    if (userId) {
      // const id = userId.toString();
      const url = `${API_URLS.EDIT_SUBSCRIPTION}/${userId}`;

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

export const deleteSubscription = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_SUBSCRIPTION}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};
