import { client } from "../../../api-client";
import config from "../../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // ai test paper format
  addPaperFormat: "createPaperFormat",
  getAllPaperFormat: "getAllPaperFormat",
  updatePaperFormat: "updatePaperById",
  deletePaperFormat: "deletePaper",
  getPapersByTargetYear: "getPapersByTargetYear",
};

const API_URLS = {
  // ai test paper format
  GET_ALL_PAPER_FORMAT: `${URL}/paper-format/${endPoints.getAllPaperFormat}`,
  CREATE_PAPER_FORMAT: `${URL}/paper-format/${endPoints.addPaperFormat}`,
  UPDATE_PAPER_FORMAT: `${URL}/paper-format/${endPoints.updatePaperFormat}`,
  DELETE_PAPER_FORMAT: `${URL}/paper-format/${endPoints.deletePaperFormat}`,
  SEARCH_PAPER_FORMAT: `${URL}/paper-format/${endPoints.getPapersByTargetYear}`,
};

export const fetchPaperByYear = async (year) => {
  try {
    const url = `${API_URLS.SEARCH_PAPER_FORMAT}/${year}`;

    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    console.error(
      "An error occurred while fetching paper format by year :",
      error
    );
    throw new Error("An error occurred while fetching paper format by year.");
  }
};

export const fetchAiPaperFormat = async () => {
  try {
    const url = `${API_URLS.GET_ALL_PAPER_FORMAT}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createPaperFormat = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_PAPER_FORMAT}`;

    const response = await client.post(url, postData);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const deletePaperFormat = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_PAPER_FORMAT}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditPaperFormat = async (userId, values) => {
  try {
    if (userId) {
      const url = `${API_URLS.UPDATE_PAPER_FORMAT}/${userId}`;

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
