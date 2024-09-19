import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // chapter
  addChapter: "createChapter",
  getAllChapter: "fetchAllChapters",
  updateChapter: "updateChapter",
  deleteChapter: "deleteChapter",
  fetchChaptersByFilter: "fetchChaptersByFilter",
};

const API_URLS = {
  // chapter
  GET_ALL_CHAPTER: `${URL}/chapter/${endPoints.getAllChapter}`,
  CREATE_CHAPTER: `${URL}/chapter/${endPoints.addChapter}`,
  UPDATE_CHAPTER: `${URL}/chapter/${endPoints.updateChapter}`,
  DELETE_CHAPTER: `${URL}/chapter/${endPoints.deleteChapter}`,
  SEARCH_CHAPTER: `${URL}/chapter/${endPoints.fetchChaptersByFilter}`,
};

export const searchChapter = async (className, subjectId, board, stream) => {
  try {
    const url = `${API_URLS.SEARCH_CHAPTER}?class=${className}&subject=${subjectId}&boards=${board}&stream=${stream}`;
    const response = await client.get(url);

    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const fetchChapter = async () => {
  try {
    const url = `${API_URLS.GET_ALL_CHAPTER}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createChapter = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_CHAPTER}`;

    const formData = new FormData();
    formData.append("chapterName", postData.get("chapterName"));
    formData.append("chapterDescription", postData.get("chapterDescription"));
    formData.append("stream", postData.get("stream"));
    formData.append("board", postData.get("board"));
    formData.append("class", postData.get("class"));
    formData.append("subject", postData.get("subject"));

    // Get study materials as an array
    const studyMaterials = postData.getAll("study_material");

    // Append study_material files using the same key
    studyMaterials.forEach((file, index) => {
      formData.append("study_material", file);
    });

    const response = await client.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(
      error.message || "An error occurred while creating the post."
    );
  }
};

export const deleteChapter = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_CHAPTER}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditChapter = async (userId, values) => {
  try {
    if (userId) {
      const url = `${API_URLS.UPDATE_CHAPTER}/${userId}`;

      // Convert values object to JSON string
      const raw = JSON.stringify(values);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      // Make the fetch request
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    } else {
      // Handle the case where userId is undefined
      throw new Error("userId is undefined");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Rethrow the error so that it can be caught in the component.
  }
};
