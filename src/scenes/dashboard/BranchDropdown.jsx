import { Box, Button } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../utils/QueryKey";
import { fetchBranch } from "../../api/addBranch/branch_api";
import NormalSelector from "../../components/NormalSelector";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { resetStudentBranchWiseData } from "../../redux/slice/studentSlice";
import { resetTeacherBranchWiseData } from "../../redux/slice/teacherSlice";
import { resetParentBranchWiseData } from "../../redux/slice/parentSlice";
import { useSelector } from "react-redux";
import { resetBranch, setBranch } from "../../redux/slice/branchSlice";

const initialValues = {
  branch: "",
};
const BranchDropdown = () => {
  const dispatch = useDispatch();

  const branch = useSelector((state) => state.branch.selectedBranch);

  const { data } = useQuery({
    queryKey: QueryKeys.branchKey,
    queryFn: fetchBranch,
  });

  const branchData = data?.data?.map((item) => ({
    value: item?.branchName,
    name: item?.branchName,
    image: item?.imageUrl,
  }));

  const handleReset = () => {
    resetForm();
    dispatch(resetStudentBranchWiseData());
    dispatch(resetTeacherBranchWiseData());
    dispatch(resetParentBranchWiseData());
    dispatch(resetBranch(""));
  };

  const formik = useFormik({
    initialValues,
    handleReset,
    onChange: (event) => {
      const { name, value } = event.target;
      setFieldValue(name, value);
      if (name === "branch") {
        console.log("Dispatching setBranch with value:", value); // Log value
        dispatch(setBranch(value));
      }
    },
  });

  const {
    values,
    handleBlur,
    handleChange,
    touched,
    errors,
    setFieldValue,
    resetForm,
  } = formik;

  return (
    <>
      <Box
        sx={{
          marginBottom: { sm: "20px", xs: "20px" },
          display: "flex",
          width: "100%",
        }}
      >
        <NormalSelector
          name="branch"
          id="branch"
          label="Select Branch"
          options={branchData}
          value={values?.branch || branch}
          onChange={(event) => {
            handleChange(event);
            const branch = event.target.value;
            console.log("Dispatching setBranch with value:", branch); // Log value
            dispatch(setBranch(branch));
          }}
          onBlur={handleBlur}
          error={touched?.branch && Boolean(errors.branch)}
          helperText={touched?.branch && errors.branch}
        />
        <Button
          variant="contained"
          className="common-button"
          size="small"
          onClick={handleReset}
          sx={{ marginLeft: "8px" }}
        >
          Reset
        </Button>
      </Box>
    </>
  );
};

export default BranchDropdown;
