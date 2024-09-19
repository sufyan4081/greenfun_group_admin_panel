import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";

const SideBarBox = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation();
  // const [isLogin, setIsLogin] = useState(false)

  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/";
  const isForgotPage = location.pathname === "/forgot-password";

  // Conditionally render the header based on the route
  if (isLoginPage || isForgotPage) {
    // setIsLogin(true)
    return null; // Return null to hide the header
  }

  // ------------------------------------------------------------------------------------

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          backgroundColor: "darkgreen !important", // Dark green for the entire sidebar
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "darkgreen !important", // Dark green for the icons
        },
        "& .pro-inner-item": {
          padding: "0px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#fff !important", // White text on hover
          backgroundColor: "lightgreen !important", // Light green background on hover
        },
        "& .pro-menu-item.active": {
          color: "#fff !important", // White color for active items
        },
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        style={{
          backgroundColor: "darkgreen !important", // Dark green for the entire sidebar component
          width: isCollapsed ? "55px" : "192px",
          minWidth: "55px",
          height: "100vh",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              color: "white",
              width: isCollapsed ? "47px" : "190px",
              transition: "width 0.2s",
              padding: isCollapsed ? "0px 0px 0px 9px" : "0px 20px 0px 0px",
              backgroundColor: "darkgreen", // Dark green for the menu item
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Link to={"/"} variant="h3">
                  Greenfun
                </Link>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon
                    style={{ color: "white", padding: "0px" }}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box
            paddingLeft={isCollapsed ? undefined : "0%"}
            style={{ padding: "0px" }}
          >
            <SidebarItem />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBarBox;
