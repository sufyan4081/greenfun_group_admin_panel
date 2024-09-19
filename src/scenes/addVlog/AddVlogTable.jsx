import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { styled } from "@mui/system";
import "bootstrap/dist/css/bootstrap.min.css";
import "jspdf-autotable";
import DownloadButton from "../../components/downloadButton/DownloadButton";
import SearchForm from "../../components/SearchForm";
import { addVlogCol } from "../../data/mockData";
import ViewModal from "./ViewModal";
import EditDialogs from "../../components/EditDialogs/EditDialogs";
import { deleteSubject } from "../../api/addControl/boardType/subject_api";
import { QueryKeys } from "../../utils/QueryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import DeleteModal from "../../components/DeleteModal";
import ColumnFilter from "../../components/ColumnFilter/ColumnFilter";
import { handleDownloadPDF } from "../../components/DownloadPDF/handleDownloadPDF";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.common.transparent,
    color: theme.palette.common.iconColor,
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AddVlogTable = ({ vlogData, allData }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  // for filter column
  const [anchorEl, setAnchorEl] = useState(null);
  const defaultVisibleColumns = ["Header Title", "Video", "Actions"];
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);

  const handleToggleColumn = (columnName) => {
    const newVisibleColumns = visibleColumns.includes(columnName)
      ? visibleColumns.filter((col) => col !== columnName)
      : [...visibleColumns, columnName];

    setVisibleColumns(newVisibleColumns);
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const queryClient = useQueryClient();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedFormData, setSelectedFormData] = useState(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // delete data mutation
  const mutationDelete = useMutation({
    mutationFn: deleteSubject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.blog });
      enqueueSnackbar("Data deleted successfully", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)} color="success">
            <CloseIcon />
          </Button>
        ),
      });
    },
  });

  const handleDeleteClick = (userId) => {
    setShowDeleteConfirmation(true);
    setUserIdToDelete(userId);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete) {
      mutationDelete.mutate(userIdToDelete);
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDataForView, setSelectedDataForView] = useState(null);

  const handleViewClick = (item) => {
    setSelectedDataForView(item);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
  };

  const handleEditClick = (formData) => {
    setSelectedFormData(formData);
    setIsEditOpen(true);
  };

  const filteredData = vlogData?.filter((item) =>
    item.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const iconColor = theme.palette.mode === "dark" ? "white" : "black";
  const transparentColor =
    theme.palette.mode === "dark" ? theme.palette.primary.main : "transparent";

  const totalLength = filteredData && filteredData?.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData?.slice(startIndex, endIndex);

  const handleDownloadExcel = () => {
    const filteredAndVisibleData = paginatedData?.map((item, index) =>
      addVlogCol
        .filter(
          (col) =>
            visibleColumns.includes(col.name) &&
            col.name !== "Actions" &&
            col.name.toLowerCase() !== "video"
        )
        .map((col) => {
          if (col.name.toLowerCase() === "header title" && item.title) {
            return `${item.title}`;
          }
          if (col.name.toLowerCase() === "date" && item.date) {
            return `${item.date}`;
          } else return item[col.name.toLowerCase()];
        })
    );

    const ws = XLSX.utils.aoa_to_sheet([
      addVlogCol
        .filter(
          (col) =>
            visibleColumns.includes(col.name) &&
            col.name !== "Actions" &&
            col.name.toLowerCase() !== "video link" &&
            col.name !== "Videos"
        )
        .map((col) => col.name),
      ...filteredAndVisibleData,
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "Vlog Data.xlsx");
  };

  const handleDownloadPDFClick = () => {
    const doc = new jsPDF();
    const columns = [
      "Sr. No.",
      ...visibleColumns.filter(
        (col) => col !== "Actions" && col.toLowerCase() !== "video"
      ),
    ];
    const rows = paginatedData?.map((item, index) => {
      const rowData = [
        index + 1,
        ...addVlogCol
          .filter(
            (col) =>
              visibleColumns.includes(col.name) &&
              col.name !== "Actions" &&
              col.name.toLowerCase() !== "video link" &&
              col.name !== "Videos"
          )
          .map((col) => {
            if (col.name.toLowerCase() === "headerTitle" && item.headerTitle) {
              return `${item.headerTitle}`;
            }
            if (col.name.toLowerCase() === "date" && item.date) {
              return `${item.date}`;
            } else return item[col.name.toLowerCase()];
          }),
      ];

      return rowData;
    });

    handleDownloadPDF({
      doc,
      tableHeading: "Vlog Data",
      columns,
      rows,
    });
  };

  return (
    <div>
      <Box
        sx={{
          margin: "20px 0 10px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <DownloadButton
          columnFilter={handleFilterClick}
          handleDownloadPDF={handleDownloadPDFClick}
          handleDownloadExcel={handleDownloadExcel}
        />

        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          title="Search by title name"
        />

        <ColumnFilter
          columns={addVlogCol}
          visibleColumns={visibleColumns}
          onToggleColumn={handleToggleColumn}
          anchorEl={anchorEl}
          onClose={handleFilterClose}
        />
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: transparentColor,
          border: 1,
          minWidth: "100% !important",
        }}
      >
        <Table aria-label="customized table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr.No.</StyledTableCell>
              {addVlogCol.map(
                (col, i) =>
                  visibleColumns.includes(col.name) &&
                  col.name !== "Actions" && (
                    <StyledTableCell key={i} align="center">
                      {col.name}
                    </StyledTableCell>
                  )
              )}
              {visibleColumns.includes("Actions") && (
                <StyledTableCell>Actions</StyledTableCell>
              )}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {paginatedData?.length > 0 ? (
              paginatedData.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{startIndex + index + 1}</StyledTableCell>
                  {addVlogCol.map(
                    (col, i) =>
                      visibleColumns.includes(col.name) && (
                        <StyledTableCell key={i}>
                          {(() => {
                            if (
                              col.name.toLowerCase() === "header title" &&
                              item.headerTitle
                            ) {
                              return `${item.headerTitle}`;
                            } else if (
                              col.name.toLowerCase() === "date" &&
                              item.date
                            ) {
                              return `${item.date}`;
                            } else if (
                              col.name.toLowerCase() === "videos" &&
                              item.videos
                            ) {
                              return item.videos.map((video, i) => (
                                <div key={video._id}>
                                  <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download={`video${video.order}`} // Optionally set download attribute
                                  >
                                    Download Video {video.order}
                                  </a>
                                </div>
                              ));
                            } else if (
                              col.name.toLowerCase() === "video link" &&
                              item.videoLink === ""
                            ) {
                              return "No data available";
                            } else if (
                              col.name.toLowerCase() === "video link" &&
                              item.videoLink.length > 0
                            ) {
                              return item.videoLink.map((video, i) => (
                                <div key={i}>
                                  <a
                                    href={`${video}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {`Watch Video ${i + 1}`}
                                  </a>
                                </div>
                              ));
                            } else {
                              return "No data available";
                            }
                          })()}
                        </StyledTableCell>
                      )
                  )}
                  <StyledTableCell>
                    <Button onClick={() => handleViewClick(item)} title="View">
                      <VisibilityIcon sx={{ color: iconColor }} />
                    </Button>
                    <Button onClick={() => handleEditClick(item)} title="Edit">
                      <ModeEditIcon sx={{ color: iconColor }} />
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(item.id)}
                      title="Delete"
                    >
                      <DeleteIcon sx={{ color: iconColor }} />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell
                  colSpan={addVlogCol.length + 2}
                  sx={{ textAlign: "center" }}
                >
                  No matching records found.
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Total records: {totalLength}
        </Typography>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={totalLength}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <ViewModal
        open={viewModalOpen}
        onClose={handleCloseViewModal}
        data={selectedDataForView}
      />
      <EditDialogs
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        formData={selectedFormData}
      />
      <DeleteModal
        open={showDeleteConfirmation}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to delete this record?"
      />
    </div>
  );
};

export default AddVlogTable;
