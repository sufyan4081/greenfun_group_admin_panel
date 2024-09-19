import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // course type
  addExamType: "createExamType",
  getAllExamType: "fetchExamType",
  updateExamType: "updateExamTypeData",
  deleteExamType: "deleteExamsData",
};

export const API_URLS = {
  // course type
  GET_ALL_EXAM_TYPE: `${URL}/exam-type/${endPoints.getAllExamType}`,
  CREATE_EXAM_TYPE: `${URL}/exam-type/${endPoints.addExamType}`,
  UPDATE_EXAM_TYPE: `${URL}/exam-type/${endPoints.updateExamType}`,
  DELETE_EXAM_TYPE: `${URL}/exam-type/${endPoints.deleteExamType}`,
};

export const fetchExamType = async () => {
  try {
    const url = `${API_URLS.GET_ALL_EXAM_TYPE}`;
    const response = await client.get(url);

    const data = response.data;
    console.log("dataExamType", data);
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createExamType = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_EXAM_TYPE}`;

    const formData = new FormData();
    formData.append("examTypeName", postData.get("examTypeName"));
    formData.append("image", postData.get("image"));

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

export const deleteExamType = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_EXAM_TYPE}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditExamType = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("examTypeName", values.examTypeName);

    if (values.image) {
      if (
        typeof values.image === "string" &&
        values.image.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.image);
        formData.append("image", blob);
      } else if (values.image instanceof File) {
        formData.append("image", values.image);
      }
    }

    const url = `${API_URLS.UPDATE_EXAM_TYPE}/${_id}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedExamTypedData = await response.json();

      return updatedExamTypedData;
    } else {
      console.error("Update failed with status:", response.status);
      throw Error(`Update request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

function dataURItoBlob(dataURI) {
  if (dataURI.startsWith("data:")) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  // If the input is not a data URI, you may want to handle it differently.
  // For example, you could throw an error or return null.
  throw new Error("Input is not a valid data URI.");
}
