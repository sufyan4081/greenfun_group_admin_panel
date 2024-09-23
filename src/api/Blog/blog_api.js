import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // blog
  addBlog: "createBlog",
  getBlogs: "getAllBlogs",
  updateBlog: "updateBlogById",
  deleteBlog: "deleteBlogById",
  // getBlogbyCriteria: "getBlogbyCriteria",
};

export const API_URLS = {
  // blog
  GET_ALL_BLOGS: `${URL}/blog/${endPoints.getBlogs}`,
  CREATE_BLOG: `${URL}/blog/${endPoints.addBlog}`,
  UPDATE_BLOG: `${URL}/blog/${endPoints.updateBlog}`,
  DELETE_BLOG: `${URL}/blog/${endPoints.deleteBlog}`,
};

export const fetchBlogs = async () => {
  try {
    const url = `${API_URLS.GET_ALL_BLOGS}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createBlog = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_BLOG}`;

    const formData = new FormData();
    formData.append("title", postData.get("title"));
    formData.append("content", postData.get("content"));
    formData.append("headerTitle", postData.get("headerTitle"));
    formData.append("date", postData.get("date"));

    const blogImg = postData?.getAll("images");
    blogImg?.forEach((con) => {
      formData?.append("images", con); // Append as array
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

export const deleteBlog = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_BLOG}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditBlog = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("headerTitle", values.headerTitle);
    formData.append("date", values.date);

    if (values.images) {
      if (
        typeof values.images === "string" &&
        values.images.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.images);
        formData.append("images", blob);
      } else if (values.images instanceof File) {
        formData.append("images", values.images);
      }
    }

    const url = `${API_URLS.UPDATE_BLOG}/${_id}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedBlogData = await response.json();

      return updatedBlogData;
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
