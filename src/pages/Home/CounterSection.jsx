import React from "react";
import CounterUpPage from "../../components/counterScroll/CounterUpPage";
import { Grid } from "@mui/material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { motion } from "framer-motion";
import l10 from "../../assets/images/IqcbImage/l10.jpg";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import HandshakeIcon from "@mui/icons-material/Handshake";

const CounterSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      viewport={{ once: false }}
      style={{ marginTop: 30 }}
    >
      <Grid
        container
        sx={{
          padding: {
            lg: "0px 110px 0px 110px",
            md: "0px 50px 0px 50px",
            sm: "0px 15px 0px 15px",
            xs: "0px 15px 0px 15px",
          },
          textAlign: "center",
          alignContent: "center",
          width: "100%",
          boxSizing: "border-box",
          height: "405px",
          overflow: "hidden",
          backgroundImage: `url(${l10})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid lg={3} md={4} sm={6} xs={6} mb={5}>
          <CounterUpPage
            Icon={CardMembershipIcon}
            value="1500"
            title="CERTIFICATION SERVICE"
          />
        </Grid>
        <Grid lg={3} md={4} sm={6} xs={6} mb={5}>
          <CounterUpPage
            Icon={SentimentSatisfiedAltIcon}
            value="132427"
            title="HAPPY CUSTOMERS"
          />
        </Grid>
        <Grid lg={3} md={4} sm={6} xs={6}>
          <CounterUpPage
            Icon={LocalMallIcon}
            value="585978"
            title="CLIENT APPLICATIONS"
          />
        </Grid>
        <Grid lg={3} md={4} sm={6} xs={6}>
          <CounterUpPage
            Icon={HandshakeIcon}
            value="178"
            title="BUSINESS PARTNERS"
          />
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default CounterSection;
