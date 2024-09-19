import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // concept
  addConcept: "createConcept",
  getConcept: "getAllConcepts",
  updateConcept: "updateConcept",
  deleteConcept: "deleteConcept",
  getConceptbyCriteria: "getConceptbyCriteria",
};

export const API_URLS = {
  // concept
  GET_ALL_Concept: `${URL}/concept/${endPoints.getConcept}`,
  CREATE_CONCEPT: `${URL}/concept/${endPoints.addConcept}`,
  UPDATE_Concept: `${URL}/concept/${endPoints.updateConcept}`,
  DELETE_Concept: `${URL}/concept/${endPoints.deleteConcept}`,
  SEARCH_Concept: `${URL}/concept/${endPoints.getConceptbyCriteria}`,
};

export const searchConcept = async (
  stream,
  board,
  conceptClass,
  subject,
  chapter
) => {
  try {
    const url = `${API_URLS.SEARCH_Concept}?stream=${encodeURIComponent(
      stream
    )}&board=${encodeURIComponent(board)}&conceptClass=${encodeURIComponent(
      conceptClass
    )}&subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(
      chapter
    )}`;

    const response = await client.get(url);

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching concept data:", error); // Enhanced error logging

    // Check if the error is a network error
    if (!error.response) {
      throw new Error("Network error: Please check your internet connection.");
    }

    // Check if the error is a server error
    if (error.response.status >= 500) {
      throw new Error("Server error: Please try again later.");
    }

    // Handle client errors (400-499)
    if (error.response.status >= 400) {
      throw new Error(
        `Client error: ${error.response.statusText} (${error.response.status})`
      );
    }

    throw new Error("An error occurred while fetching the data.");
  }
};

export const fetchConcepts = async () => {
  try {
    const url = `${API_URLS.GET_ALL_Concept}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createConcept = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_CONCEPT}`;

    const formData = new FormData();
    formData.append("stream", postData.get("stream"));
    formData.append("board", postData.get("board"));
    formData.append("class", postData.get("class"));
    formData.append("subject", postData.get("subject"));
    formData.append("chapterName", postData.get("chapterName"));
    formData.append("topic", postData.get("topic"));
    formData.append("conceptName", postData.get("conceptName"));

    // Append conceptimage separately
    const conceptImg = postData?.getAll("conceptimage"); // Get all conceptimage
    conceptImg?.forEach((con) => {
      formData?.append("conceptimage", con); // Append as array
    });

    // Append descriptions
    const descriptionsAll = postData.getAll("descriptions");

    if (descriptionsAll && descriptionsAll.length > 0) {
      for (let i = 0; i < descriptionsAll.length; i++) {
        formData.append("descriptions", descriptionsAll[i]);
      }
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
    throw new Error("An error occurred while creating the post.");
  }
};

export const deleteConcept = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_Concept}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditConcept = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("stream", values.stream);
    formData.append("board", values.board);
    formData.append("class", values.class);
    formData.append("subject", values.subject);
    formData.append("chapterName", values.chapterName);
    formData.append("topic", values.topic);

    if (values.conceptimage) {
      if (
        typeof values.conceptimage === "string" &&
        values.conceptimage.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.conceptimage);
        formData.append("conceptimage", blob);
      } else if (values.conceptimage instanceof File) {
        formData.append("conceptimage", values.conceptimage);
      }
    }

    const url = `${API_URLS.UPDATE_Concept}/${_id}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedConceptData = await response.json();

      return updatedConceptData;
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
