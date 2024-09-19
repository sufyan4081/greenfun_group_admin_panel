import { useFormik } from "formik";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { InputForm } from "../../components/InputForm";
import ChooseFileComp from "../../components/ChooseFile/ChooseFileComp";
import FormButton from "../../components/FormButton/FormButton";
// import { useSnackbar } from "notistack";
import * as Yup from "yup";
// import { useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";

const initialValues = {
  title: "",
  image: null,
  content: "",
  headerTitle: "",
  date: "",
};

const AddBlogForm = ({ formData }) => {
  const [selectedFile, setSelectedFileName] = useState("");

  // // notistack
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const queryClient = useQueryClient();

  // post the data
  // const createPostMutation = useMutation(createBlog, {
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({ queryKey: QueryKeys.blog });

  //     enqueueSnackbar("Blog Added Successfully", {
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
  //     enqueueSnackbar(" An error occurred while adding the new blog", {
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
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    headerTitle: Yup.string().required("Header title is required"),
    date: Yup.string().required("Please select date"),
    image: Yup.mixed()
      .test("fileType", "Only PNG files are supported", function (value) {
        if (!formData || (formData && formData.image !== value)) {
          // Check the image type validation only if it's a new image or image is changed
          if (value) {
            const supportedFormats = ["image/png"];
            return supportedFormats.includes(value.type);
          }
        }
        return true; // No file selected or the image is not changed, so no validation error
      })
      .test("imageRequired", "Image is required", function (value) {
        if (!formData || (formData && formData.image !== value)) {
          // Check if a new image is being uploaded
          return value !== undefined && value !== null;
        }
        return true; // No new image is selected, so no validation error
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

  const { errors, setValues, setFieldValue, handleSubmit, resetForm } = formik;

  //update the data
  useEffect(() => {
    if (formData) {
      setValues({
        _id: formData?._id || "",
        title: formData?.title || "",
        content: formData?.content || "",
        headerTitle: formData?.headerTitle || "",
        date: formData?.date || "",
      });
      if (formData && formData?.image) {
        setSelectedFileName(formData?.image);
        setFieldValue("image", formData?.image);
      }
    }
  }, [formData, setFieldValue, setValues]);

  const handleReset = () => {
    resetForm();
    setFieldValue("image", null);
    setSelectedFileName("");
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
          {formData ? "Edit Blog" : "Add Blog"}
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
            {/* title, content */}
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
                name="title"
                placeholder="Enter Title"
              />
              <InputForm
                type="text"
                formik={formik}
                name="content"
                placeholder="Enter content"
              />
            </Box>

            {/* header title, date */}
            <Box
              sx={{
                display: "flex",
                alignItems: {
                  lg: "flex-start",
                  md: "flex-start",
                  sm: "flex-start",
                  xs: "flex-start",
                  width: "100%",
                },

                gap: "10px",
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
              <ChooseFileComp
                label="Upload Logo"
                name="image"
                formik={formik}
                error={errors.image}
                selectedFile={selectedFile}
                setSelectedFileName={setSelectedFileName}
              />

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

export default AddBlogForm;
