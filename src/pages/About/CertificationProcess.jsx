import React from "react";
import Banner from "../../components/Banner/Banner";
import { motion } from "framer-motion";
import slider6 from "../../assets/images/mainSlider/slider6.jpg";
import process1 from "../../assets/images/certification-process/process1.jpeg";
import { Box } from "@mui/material";

const CertificationProcess = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      viewport={{ once: false }}
    >
      <Banner
        image={slider6}
        text="Certification Process"
        textColor="white"
        fontSize="2rem"
        textAlign="center"
        fontWeight="bold"
      />

      <Box
        sx={{
          paddingTop: "40px",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        <img src={process1} alt="process1" />
      </Box>
    </motion.div>
  );
};

export default CertificationProcess;
