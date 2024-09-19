import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // board
  addBoard: "createBoard",
  getBoard: "fetchBoards",
  updateBoard: "updateBoardData",
  deleteBoard: "deleteBoardData",
};

export const API_URLS = {
  // board
  GET_ALL_BOARD: `${URL}/board/${endPoints.getBoard}`,
  CREATE_BOARD: `${URL}/board/${endPoints.addBoard}`,
  UPDATE_BOARD: `${URL}/board/${endPoints.updateBoard}`,
  DELETE_BOARD: `${URL}/board/${endPoints.deleteBoard}`,
};

export const fetchBoards = async () => {
  try {
    const url = `${API_URLS.GET_ALL_BOARD}`;
    const response = await client.get(url);

    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createBoard = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_BOARD}`;
    const formData = new FormData();
    formData.append("name", postData.get("name"));
    formData.append("boardImage", postData.get("boardImage"));

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

export const deleteBoard = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_BOARD}/${_id}`;
    const response = await client.delete(url);
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditBoard = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("name", values.name);

    if (values.boardImage) {
      if (
        typeof values.boardImage === "string" &&
        values.boardImage.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.boardImage);
        formData.append("boardImage", blob);
      } else if (values.boardImage instanceof File) {
        formData.append("boardImage", values.boardImage);
      }
    }

    const url = `${API_URLS.UPDATE_BOARD}/${_id}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedBoardData = await response.json();

      return updatedBoardData;
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
