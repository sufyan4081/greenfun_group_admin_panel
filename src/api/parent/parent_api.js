import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  //parent
  addParent: "createAccount",
  getParent: "gellAllparents",
  editParent: "update",
  deleteParent: "admindelete",
};

export const API_URLS = {
  // parent
  GET_ALL_PARENT: `${URL}/parent/${endPoints.getParent}`,
  CREATE_PARENT_ACCOUNT: `${URL}/parent/${endPoints.addParent}`,
  EDIT_PARENT: `${URL}/parent/${endPoints.editParent}`,
  DELETE_PARENT: `${URL}/parent/${endPoints.deleteParent}`,
};

export const fetchParent = async () => {
  try {
    const url = `${API_URLS.GET_ALL_PARENT}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createParent = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_PARENT_ACCOUNT}`;

    const formData = new FormData();
    formData.append("fullName", postData.get("fullName"));
    formData.append("phoneNumber", postData.get("phoneNumber"));
    formData.append("email", postData.get("email"));
    formData.append("parentImage", postData.get("parentImage"));

    // Append each studentPhoneNumbers separately
    const studentPhoneNumbers = postData.getAll("studentPhoneNumber"); // Get all studentPhoneNumbers
    studentPhoneNumbers.forEach((stu) => {
      formData.append("studentPhoneNumber", stu); // Append as array
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

export const updateParentStatus = async (userId, values) => {
  try {
    const formData = new FormData();
    formData.append("status", values.status);
    const url = `${API_URLS.EDIT_PARENT}/${userId}`;

    // Create the request object
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedTeacherData = await response.json();

      return updatedTeacherData;
    } else {
      console.error("Update failed with status:", response.status);
      throw Error(`Update request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};
export const updateParent = async (userId, values) => {
  try {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    // formData.append("studentPhoneNumber", values.studentPhoneNumber);

    if (values.parentImage) {
      if (
        typeof values.parentImage === "string" &&
        values.parentImage.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.parentImage);
        formData.append("parentImage", blob);
      } else if (values.parentImage instanceof File) {
        formData.append("parentImage", values.parentImage);
      }
    }

    const url = `${API_URLS.EDIT_PARENT}/${userId}`;

    // Create the request object
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedTeacherData = await response.json();

      return updatedTeacherData;
    } else {
      console.error("Update failed with status:", response.status);
      throw Error(`Update request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const deleteParent = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_PARENT}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
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

  throw new Error("Input is not a valid data URI.");
}
