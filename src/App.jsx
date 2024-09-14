import React from "react";
import "./index.css";
import Home from "./pages/Home/Home";
import Footer from "./pages/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbarmenu from "./components/Navbar/Navbarmenu";
import AboutRoutes from "./routes/AboutRoutes";
import Contact from "./pages/Contact/Contact";
import ScrollToTop from "./components/Scroll/ScrollToTop";
import GoToTop from "./components/GoToTop/GoToTop";
import Verification from "./pages/Verification/Verification";
import Services from "./pages/OurServices/Services";
import Accreditation from "./pages/Accreditation/Accreditation";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full height of the viewport
      }}
    >
      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Navbar */}
      <Navbarmenu />

      {/* Main content */}
      <Box sx={{ flex: 1 }}>
        <Routes>
          <>
            <Route path="/" element={<Home />} />

            {/* our about page */}
            <Route path="/about/*" element={<AboutRoutes />} />

            {/* our services page */}
            <Route path="/services" element={<Services />} />

            {/* our accreditation page */}
            <Route path="/accreditation" element={<Accreditation />} />

            {/* our verification page */}
            <Route path="/verification" element={<Verification />} />

            {/* our contact page */}
            <Route path="/contact" element={<Contact />} />
          </>
        </Routes>
      </Box>

      {/* scroll to top */}
      <GoToTop />

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default App;
