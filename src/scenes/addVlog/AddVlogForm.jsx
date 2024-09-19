import { useFormik } from "formik";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { InputForm } from "../../components/InputForm";
import ChooseFileComp from "../../components/ChooseFile/ChooseFileComp";
import FormButton from "../../components/FormButton/FormButton";
// import { useSnackbar } from "notistack";
import * as Yup from "yup";
// import { useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import ChooseMultipleVideo from "../../components/ChooseFile/ChooseMultipleVideo";

const initialValues = {
  headerTitle: "",
  date: "",
  videos: [],
  videoLink: [],
};

const AddVlogForm = ({ formData }) => {
  const [selectedFile, setSelectedFileName] = useState("");

  // // notistack
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const queryClient = useQueryClient();

  // post the data
  // const createPostMutation = useMutation(createVlog, {
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({ queryKey: QueryKeys.vlog });

  //     enqueueSnackbar("Vlog Added Successfully", {
  //       variant: "success",
  //       anchorOrigin: { vertical: "top", horizontal: "center" },
  //       action: (key) => (
  //         <Button onClick={() => closeSnackbar(key)} color="success">
  //           <CloseIcon />
  //         </Button>
  //       ),
  //     });
  //     handleReset();
  //   },
  //   onError: (error) => {
  //     enqueueSnackbar(" An error occurred while adding the new vlog", {
  //       variant: "error",
  //       anchorOrigin: { vertical: "top", horizontal: "center" },
  //       action: (key) => (
  //         <Button onClick={() => closeSnackbar(key)} sx={{ color: "white" }}>
  //           <CloseIcon />
  //         </Button>
  //       ),
  //     });
  //   },
  // });

  const validationSchema = Yup.object({
    headerTitle: Yup.string().required("Header title is required"),
    date: Yup.string().required("Please select date"),
    videos: Yup.array()
      .of(Yup.mixed())
      .test("is-mp4", "Only MP4 files are supported.", (value) => {
        // Ensure all files are MP4 format
        return value.every((file) => {
          // Check if the file is of MP4 format
          return file && file.type === "video/mp4";
        });
      }),
  });

  const onSubmit = async (values) => {
    alert("Data is submitted successfully");
  };

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema,
    validateOnMount: true,
  });

  const {
    errors,
    setValues,
    setFieldValue,
    handleSubmit,
    resetForm,
    values,
    handleBlur,
  } = formik;

  //update the data
  useEffect(() => {
    if (formData) {
      setValues({
        _id: formData?._id || "",
        headerTitle: formData?.headerTitle || "",
        date: formData?.date || "",
        videos: formData?.videos || [],
        videoLink: formData?.videoLink || [],
      });
    }
  }, [formData, setFieldValue, setValues]);

  const handleReset = () => {
    resetForm();
    setSelectedFileName("");
  };

  const addVideo = () => {
    setFieldValue("videoLink", [...values.videoLink, []]); // Append an empty array
  };

  // remove options button
  const removeVideo = (index) => {
    const newVideos = [...values.videoLink];
    newVideos.splice(index, 1);
    setFieldValue("videoLink", newVideos);
  };

  const handleChangeOptions = (e, index, field) => {
    const newVideos = [...values.videoLink];
    // Ensure that e.target.value is a string, otherwise set it to an empty string
    const newValue = typeof e.target.value === "string" ? e.target.value : "";
    newVideos[index] = newValue;
    setFieldValue("videoLink", newVideos);
  };

  return (
    <Box
      sx={{
        width: {
          lg: formData ? "100%" : "700px",
          md: formData ? "100%" : "500px",
          sm: formData ? "100%" : "400px",
          xs: formData ? "100%" : "200px",
        },
        margin: "auto auto",
      }}
    >
      <fieldset style={{ border: "1px solid grey", width: "100%" }}>
        <legend
          style={{
            float: "none",
            width: "auto",
            margin: "0 8px 0 5px",
            padding: "0 5px 0 5px",
            fontSize: ".8rem",
          }}
        >
          {formData ? "Edit Vlog" : "Add Vlog"}
        </legend>
        <Box
          sx={{
            display: "flex",
            padding: "15px",
            gap: "10px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {/* header title, date */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                mb: 2,
                width: "100%",
              }}
            >
              <InputForm
                type="text"
                formik={formik}
                name="headerTitle"
                placeholder="Enter Header Title"
              />
              <InputForm
                type="date"
                formik={formik}
                name="date"
                placeholder="Please select date"
              />
            </Box>

            {/* videoLink and videos */}
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "row",
                  xs: "column",
                },
                width: "100%",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <ChooseMultipleVideo
                  label="Upload video"
                  name="videos"
                  formik={formik}
                  error={errors.videos}
                  selectedFile={selectedFile && selectedFile}
                  setSelectedFileName={setSelectedFileName}
                />
              </Box>

              <Box sx={{ width: "50%" }}>
                {/* Video Links */}
                {values.videoLink.map((link, index) => (
                  <Box key={index}>
                    <Typography variant="h6">{`video link ${
                      index + 1
                    }`}</Typography>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <TextField
                        style={{
                          width: "200px",
                          marginBottom: "5px",
                        }}
                        id={`videoLink[${index}]`}
                        label={`Enter video link ${index + 1}`}
                        variant="outlined"
                        name={`videoLink[${index}]`}
                        required
                        value={link || ""}
                        onChange={(e) =>
                          handleChangeOptions(e, index, "videoLink")
                        }
                        onBlur={handleBlur}
                      />
                      <Box>
                        <Button
                          startIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => removeVideo(index)}
                        />
                      </Box>
                    </Box>
                  </Box>
                ))}

                {/* Add Video Link Button */}
                <Button onClick={addVideo} variant="contained" color="success">
                  Add URL
                </Button>
              </Box>
            </Box>

            {/* image, submit button */}
            <Box
              sx={{
                display: "flex",
                alignItems: {
                  lg: "flex-start",
                  md: "flex-start",
                  sm: "flex-start",
                  xs: "flex-start",
                },
                width: "100%",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <FormButton
                formData={formData}
                handleCombinedClick={handleSubmit}
                handleReset={handleReset}
              />
            </Box>
          </Box>
        </Box>
      </fieldset>
    </Box>
  );
};

export default AddVlogForm;
