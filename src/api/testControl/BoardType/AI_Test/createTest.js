import { client } from "../../../api-client";
import config from "../../../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // ai test create questions
  addQuestions: "createAITestQuestion",
  getAllQuestions: "fetchAITestQuestion",
  updateQuestions: "updateAITestQuestionData",
  deleteQuestions: "deleteAITestQuestionData",
  fetchBoardQuestionByExamType: "fetchAITestQuestionByExamType",
};
export const API_URLS = {
  // ai test create questions
  GET_ALL_QUESTIONS: `${URL}/board-queExam/${endPoints.getAllQuestions}`,
  CREATE_QUESTIONS: `${URL}/board-queExam/${endPoints.addQuestions}`,
  UPDATE_QUESTIONS: `${URL}/board-queExam/${endPoints.updateQuestions}`,
  DELETE_QUESTIONS: `${URL}/board-queExam/${endPoints.deleteQuestions}`,
  SEARCH_QUESTIONS: `${URL}/board-queExam/${endPoints.fetchBoardQuestionByExamType}`,
};

export const searchAiQuestion = async (examType) => {
  try {
    const url = `${API_URLS.SEARCH_QUESTIONS}/${examType}`;
    const response = await client.get(url);

    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const fetchAiQuestions = async () => {
  try {
    const url = `${API_URLS.GET_ALL_QUESTIONS}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const deleteAiQuestions = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_QUESTIONS}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditAiQuestions = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("examType", values.examType);
    formData.append("course", values.course);
    formData.append("subject", values.subject);
    formData.append("class", values.class);
    formData.append("board", values.board);
    formData.append("topic", values.topic);
    formData.append("chapter", values.chapter);
    formData.append("questionType", values.questionType);
    formData.append("difficultyLevel", values.difficultyLevel);
    formData.append("testName", values.testName);
    formData.append("text", values.text);
    formData.append("correctAnswer", values.correctAnswer);

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
    // Append options using the same key
    values.options.forEach((option, index) => {
      formData.append(`options[${index}][optionNumber]`, option.optionNumber);
      formData.append(`options[${index}][content]`, option.content);
    });

    const url = `${API_URLS.UPDATE_QUESTIONS}/${_id}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
      body: formData,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedSubjectData = await response.json();

      return updatedSubjectData;
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
