import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ btnName, btnSize, width, submit }) => {
  return (
    <Button
      size={btnSize}
      variant="contained"
      sx={{
        textTransform: "none",
        background: "linear-gradient(to right, #16e500, #00a859)",
        width: width,
        borderRadius: "none !important",
      }}
      onClick={submit}
    >
      {btnName}
    </Button>
  );
};

export default CustomButton;
