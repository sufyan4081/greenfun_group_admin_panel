import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // subject
  addSubject: "createSubject",
  getSubject: "fetchSubjects",
  updateSubject: "updateSubject",
  deleteSubject: "deleteSubject",
  searchSubjectByStream: "fetchSubjectByStream",
};

export const API_URLS = {
  // subject
  GET_ALL_SUBJECT: `${URL}/subject/${endPoints.getSubject}`,
  CREATE_SUBJECT: `${URL}/subject/${endPoints.addSubject}`,
  UPDATE_SUBJECT: `${URL}/subject/${endPoints.updateSubject}`,
  DELETE_SUBJECT: `${URL}/subject/${endPoints.deleteSubject}`,
  SEARCH_SUBJECT: `${URL}/subject/${endPoints.searchSubjectByStream}`,
};

// subject_api.js

export const fetchSubjects = async () => {
  try {
    const url = `${API_URLS.GET_ALL_SUBJECT}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("Fetch Subjects Error:", error);
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createSubject = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_SUBJECT}`;

    const formData = new FormData();
    formData.append("subjectName", postData.get("subjectName"));
    formData.append("image", postData.get("image"));
    formData.append("stream", postData.get("stream"));
    formData.append("board", postData.get("board"));
    formData.append("class", postData.get("class"));

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

export const searchSubject = async (Stream, Class, board) => {
  try {
    const url = `${API_URLS.SEARCH_SUBJECT}?Stream=${Stream}&Class=${Class}&board=${board}`;

    const response = await client.get(url);
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Search Subject Error:", error);
    throw new Error("An error occurred while fetching the data.");
  }
};

export const deleteSubject = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_SUBJECT}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditSubject = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("subjectName", values.subjectName);
    formData.append("stream", values.stream);
    formData.append("board", values.board);
    formData.append("class", values.class);

    if (typeof values.image === "string" && values.image.startsWith("data:")) {
      const blob = dataURItoBlob(values.image);
      formData.append("image", blob);
    } else if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    const url = `${API_URLS.UPDATE_SUBJECT}/${_id}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedSubjectData = await response.json();

      return updatedSubjectData;
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
