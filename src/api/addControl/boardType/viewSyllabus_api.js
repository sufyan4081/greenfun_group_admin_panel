import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // Syllabus
  addViewSyllabus: "createSyllabus",
  getAllViewSyllabus: "fetchSyllabus",
  updateViewSyllabus: "updateSyllabusData",
  deleteViewSyllabus: "deleteSyllabusData",
  fetchSyllabusbyCriteria: "fetchSyllabusbyCriteria",
};

export const API_URLS = {
  //Syllabus
  GET_ALL_VIEW_SYLLABUS: `${URL}/syllabus/${endPoints.getAllViewSyllabus}`,
  CREATE_VIEW_SYLLABUS: `${URL}/syllabus/${endPoints.addViewSyllabus}`,
  UPDATE_VIEW_SYLLABUS: `${URL}/syllabus/${endPoints.updateViewSyllabus}`,
  DELETE_VIEW_SYLLABUS: `${URL}/syllabus/${endPoints.deleteViewSyllabus}`,
  SEARCH_VIEW_SYLLABUS: `${URL}/syllabus/${endPoints.fetchSyllabusbyCriteria}`,
};

export const searchSyllabus = async (stream, studentClass, board) => {
  try {
    const url = `${API_URLS.SEARCH_VIEW_SYLLABUS}?stream=${stream}&studentClass=${studentClass}&board=${board}`;

    const response = await client.get(url);

    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const fetchSyllabus = async () => {
  try {
    const url = `${API_URLS.GET_ALL_VIEW_SYLLABUS}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createSyllabus = async (postData) => {
  try {
    if (!postData) {
      throw new Error("postData is undefined");
    }

    const formData = new FormData();
    formData.append("stream", postData.get("stream"));
    formData.append("studentClass", postData.get("studentClass"));
    formData.append("subjectName", postData.get("subjectName"));
    formData.append("subjectLogo", postData.get("subjectLogo"));
    formData.append("examName", postData.get("examName"));

    // Retrieve chapters from postData
    let chapters = postData.getAll("chapters");

    // Check if chapters is null or empty
    if (!chapters || chapters.length === 0) {
      console.warn("Warning: Chapters array is empty");
    } else {
      // Append chapters to FormData
      chapters.forEach((chapter, index) => {
        formData.append(`chapters[${index}][chapterName]`, chapter.chapterName);
        formData.append(`chapters[${index}][weightage]`, chapter.weightage);
      });
    }

    const url = API_URLS.CREATE_VIEW_SYLLABUS;
    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const deleteSyllabus = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_VIEW_SYLLABUS}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditSyllabus = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("subjectName", values.subjectName);
    formData.append("chapterName", values.chapterName);
    formData.append("examName", values.examName);
    formData.append("weightage", values.weightage);

    if (values.subjectLogo) {
      if (
        typeof values.subjectLogo === "string" &&
        values.subjectLogo.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.subjectLogo);
        formData.append("subjectLogo", blob);
      } else if (values.subjectLogo instanceof File) {
        formData.append("subjectLogo", values.image);
      }
    }

    const url = `${API_URLS.UPDATE_VIEW_SYLLABUS}/${_id}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedViewSyllabusdData = await response.json();

      return updatedViewSyllabusdData;
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
