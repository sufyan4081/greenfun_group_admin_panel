import { client } from "../../api-client";
import config from "../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // banner
  addBanner: "createBanner",
  getAllBanner: "fetchBanners",
  updateBanner: "updateBannerData",
  deleteBanner: "deleteBannerData",
};

const API_URLS = {
  // banner
  GET_ALL_BANNER: `${URL}/banner/${endPoints.getAllBanner}`,
  CREATE_BANNER: `${URL}/banner/${endPoints.addBanner}`,
  UPDATE_BANNER: `${URL}/banner/${endPoints.updateBanner}`,
  DELETE_BANNER: `${URL}/banner/${endPoints.deleteBanner}`,
};

export const fetchBanner = async () => {
  try {
    const url = `${API_URLS.GET_ALL_BANNER}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createBanner = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_BANNER}`;

    const formData = new FormData();
    formData.append("name", postData.get("name"));
    formData.append("bannerImage", postData.get("bannerImage"));

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

export const deleteBanner = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_BANNER}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditBanner = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("name", values.name);

    if (values.bannerImage) {
      if (
        typeof values.bannerImage === "string" &&
        values.bannerImage.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.bannerImage);
        formData.append("bannerImage", blob);
      } else if (values.bannerImage instanceof File) {
        formData.append("bannerImage", values.bannerImage);
      }
    }

    const url = `${API_URLS.UPDATE_BANNER}/${_id}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedBannerdData = await response.json();
      return updatedBannerdData;
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
