import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // stream
  addStream: "createStream",
  getStream: "fetchStream",
  updateStream: "updateStreamData",
  deleteStream: "deleteStreamData",
};

const API_URLS = {
  // streams
  GET_ALL_STREAM: `${URL}/streams/${endPoints.getStream}`,
  CREATE_STREAM: `${URL}/streams/${endPoints.addStream}`,
  UPDATE_STREAM: `${URL}/streams/${endPoints.updateStream}`,
  DELETE_STREAM: `${URL}/streams/${endPoints.deleteStream}`,
};

export const fetchStream = async () => {
  try {
    const url = `${API_URLS.GET_ALL_STREAM}`;
    const response = await client.get(url);

    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createStream = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_STREAM}`;
    const formData = new FormData();
    formData.append("stream", postData.get("stream"));
    formData.append("streamImage", postData.get("streamImage"));

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

export const deleteStream = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_STREAM}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditStream = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("stream", values.stream);

    if (values.streamImage) {
      if (
        typeof values.streamImage === "string" &&
        values.streamImage.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.streamImage);
        formData.append("streamImage", blob);
      } else if (values.streamImage instanceof File) {
        formData.append("streamImage", values.streamImage);
      }
    }

    const url = `${API_URLS.UPDATE_STREAM}/${_id}`;

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
