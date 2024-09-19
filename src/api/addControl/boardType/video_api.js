import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // video
  addVideo: "createVideo",
  getAllVideo: "getAllVideos",
  updateVideo: "updateVideo",
  deleteVideo: "deleteVideo",
  getVideosByCriteria: "getVideosByCriteria",
  videosEnableDisableByIds: "videosEnableDisableByIds",
};

export const API_URLS = {
  // video
  GET_ALL_VIDEO: `${URL}/video/${endPoints.getAllVideo}`,
  CREATE_VIDEO: `${URL}/video/${endPoints.addVideo}`,
  UPDATE_VIDEO: `${URL}/video/${endPoints.updateVideo}`,
  DELETE_VIDEO: `${URL}/video/${endPoints.deleteVideo}`,
  SEARCH_VIDEO: `${URL}/video/${endPoints.getVideosByCriteria}`,
  VIDEO_ENABLED_DISABLED: `${URL}/video/${endPoints.videosEnableDisableByIds}`,
};

export const searchVideo = async (
  videoClass,
  videoChapter,
  videoBoard,
  videoSubject,
  videoTopic,
  videoStream
) => {
  try {
    const url = `${API_URLS.SEARCH_VIDEO}?videoClass=${videoClass}&videoBoard=${videoBoard}&videoSubject=${videoSubject}&videoTopic=${videoTopic}&videoStream=${videoStream}&videoChapter=${videoChapter}`;
    const response = await client.get(url);

    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const fetchVideos = async () => {
  try {
    const url = `${API_URLS.GET_ALL_VIDEO}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createVideo = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_VIDEO}`;

    const formData = new FormData();
    formData.append("stream", postData.get("stream"));
    formData.append("board", postData.get("board"));
    formData.append("class", postData.get("class"));
    formData.append("subject", postData.get("subject"));
    formData.append("chapterName", postData.get("chapterName"));
    formData.append("topic", postData.get("topic"));
    formData.append("videoName", postData.get("videoName"));
    formData.append("videoDescription", postData.get("videoDescription"));
    formData.append("videoLink", postData.get("videoLink"));

    // Append videos descriptions
    const videosData = postData.getAll("videos");
    videosData.forEach((v, index) => {
      formData.append("videos", v);
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
    throw new Error("An error occurred while creating the post.");
  }
};

export const deleteVideo = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_VIDEO}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditVideo = async (userId, values) => {
  try {
    if (userId) {
      // const id = userId.toString();
      const url = `${API_URLS.UPDATE_VIDEO}/${userId}`;

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
