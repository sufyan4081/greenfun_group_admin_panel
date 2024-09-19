import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  //student
  addStudent: "createAccount",
  getStudent: "fetchAllUsers",
  editStudent: "updateUser",
  deleteStudent: "deleteUser",
  fetchUserByExamName: "fetchUserByExamName",
};

export const API_URLS = {
  // student
  GET_ALL_STUDENT: `${URL}/user/${endPoints.getStudent}`,
  CREATE_STUDENT_ACCOUNT: `${URL}/user/${endPoints.addStudent}`,
  EDIT_STUDENT: `${URL}/user/${endPoints.editStudent}`,
  DELETE_STUDENT: `${URL}/user/${endPoints.deleteStudent}`,
  SEARCH_STUDENT_BY_EXAM_NAME: `${URL}/user/${endPoints.fetchUserByExamName}`,
};

export const fetchStudent = async () => {
  try {
    const url = `${API_URLS.GET_ALL_STUDENT}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createStudent = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_STUDENT_ACCOUNT}`;

    const formData = new FormData();
    formData.append("fullName", postData.get("fullName"));
    formData.append("email", postData.get("email"));
    formData.append("phoneNumber", postData.get("phoneNumber"));
    formData.append("profileProgress", postData.get("profileProgress"));
    formData.append("selectedClass", postData.get("selectedClass"));
    formData.append("selectedBoard", postData.get("selectedBoard"));
    formData.append("selectedStream", postData.get("selectedStream"));

    // Append each exam ID separately
    const exams = postData.getAll("exams"); // Get all exam IDs
    exams.forEach((examId) => {
      formData.append("exams", examId); // Append as array
    });

    formData.append("subscriptionPlanId", postData.get("subscriptionPlanId"));
    formData.append("subSubscriptionId", postData.get("subSubscriptionId"));
    formData.append("LearningMode", postData.get("LearningMode"));
    formData.append("branch", postData.get("branch"));
    formData.append("studentImage", postData.get("studentImage"));

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

export const EditStudentSubscriber = async (
  userId,
  values,
  subscriptionPlanId,
  subSubscriptionId
) => {
  try {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("selectedClass", values.selectedClass);
    formData.append("selectedBoard", values.selectedBoard);
    formData.append("selectedStream", values.selectedStream);
    formData.append("studentIsActive", values.studentIsActive);
    formData.append("subscriptionPlanId", subscriptionPlanId);
    formData.append("subSubscriptionId", subSubscriptionId);
    formData.append("LearningMode", values.LearningMode);
    formData.append("branch", values.branch);

    if (values.studentImage) {
      if (
        typeof values.studentImage === "string" &&
        values.studentImage.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.studentImage);
        formData.append("studentImage", blob);
      } else if (values.studentImage instanceof File) {
        formData.append("studentImage", values.studentImage);
      }
    }

    const url = `${API_URLS.EDIT_STUDENT}/${userId}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
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
export const updateStudent = async (userId, values) => {
  try {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("selectedClass", values.selectedClass);
    formData.append("selectedBoard", values.selectedBoard);
    formData.append("selectedStream", values.selectedStream);
    formData.append("studentIsActive", values.studentIsActive);
    formData.append("LearningMode", values.LearningMode);
    formData.append("branch", values.branch);

    if (values.studentImage) {
      if (
        typeof values.studentImage === "string" &&
        values.studentImage.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.studentImage);
        formData.append("studentImage", blob);
      } else if (values.studentImage instanceof File) {
        formData.append("studentImage", values.studentImage);
      }
    }

    const url = `${API_URLS.EDIT_STUDENT}/${userId}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
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

export const deleteStudent = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_STUDENT}/${_id}`;
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
