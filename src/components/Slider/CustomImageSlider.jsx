import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";

const CustomImageSlider = ({ data, containerHeight, imgHeight }) => {
  // Detect screen size using Material UI's useMediaQuery
  const isLg = useMediaQuery("(min-width:1200px)");
  const isMd = useMediaQuery("(min-width:900px)");

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Show 3 images at once
    slidesToScroll: 1, // Scroll 1 image at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Autoplay speed in milliseconds (2000ms = 2 seconds)
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // Adjust settings for different screen sizes
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <motion.div
      style={{
        overflow: "hidden",
        textAlign: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
    >
      <Slider {...settings}>
        {data.map((item, i) => (
          <div key={i}>
            <img
              src={item.image}
              alt="slider [i]"
              style={{
                width: "100%",
                height: isLg || isMd ? imgHeight : 150,
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </Slider>
    </motion.div>
  );
};

export default CustomImageSlider;
