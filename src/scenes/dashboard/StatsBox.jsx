import { Box, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
const StatsBox = ({ total, name, icon, to }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        gridColumn: {
          lg: "span 3",
          md: "span 4",
          sm: "span 6",
          xs: "span 12",
        },
      }}
      backgroundColor={colors.greenAccent[100]}
      marginBottom="10px"
      paddingTop="-15px"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          margin="10px"
        >
          <Box
            sx={{
              fontWeight: "bold",
              textDecoration: "none",
              color: "white",
              fontSize: "30px",
              marginBottom: "20px",
            }}
          >
            {" "}
            {total}
          </Box>
          <Box sx={{ color: "white" }}>{name}</Box>
        </Box>
        <Box sx={{ margin: "10px" }}>{icon}</Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="baseline"
        backgroundColor={colors.greenAccent[500]}
      >
        <Link
          to={to}
          style={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "white",
            fontSize: "12px",
          }}
        >
          More Info <ArrowCircleRightIcon style={{ color: "white" }} />
        </Link>
      </Box>
    </Box>
  );
};

export default StatsBox;
