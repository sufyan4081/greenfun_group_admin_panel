import React from "react";
import Banner from "../../components/Banner/Banner";
import { motion } from "framer-motion";
import slider7 from "../../assets/images/mainSlider/slider7.png";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { logoRules } from "../../data/data";

const LogoRules = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      viewport={{ once: false }}
    >
      <Banner
        image={slider7}
        text="Rules For Logo Use"
        textColor="white"
        fontSize="2rem"
        textAlign="center"
        fontWeight="bold"
      />

      <Box
        sx={{
          padding: {
            lg: "40px 50px 0px 50px",
            md: "40px 50px 0px 50px",
            sm: "40px 10px 0px 10px",
            xs: "40px 10px 0px 10px",
          },
        }}
      >
        <List>
          {logoRules.map((rule, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${index + 1}. ${rule}`}
                primaryTypographyProps={{ fontWeight: "bold" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </motion.div>
  );
};

export default LogoRules;
