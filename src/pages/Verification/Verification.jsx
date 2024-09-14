import React from "react";
import { FormHelperText } from "@mui/material";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./verification.css";
const initialValues = {
  code: "",
};

const Verification = () => {
  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Enter Certificate Code"),
  });

  const onSubmit = () => {
    alert("Certificate is verified successfully");
  };

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues,
  });

  const { handleSubmit, values, handleChange, touched, errors } = formik;
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      viewport={{ once: false }}
      className="container-div"
    >
      <div className="main-div">
        <div className="main-div-section">
          <div>
            <input
              type="text"
              placeholder="Enter Certificate Code"
              value={values.code}
              onChange={handleChange}
              name="code"
            />

            <button onClick={handleSubmit}>Submit</button>
          </div>
          {/* Helper Text */}
          <div>
            <FormHelperText
              style={{
                color: "red",
                margin: "2px 0 0 5px",
                fontSize: ".7rem",
                textAlign: "left !important",
              }}
            >
              {touched.code && errors.code}
            </FormHelperText>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Verification;
