import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Banner from "../../components/Banner/Banner";
import slider8 from "../../assets/images/mainSlider/slider8.jpg";

const Accreditation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      viewport={{ once: false }}
    >
      <Banner
        image={slider8}
        text="Accreditation"
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
            sm: "40px 15px 0px 15px",
            xs: "40px 15px 0px 15px",
          },
          textAlign: "center",
        }}
      >
        <Typography variant="body1" paragraph>
          IQCB Consultancy is accredited by UAF (United Accreditation
          Foundation) for all type of quality management certificate. UAF
          (United Accreditation Foundation) is member of International
          Accreditation Forum (IAF). The IAF is the world association of
          Conformity Assessment. Accreditation Bodies and other bodies
          interested in conformity assessment in the fields of management
          systems, products, services, personnel and other similar programmes
          conformity assessment. United Accreditation Foundation (UAF) is
          situated at 400, North Center, DR, STE 202, Norfolk, VA 23502, United
          States of America. United Accreditation Foundation Inc. (UAF) signed
          Memorandum of Understanding as Member with International Accreditation
          Forum (IAF) on 3rd November, 2016. IAF is a non-profit organisation
          which is involved in issuing guidance and guideline for ISO standards
          to enable the client, certification body and accreditation board to
          establish globally accepted principal for operation. IAF regulate
          thourgh membership and signing Multi-Lateral Agreement (MLA) with the
          Accreditation Board and Certification body. The IAF is the world
          association of Conformity Assessment Accreditation Bodies and other
          bodies interested in conformity assessment in the fields of management
          systems, products, services, personnel and other similar programmes of
          conformity assessment. Its primary function is to develop a single
          worldwide program of conformity assessment which reduces risk for
          business and its customers by assuring them that accredited
          certificates may be relied upon. Accreditation body and Regional
          Accreditation Group members of IAF are admitted to the IAF MLA only
          after a most stringent evaluation of their operations by a peer
          evaluation team which is charged to ensure that the applicant member
          complies fully with both the international standards and IAF
          requirements. Once an accreditation body is a signatory of the IAF MLA
          it is required to recognise the certificates issued by conformity
          assessment bodies accredited by all other signatories of the IAF MLA,
          with the appropriate scope. UAF is member of Pacific Accreditation
          Cooperation (PAC) . The PAC is an association of accreditation bodies
          and other interested parties whose objective is to facilitate trade
          and commerce among economies in the Asia Pacific region. It operates
          within the framework of the International Accreditation Forum (IAF)
          and in cooperation with other regional groups of accreditation bodies
          around the world.
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Accreditation;
