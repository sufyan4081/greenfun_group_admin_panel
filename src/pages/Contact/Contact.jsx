import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Typography } from "@mui/material";
import { InputForm } from "../../components/InputField/InputForm";
import CustomButton from "../../components/Button/CustomButton";
import Banner from "../../components/Banner/Banner";
import b4 from "../../assets/images/banner/b4.jpg";
import { motion } from "framer-motion";

const initialValues = {
  name: "",
  companyName: "",
  phone: "",
  email: "",
  message: "",
};
const Contact = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Mobile number is required"),
    companyName: Yup.string().required("Company name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const onSubmit = () => {
    alert("Message is sent to our team we will contact you shortly... ");
  };

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues,
  });

  const { handleSubmit } = formik;
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      viewport={{ once: false }}
    >
      <Banner
        image={b4}
        text="Contact Us"
        textColor="white"
        fontSize="3rem"
        textAlign="center"
        fontWeight="bold"
      />
      <Grid
        item
        container
        sx={{
          padding: {
            lg: "20px 50px",
            md: "20px 50px",
            sm: "20px 5px",
            xs: "20px 5px",
          },
          textAlign: "center",
        }}
      >
        <Grid
          lg={6}
          md={6}
          sm={12}
          xs={12}
          sx={{
            padding: "20px 50px",
            textAlign: "left",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            mt={3}
            mb={2}
            color="#137139"
          >
            We're Ready, Let's Talk for Certificate.
          </Typography>
          <InputForm
            type="text"
            formik={formik} // Pass the formik prop
            name="name"
            placeholder="Enter Name"
          />
          <InputForm
            type="text"
            formik={formik} // Pass the formik prop
            name="companyName"
            placeholder="Enter Company Name"
          />
          <InputForm
            type="text"
            formik={formik} // Pass the formik prop
            name="phone"
            placeholder="Enter Mobile Number"
          />
          <InputForm
            type="email"
            formik={formik} // Pass the formik prop
            name="email"
            placeholder="Enter Email"
          />
          <InputForm
            type="text"
            formik={formik} // Pass the formik prop
            name="message"
            placeholder="Enter Message"
          />
          <CustomButton
            btnName="Send"
            btnSize="small"
            width="100%"
            submit={handleSubmit}
          />
        </Grid>
        <Grid
          lg={6}
          md={6}
          sm={12}
          xs={12}
          sx={{
            padding: "20px 50px",
            textAlign: "left",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            mt={3}
            mb={2}
            color="#137139"
          >
            Contact Info
          </Typography>
          {/* <Typography
            variant="h6"
            gutterBottom
            color="#137139"
            fontWeight="bold"
          >
            Address​
          </Typography>
          <Typography variant="body1" gutterBottom>
            Office No.- 12, Citi Enclave-1 CHS, Plot No.- 9, Sector No.- 2A,
            Koparkhairane, Navi Mumbai- 400709 MS, India.
          </Typography> */}

          <Typography
            variant="h6"
            gutterBottom
            color="#137139"
            fontWeight="bold"
          >
            Email Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            contact@iqcb.in
          </Typography>

          {/* <Typography
            variant="h6"
            gutterBottom
            color="#137139"
            fontWeight="bold"
          >
            Call Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            9082091412/ 9689062951
          </Typography> */}
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Contact;
