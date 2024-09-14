import React from "react";
import Banner from "../../components/Banner/Banner";
import { motion } from "framer-motion";
import slider4 from "../../assets/images/mainSlider/slider4.jpg";
import { Box, Grid, Typography } from "@mui/material";
import { countries } from "../../data/data";

const InternationalPresence = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      viewport={{ once: false }}
    >
      <Banner
        image={slider4}
        text="International Presence"
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
            sm: "40px 10px 0px 10px",
            xs: "40px 50px 0px 50px",
          },
        }}
      >
        <Grid container spacing={2}>
          {countries.map((country, index) => (
            <Grid
              item
              lg={2}
              md={3}
              sm={4}
              xs={6}
              key={index}
              sx={{
                textAlign: "center",
                mb: 2,
                "&:hover": {
                  backgroundColor: "#16e500",
                  borderRadius: "5px",
                },
                transition: "background-color 0.5s ease",
              }}
            >
              <img
                src={`https://flagsapi.com/${country.code}/flat/64.png`}
                alt={`${country.name} flag`}
                width="64"
                height="64"
              />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {country.code}
              </Typography>
              <Typography variant="body2" sx={{}}>
                {country.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default InternationalPresence;
