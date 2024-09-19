import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // course
  addExam: "createExam",
  getAllExam: "fetchExams",
  updateExam: "updateExamData",
  deleteExam: "deleteExamsData",
};

const API_URLS = {
  // course
  GET_ALL_EXAM: `${URL}/exam/${endPoints.getAllExam}`,
  CREATE_EXAM: `${URL}/exam/${endPoints.addExam}`,
  UPDATE_EXAM: `${URL}/exam/${endPoints.updateExam}`,
  DELETE_EXAM: `${URL}/exam/${endPoints.deleteExam}`,
};

export const fetchExam = async () => {
  try {
    const url = `${API_URLS.GET_ALL_EXAM}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createExam = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_EXAM}`;

    const formData = new FormData();
    formData.append("examName", postData.get("examName"));
    formData.append("description", postData.get("description"));
    formData.append("stream", postData.get("stream"));
    formData.append("class", postData.get("class"));
    formData.append("image", postData.get("image"));
    formData.append("examType", postData.get("examType"));

    // Check if 'entrance' and 'users' are provided in postData before appending them
    if (postData.has("entrance")) {
      formData.append("entrance", postData.get("entrance"));
    }
    if (postData.has("users")) {
      formData.append("users", postData.get("users"));
    }

    const response = await client.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const deleteExam = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_EXAM}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditExam = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("examName", values.examName);
    formData.append("description", values.description);
    formData.append("class", values.class);
    formData.append("stream", values.stream);
    formData.append("examType", values.examType);

    // Check if 'entrance' and 'users' are provided in values before appending them
    if ("entrance" in values) {
      formData.append("entrance", values.entrance);
    }
    if ("users" in values) {
      formData.append("users", values.users);
    }

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

    const url = `${API_URLS.UPDATE_EXAM}/${_id}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedExamData = await response.json();

      return updatedExamData;
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
