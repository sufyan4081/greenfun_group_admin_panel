import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  //student
  addBulkStudent: "createAccountsFromCSV",
};

export const API_URLS = {
  // student
  CREATE_BULK_STUDENT: `${URL}/user/${endPoints.addBulkStudent}`,
};

export const createBulkStudent = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_BULK_STUDENT}`;

    const formData = new FormData();
    formData.append("csvFile", postData.get("csvFile"));

    const response = await client.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};
