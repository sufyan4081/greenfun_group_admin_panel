import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import ViewModalTitle from "../../components/ViewModalTitle";

const ViewModal = ({ open, onClose, data }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" data-aos="fade">
      <ViewModalTitle data={data?.title} />
      <DialogContent sx={{ padding: "16px" }}>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <b>Title:</b> {data?.title}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <b>Header Title:</b> {data?.headerTitle}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <b>Date:</b> {data?.date}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <b>Video:</b> {data?.video}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModal;
