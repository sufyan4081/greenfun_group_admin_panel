import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  useTheme,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link, Routes, useLocation, useRouteMatch } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ProfileIcon from "../UserProfile/ProfileIcon";
import SettingIcon from "../setting/SettingIcon";
import {
  SettingDropdown,
  screensData,
  settingDropdown,
  sideBarList,
} from "../../../data/mockData";
import SearchForm from "../../../components/SearchForm";
import { ColorModeContext } from "../../../theme";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ErrorPage from "../ErrorPage/ErrorPage";

const SubDropdown = ({
  subDropdownData,
  selectedDropdown,
  handleDropdownClick,
}) => (
  <ListItem
    sx={{
      display: "flex",
      flexDirection: "column",
    }}
  >
    {subDropdownData.map((subItem) => (
      <div key={subItem.label}>
        <ListItem
          onClick={() => handleDropdownClick(subItem.label)}
          style={{ cursor: "pointer" }}
          sx={{ padding: "0px 30px 5px 32px" }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>{subItem.icon}</ListItemIcon>
          <ListItemText>{subItem.label}</ListItemText>
        </ListItem>
      </div>
    ))}
  </ListItem>
);

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const design = true;
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [openDropdown, setOpenDropdown] = useState({});
  const [openSubDropdown, setOpenSubDropdown] = useState({}); // State for sub-dropdown

  const toggleDropdown = (index) => {
    setOpenDropdown((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleSubDropdown = (parentIndex, subIndex) => {
    setOpenSubDropdown((prevState) => ({
      ...prevState,
      [parentIndex]: {
        ...(prevState[parentIndex] || {}), // Ensure parent exists
        [subIndex]: !prevState[parentIndex]?.[subIndex],
      },
    }));
  };

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const openSettings = Boolean(anchorEl);

  const handleFilter = () => {
    return sideBarList
      .flatMap((item) => {
        if (item.subDropdownData) {
          return item.subDropdownData;
        }
        if (item.dropdownData) {
          return item.dropdownData.flatMap(
            (subItem) => subItem.subDropdownData || subItem
          );
        }
        return item;
      })
      .filter((subItem) =>
        subItem?.link?.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  useEffect(() => {
    setFilteredData(handleFilter());
  }, [searchQuery]);

  useEffect(() => {
    // Clear search query and filter results on route changes
    setSearchQuery("");
    setFilteredData([]);
  }, [location.pathname]);

  // Check current routes and hide topBar
  const isLoginPage = location.pathname === "/";
  const forgotPage = location.pathname === "/forgot-password";

  // Conditionally render the header based on the route
  if (forgotPage || isLoginPage) {
    return null; // Return null to hide the header
  }

  // ----------------------------------------------------------------------------------------------

  const handleDropdownClick = (label) => {
    setSelectedDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} height="65px">
      {/* SEARCH BAR */}
      <Box>
        <Box>
          <SearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            title="search here..."
            design={design}
          />
        </Box>

        {/* RESULTS */}
        <Box
          sx={{
            backgroundColor:
              searchQuery && filteredData.length > 0 ? "whitesmoke" : null,
            padding: "10px",
            maxHeight: "150px",
            overflowY: "auto",
            position: "relative",
            zIndex: "9999",
            width: design
              ? { lg: "250px", md: "200px", sm: "200px", xs: "138px" }
              : { lg: "200px", md: "200px", sm: "200px", xs: "138px" },
          }}
        >
          {searchQuery && filteredData.length > 0
            ? filteredData.map((item) => (
                <Box key={item.id}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={item?.link}
                  >
                    {item?.link}
                  </Link>
                  <hr />
                </Box>
              ))
            : searchQuery && (
                <p
                  style={{
                    backgroundColor: "whitesmoke",
                    // position: "relative",
                    // zIndex: "9999",
                  }}
                >
                  No data found
                </p>
              )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ProfileIcon />
      </Box>
    </Box>
  );
};

export default Topbar;
