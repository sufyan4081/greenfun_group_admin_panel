import React from "react";
import Banner from "../../components/Banner/Banner";
import { motion } from "framer-motion";
import slider5 from "../../assets/images/mainSlider/slider5.jpg";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { prestigiousClient } from "../../data/data";

const PrestigiousClient = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      viewport={{ once: false }}
    >
      <Banner
        image={slider5}
        text="Our Prestigious Clients"
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
          {prestigiousClient.map((org, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${index + 1}. ${org}`}
                primaryTypographyProps={{ fontWeight: "bold" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </motion.div>
  );
};

export default PrestigiousClient;
