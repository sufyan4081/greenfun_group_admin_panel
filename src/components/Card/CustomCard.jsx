import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { red } from "@mui/material/colors";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import CustomButton from "../Button/CustomButton";
import ImageModal from "../modal/ImageModal";

const CustomCard = ({
  variants,
  data,
  header,
  media,
  content,
  action,
  reactPlayer,
  cardWidth,
  cardHeight,
  imgWidth,
  imgHeight,
  lg,
  md,
  sm,
  xs,
  objectFit,
  cardMediaPt,
  titleColor,
  titleHeight,
  titleVariant,
}) => {
  const [open, setOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(false);
  const handleOpen = (item) => {
    console.log("item", item); // Logging the entire item object
    setOpen(true);
    setModalContent(item); // Setting the entire item object in the modal content
  };

  const handleClose = () => setOpen(false);
  return (
    <Grid
      container
      sx={{ flexGrow: 1 }}
      justifyContent="center"
      alignItems="center"
    >
      {data.map((item, index) => {
        // Select animation variant based on card index
        let animationVariant;
        if (index % 3 === 0) {
          animationVariant = "fadeLeft";
        } else if (index % 3 === 1) {
          animationVariant = "fadeIn";
        } else {
          animationVariant = "fadeRight";
        }
        return (
          <Grid
            item
            key={index} // Add a unique key prop for each Grid item
            lg={lg}
            md={md}
            sm={sm}
            xs={xs}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }} // Apply flexbox to all grid items
          >
            {/* Framer Motion Wrapper */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={variants[animationVariant]} // Apply the selected animation variant
            >
              <Card
                sx={{
                  width: cardWidth,
                  height: cardHeight,
                  mb: 3,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Adding box shadow
                  "&:hover": {
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)", // Adding hover effect
                  },
                }}
              >
                {header && (
                  <CardHeader
                    sx={{ textAlign: "left !important" }}
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="blog">
                        {item.headerTitle && item.headerTitle[0]}
                      </Avatar>
                    }
                    title={item.headerTitle && item.headerTitle}
                    subheader={item.date && item.date}
                  />
                )}
                {reactPlayer && (
                  <ReactPlayer
                    playing={false}
                    controls={true}
                    volume={1}
                    width="100%"
                    height="300px"
                    url="https://www.youtube.com/watch?v=dtZuqD8mulo"
                  />
                )}
                {media && (
                  <CardMedia
                    sx={{
                      height: imgHeight,
                      width: imgWidth,
                      objectFit: objectFit, //
                      paddingTop: cardMediaPt, //
                      transition: "transform 0.8s ease-in-out", // Smooth transition for zoom
                      "&:hover": {
                        transform: "scale(1.1)", // Zoom effect on hover
                      },
                    }}
                    onClick={() => handleOpen(item)}
                    component="img"
                    image={item.image}
                    title={item.title}
                  />
                )}
                {content && (
                  <CardContent>
                    <Typography
                      sx={{
                        height: item.content && titleHeight,
                        color: titleColor,
                        fontWeight: "bold",
                      }} //color //height:100 thi ab
                      gutterBottom
                      variant={titleVariant} //
                      component="div"
                    >
                      {item.title}
                    </Typography>

                    {
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ color: "text.secondary" }}
                      >
                        {item.content && item.content}
                      </Typography>
                    }
                  </CardContent>
                )}

                {action && (
                  <CardActions
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <CustomButton btnName="View More" btnSize="small" />
                  </CardActions>
                )}
              </Card>
            </motion.div>
          </Grid>
        );
      })}

      {open && (
        <ImageModal open={open} handleClose={handleClose} data={modalContent} />
      )}
    </Grid>
  );
};

export default CustomCard;
