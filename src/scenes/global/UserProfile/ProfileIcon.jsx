import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { profileList } from "../../../data/mockData";
import { supabase } from "../../../client";
const ProfileIcon = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme();

  //for profile link color
  const iconColor = theme.palette.mode === "dark" ? "white" : "black";

  //for open and closed dropdown of profile icon
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function signOut() {
    sessionStorage.removeItem("token");
    const { error } = await supabase.auth.signOut();
  }

  return (
    <>
      <IconButton title="Profile" onClick={handleOpenUserMenu}>
        <Avatar sx={{ height: "27px", width: "30px" }} />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {profileList.map((list, i) => (
          <MenuItem
            key={i}
            onClick={list.label === "Logout" ? signOut : handleCloseUserMenu}
          >
            <Link to={list.link} style={{ textDecoration: "none" }}>
              <Typography sx={{ color: iconColor }} textAlign="center">
                {list.label}
              </Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ProfileIcon;
