import React from "react";
import { Routes, Route } from "react-router-dom";
import AboutUs from "../pages/About/AboutUs";
import InternationalPresence from "../pages/About/InternationalPresence";
import PrestigiousClient from "../pages/About/PrestigiousClient";
import CertificationProcess from "../pages/About/CertificationProcess";
import LogoRules from "../pages/About/LogoRules";
const AboutRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/about-us" element={<AboutUs />} />
        <Route
          path="/international-presence"
          element={<InternationalPresence />}
        />
        <Route path="/prestigious-client" element={<PrestigiousClient />} />
        <Route
          path="/certification-process"
          element={<CertificationProcess />}
        />
        <Route path="/logo-rules" element={<LogoRules />} />
      </Routes>
    </div>
  );
};

export default AboutRoutes;
