import React from "react";
import Banner from "../../components/Banner/Banner";
import { motion } from "framer-motion";
import slider7 from "../../assets/images/mainSlider/slider7.jpg";
import services1 from "../../assets/images/OurServices/service1.jpg";
import { Box } from "@mui/material";

const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      viewport={{ once: false }}
    >
      <Banner
        image={slider7}
        text="Our Services"
        textColor="white"
        fontSize="2rem"
        textAlign="center"
        fontWeight="bold"
      />

      <Box
        sx={{
          mt: 2,
          textAlign: "center",
          alignContent: "center",
        }}
      >
        <img src={services1} alt="services1" />
      </Box>
    </motion.div>
  );
};

export default Services;
