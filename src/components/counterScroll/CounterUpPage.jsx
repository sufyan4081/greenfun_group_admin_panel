import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import CountUp from "react-countup";

const CounterUpPage = ({ Icon, value, title }) => {
  const [counterOn, setCounterOn] = useState(false);
  return (
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(false)}
    >
      <Box
        sx={{
          height: "160px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Icon sx={{ fontSize: 50 }} />
        <Typography variant="h5">
          {counterOn && <CountUp start={0} end={value} duration={2} />}+
        </Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      </Box>
    </ScrollTrigger>
  );
};

export default CounterUpPage;
