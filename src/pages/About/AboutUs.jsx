import React from "react";
import { Box, Typography } from "@mui/material";
import CustomCardHeading from "../../components/Card/CustomCardHeading";
import { motion } from "framer-motion";
import Banner from "../../components/Banner/Banner";
import slider3 from "../../assets/images/mainSlider/slider3.jpg";

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      viewport={{ once: false }}
    >
      <Banner
        image={slider3}
        text="About Us"
        textColor="white"
        fontSize="2rem"
        textAlign="center"
        fontWeight="bold"
      />

      <Box
        sx={{
          padding: {
            lg: "40px 150px 0px 150px",
            md: "40px 150px 0px 150px",
            sm: "40px 15px 0px 15px",
            xs: "40px 15px 0px 15px",
          },
          textAlign: "center",
        }}
      >
        <Typography variant="body1" paragraph>
          IQCB Consultancy has been established by a group of Industrial experts
          and management professionals from diverse fields such as Education,
          Automobile, Pharmaceuticals, Health and Engineering sectors to provide
          quality management Audit, Certification and Training services. To
          maintain focus on its core strength, the company has taken a strategic
          decision to restrict its operations only to these three services
          Audit, Certification and Training. The Board of Directors are
          professional and experts in this field.
        </Typography>

        <CustomCardHeading name="Vision and Mission" variant="h5" />
        <Typography variant="body1" paragraph>
          IQCB is committed to provide its certification services in a fair and
          impartial manner conforming to the contractual requirements agreed
          with the client companies.
        </Typography>
      </Box>
    </motion.div>
  );
};

export default AboutUs;
