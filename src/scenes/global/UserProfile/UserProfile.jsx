import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import "./single.css";
import { mockDataTeam } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useState } from "react";

const UserProfile = React.forwardRef((props, ref) => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    position: "Admin",
    password: "Admin@123",
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = () => {
    // Implement the logic to update the user profile
  };

  return (
    <>
      <Box m="20px">
        <Header title="My Profile" subtitle="ALL DETAILS HERE" />
        <Container
          maxWidth={false}
          align="center"
          ref={ref}
          className="my-print-page"
          sx={{ marginTop: "-30px" }}
        >
          {/* <Box sx={{ maxWidth: 700 }}>
            <TableContainer
              component={Paper}
              sx={{ maxWidth: 700, backgroundColor: "transparent" }}
            >
              <Table aria-label="caption table">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ p: 3 }} component="th" scope="row">
                      Name
                    </TableCell>
                    <TableCell align="left">
                      {mockDataTeam[0]?.fullName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ p: 3 }} component="th" scope="row">
                      Email
                    </TableCell>
                    <TableCell align="left">{mockDataTeam[0]?.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ p: 3 }} component="th" scope="row">
                      Phone
                    </TableCell>
                    <TableCell align="left">
                      {mockDataTeam[0]?.phoneNumber}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box> */}

          <fieldset style={{ border: "1px solid grey", width: "400px" }}>
            <legend
              style={{
                float: "none",
                width: "auto",
                margin: "17px auto",
                padding: "0 5px 0 5px",
                fontSize: ".8rem",
              }}
            >
              <Avatar>
                {/* Replace the src attribute with the URL of the user's profile image */}
                <img src="profile-image.jpg" alt="User Avatar" />
              </Avatar>
            </legend>

            <Typography component="h1" variant="h5">
              User Profile
            </Typography>

            {/* fullName and phoneNumber */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "350px",
                margin: "10px 0px 10px 0px",
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                size="small"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                size="small"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Phone Number"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                size="small"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                size="small"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Position"
                name="position"
                value={user.position}
                onChange={handleInputChange}
                size="small"
              />

              <Button
                className="common-button"
                variant="contained"
                sx={{ width: "200px" }}
              >
                Update Profile
              </Button>
            </Box>
          </fieldset>
        </Container>
      </Box>
    </>
  );
});

export default UserProfile;
