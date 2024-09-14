import React from "react";
import { Box, Typography } from "@mui/material";

const Banner = ({
  image,
  text,
  textColor,
  fontSize,
  textAlign,
  fontWeight,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: { xs: "180px", sm: "180px", md: "180px", lg: "350px" }, // responsive height
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        // borderRadius: "8px",
      }}
    >
      {/* Centered Text */}
      <Typography
        sx={{
          position: "absolute",
          color: textColor,
          fontSize: { xs: "1.5rem", sm: fontSize }, // responsive font size
          textAlign: textAlign,
          fontWeight: fontWeight,
          zIndex: 2,
        }}
      >
        {text}
      </Typography>
      {/* Optional: Overlay for better text readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default Banner;
