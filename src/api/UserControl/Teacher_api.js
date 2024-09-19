import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // teacher
  addTeacher: "createTeachers",
  getTeacher: "getAllTeacher",
  updateTeacher: "updateTeacher",
  deleteTeacher: "admindeleteteacher",
  getTeachersByCriteria: "getteachersByCriteria",
};

export const API_URLS = {
  // teacher
  GET_ALL_TEACHER: `${URL}/teacher/${endPoints.getTeacher}`,
  CREATE_TEACHER: `${URL}/teacher/${endPoints.addTeacher}`,
  UPDATE_TEACHER: `${URL}/teacher/${endPoints.updateTeacher}`,
  DELETE_TEACHER: `${URL}/teacher/${endPoints.deleteTeacher}`,
  SEARCH_TEACHER: `${URL}/teacher/${endPoints.getTeachersByCriteria}`,
};

export const fetchTeachers = async () => {
  try {
    const url = `${API_URLS.GET_ALL_TEACHER}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    console.error("Fetch Teachers Error:", error);
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createTeacher = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_TEACHER}`;

    const formData = new FormData();

    // Append each class separately
    const classes = postData.getAll("class"); // Get all class
    classes.forEach((cl) => {
      formData.append("class", cl); // Append as array
    });

    // Append subject separately
    const subjects = postData.getAll("subject"); // Get all subject
    subjects.forEach((sub) => {
      formData.append("subject", sub); // Append as array
    });

    // Append board separately
    const boards = postData.getAll("board"); // Get all board
    boards.forEach((b) => {
      formData.append("board", b); // Append as array
    });

    // Append qualification separately
    const qualifications = postData.getAll("qualification"); // Get all qualification
    qualifications.forEach((q) => {
      formData.append("qualification", q); // Append as array
    });

    formData.append("stream", postData.get("stream"));
    formData.append("teacherName", postData.get("teacherName"));
    formData.append("employeeId", postData.get("employeeId"));
    formData.append("joiningDate", postData.get("joiningDate"));
    formData.append("experience", postData.get("experience"));
    formData.append("dob", postData.get("dob"));
    formData.append("email", postData.get("email"));
    formData.append("phoneNumber", postData.get("phoneNumber"));
    formData.append("designation", postData.get("designation"));
    formData.append("gender", postData.get("gender"));
    formData.append("teacherImage", postData.get("teacherImage"));
    formData.append("branch", postData.get("branch"));
    formData.append("fcmToken", postData.get("fcmToken"));
    formData.append("lastLoggedInTime", postData.get("lastLoggedInTime"));

    // Append address fields
    formData.append("address[city]", postData.get("address[city]"));
    formData.append("address[state]", postData.get("address[state]"));
    formData.append("address[country]", postData.get("address[country]"));
    formData.append("address[pinCode]", postData.get("address[pinCode]"));

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

export const searchTeacher = async (classId, stream, subject, board) => {
  try {
    const url = `${API_URLS.SEARCH_TEACHER}?className=${classId}&stream=${stream}&subject=${subject}&board=${board}`;

    const response = await client.get(url);
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Search Teacher Error:", error);
    throw new Error("An error occurred while fetching the data.");
  }
};

export const deleteTeacher = async ({ userId, comment }) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const url = `${API_URLS.DELETE_TEACHER}/${userId}`;
    var raw = JSON.stringify({
      comment,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occurred while deleting the post:", error);
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditTeacher = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("stream", values.stream);
    formData.append("class", values.class);
    formData.append("board", values.board);
    formData.append("teacherName", values.teacherName);
    formData.append("subject", values.subject);
    formData.append("employeeId", values.employeeId);
    formData.append("joiningDate", values.joiningDate);
    formData.append("experience", values.experience);
    formData.append("dob", values.dob);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("designation", values.designation);
    formData.append("gender", values.gender);
    formData.append("qualification", values.qualification);
    formData.append("branch", values.branch);

    // Append address fields
    formData.append("address[city]", values.address.city);
    formData.append("address[state]", values.address.state);
    formData.append("address[country]", values.address.country);
    formData.append("address[pinCode]", values.address.pinCode);
    if (values.teacherImage) {
      if (
        typeof values.teacherImage === "string" &&
        values.teacherImage.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.teacherImage);
        formData.append("teacherImage", blob);
      } else if (values.teacherImage instanceof File) {
        formData.append("teacherImage", values.teacherImage);
      }
    }

    const url = `${API_URLS.UPDATE_TEACHER}/${_id}`;

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
