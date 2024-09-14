import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { ISO_Image_Section } from "../../data/data";
import CustomCard from "../../components/Card/CustomCard";

const ISOImgSection = () => {
  // Detect screen size using Material UI's useMediaQuery
  const isLg = useMediaQuery("(min-width:1200px)");
  const isMd = useMediaQuery("(min-width:900px)");
  const isSm = useMediaQuery("(min-width:600px)");
  const isXs = useMediaQuery("(max-width:600px)");

  // Variants for the fade animations, applied based on screen size
  const fadeVariants = {
    fadeLeft: {
      hidden: {
        opacity: 0,
        x: isLg || isMd ? -100 : 0, // Fades left for large and medium screens, no movement for small screens
        scale: isSm || isXs ? 0.5 : 1, // Only zoom-out for small screens (sm, xs), no zoom-out for large and medium screens (lg, md)
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1, // Scale back to normal for small screens
        transition: { duration: 0.5 },
      },
    },
    fadeIn: {
      hidden: {
        opacity: 0,
        x: 0, // No horizontal movement for fade-in
        scale: isSm || isXs ? 0.5 : 1, // Only zoom-out for small screens
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1, // Scale back to normal for small screens
        transition: { duration: 0.5 },
      },
    },
    fadeRight: {
      hidden: {
        opacity: 0,
        x: isLg || isMd ? 100 : 0, // Fades right for large and medium screens, no movement for small screens
        scale: isSm || isXs ? 0.5 : 1, // Only zoom-out for small screens
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1, // Scale back to normal for small screens
        transition: { duration: 0.5 },
      },
    },
  };

  return (
    <Box
      sx={{
        padding: {
          lg: "50px 100px 0px 100px",
          md: "20px 50px 0px 50px",
          sm: "20px 0px 0px 0px",
          xs: "20px 0px 0px 0px",
        },
        textAlign: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <CustomCard
        variants={fadeVariants}
        data={ISO_Image_Section}
        header={false}
        media={true}
        content={true}
        action={true}
        reactPlayer={false}
        cardWidth={isLg || isMd ? 255 : 180}
        cardHeight={isLg || isMd ? 285 : 215}
        imgWidth={null}
        imgHeight={isLg || isMd ? 150 : 80}
        lg={3}
        md={6}
        sm={6}
        xs={6}
        objectFit="contain"
        cardMediaPt="10px"
        titleColor="green"
        titleHeight="90px"
        titleVariant="body1"
      />
    </Box>
  );
};

export default ISOImgSection;
