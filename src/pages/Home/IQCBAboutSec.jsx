import React from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import l9 from "../../assets/images/IqcbImage/l9.jpg";
import CustomCardHeading from "../../components/Card/CustomCardHeading";
import CustomButton from "../../components/Button/CustomButton";
import { motion } from "framer-motion";

const IQCBAboutSec = () => {
  // Detect screen size using Material UI's useMediaQuery
  const isLg = useMediaQuery("(min-width:1200px)");
  const isMd = useMediaQuery("(min-width:900px)");

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      viewport={{ once: false }}
      // style={{ border: "solid" }}
    >
      <Grid
        container
        sx={{
          padding: {
            lg: "50px 110px 0px 110px",
            md: "20px 50px 0px 50px",
            sm: "10px 0px 0px 0px",
            xs: "10px 0px 0px 0px",
          },
          // border: "solid",
          width: "100%",
          boxSizing: "border-box",
          height: "100%",
          // overflow: "hidden",
        }}
      >
        <Grid
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
          sx={{
            // border: 2,
            height: isLg || isMd ? "350px" : "200px", // Ensure it fills the parent's height
            overflow: "hidden", // Ensures no overflow
            mb: isLg || isMd ? "0px" : "20px",
          }}
        >
          <img
            src={l9}
            style={{
              width: "100%",
              height: "100%", // Fill the grid container
              objectFit: "cover", // Ensures the entire image is visible without cutting off
            }}
            alt="about section of iqcb"
          />
        </Grid>

        <Grid
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
          sx={{
            height: "100%", // Ensure height matches the image grid
            textAlign: "left",
            padding: {
              lg: "0px 0px 0px 10px",
              md: "0px 0px 0px 10px",
              sm: "0px 10px 0px 10px",
              xs: "0px 15px 0px 15px",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <CustomCardHeading name="Welcome To IQCB" variant="h4" />

          <Typography variant="body1" paragraph textAlign="justify">
            IQCB, one of the Reputed ISO Certification Body in Navi Mumbai. We
            provide ISO Certification Service in Navi Mumbai & All Parts of
            India and offer ISO 9001 Certification, ISO 14001 Certification, ISO
            22000 Certification, ISO 27001 Certification, ISO 28000
            Certification, ISO 31000 Certification, HACCP Certification, GMP
            Certification, WHO GMP Certification, GLP Certification, GPP
            Certification, OHSAS 18001 Certification, SA 8000 Certification
            Services. IQCB gives value added assessment by its trained, quality
            conscious, experienced auditors & technical experts. IQCB provide
            unbiased auditing service with wide range of scopes to its clients.
          </Typography>

          <CustomButton btnName="Read More" />
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default IQCBAboutSec;
