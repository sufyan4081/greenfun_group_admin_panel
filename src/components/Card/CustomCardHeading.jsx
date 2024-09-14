import { Typography } from "@mui/material";
import React from "react";

const CustomCardHeading = ({ name, textAlign, variant }) => {
  return (
    <Typography
      textAlign={textAlign}
      variant={variant}
      fontWeight="bold"
      gutterBottom
      color="#137139"
    >
      {name}
    </Typography>
  );
};

export default CustomCardHeading;
