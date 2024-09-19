import { client } from "../api-client";
import config from "../../config/index";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // branch
  addBranch: "create",
  getAllBranch: "branches",
  updateBranch: "updateBranchData",
  deleteBranch: "delete",
};

const API_URLS = {
  // branch
  GET_ALL_BRANCH: `${URL}/branch/${endPoints.getAllBranch}`,
  CREATE_BRANCH: `${URL}/branch/${endPoints.addBranch}`,
  UPDATE_BRANCH: `${URL}/branch/${endPoints.updateBranch}`,
  DELETE_BRANCH: `${URL}/branch/${endPoints.deleteBranch}`,
};

export const fetchBranch = async () => {
  try {
    const url = `${API_URLS.GET_ALL_BRANCH}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createBranch = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_BRANCH}`;

    const formData = new FormData();
    formData.append("branchName", postData.get("branchName"));
    formData.append("imageUrl", postData.get("imageUrl"));
    formData.append("city", postData.get("city"));
    formData.append("state", postData.get("state"));
    formData.append("pincode", postData.get("pincode"));
    formData.append("country", postData.get("country"));

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

export const deleteBranch = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_BRANCH}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditBranch = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("branchName", values.branchName);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("country", values.country);
    formData.append("pincode", values.pincode);

    if (values.imageUrl) {
      if (
        typeof values.imageUrl === "string" &&
        values.imageUrl.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.imageUrl);
        formData.append("imageUrl", blob);
      } else if (values.imageUrl instanceof File) {
        formData.append("imageUrl", values.imageUrl);
      }
    }

    const url = `${API_URLS.UPDATE_BRANCH}/${_id}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedBranchdData = await response.json();
      return updatedBranchdData;
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
