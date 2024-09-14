import React from "react";
import CustomImageSlider from "../../components/Slider/CustomImageSlider";
import { Box } from "@mui/material";
import IQCBImgSection from "./IQCBImgSection";
import { homeSlider } from "../../data/data";
import IQCBAboutSec from "./IQCBAboutSec";
import CounterSection from "./CounterSection";
import ISOImgSection from "./ISOImgSection";

const Home = () => {
  return (
    <Box>
      <CustomImageSlider data={homeSlider} imgHeight={400} />
      <IQCBImgSection />
      <IQCBAboutSec />
      <CounterSection />
      <ISOImgSection />
    </Box>
  );
};

export default Home;
