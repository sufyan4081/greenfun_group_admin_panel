import React from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { quickLinks } from "../../data/data";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#030915",
        color: "white",
        mt: 6,
        textAlign: "center",
        alignContent: "center",
      }}
    >
      <Grid container spacing={2} p={2}>
        {/* Quick Links */}
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
          item
          xs={12}
          sm={6}
          md={3}
          lg={4}
        >
          {quickLinks &&
            quickLinks?.map((item, i) => (
              <Typography
                component={Link}
                sx={{
                  textAlign: {
                    lg: "left",
                    md: "left",
                    sm: "center",
                    xs: "center",
                  },
                }}
                className="custom_link"
                to={item.link}
              >
                {item.listName}
              </Typography>
            ))}
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={4}
          sx={{ textAlign: "center", alignContent: "center" }}
        >
          <IconButton
            component={Link}
            sx={{
              "&:hover": { backgroundColor: "#1877F2" },
            }}
            color="inherit"
            to={"https://www.facebook.com/greenfunfoundation/"}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            sx={{
              "&:hover": { backgroundColor: "#1DA1F2" },
            }}
            color="inherit"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={"https://www.instagram.com/greenfunfoundation/"}
            sx={{
              "&:hover": { backgroundColor: "#FCAF45" },
            }}
            color="inherit"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={"https://www.youtube.com/channel/UCCNAP1PDllBbrdhYuo4uioQ"}
            sx={{
              "&:hover": { backgroundColor: "#FF0000" },
            }}
            color="inherit"
          >
            <YouTubeIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={"https://www.linkedin.com/company/greenfun-foundation"}
            sx={{
              "&:hover": { backgroundColor: "#0077B5" },
            }}
            color="inherit"
          >
            <LinkedInIcon />
          </IconButton>
        </Grid>

        {/* Logo  */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={4}
          sx={{ textAlign: "center", alignContent: "center" }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Greenfun Foundation
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          textAlign: "center",
          borderTop: "1px solid white",
          padding: { lg: "15px", md: "15px", sm: "10px", xs: "10px" },
        }}
      >
        <Typography variant="body2">
          © 2021 Greenfun Foundation | Developed By{" "}
          <Link
            to="https://tsoftware.in/"
            target="_blank"
            style={{ fontWeight: "bold", color: "blue", cursor: "pointer" }}
          >
            T Software
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
