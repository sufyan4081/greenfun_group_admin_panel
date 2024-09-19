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
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import styled from "@emotion/styled";
import "bootstrap/dist/css/bootstrap.min.css";
import "jspdf-autotable";
import DownloadButton from "../../components/downloadButton/DownloadButton";
import SearchForm from "../../components/SearchForm";
import { addBlogCol } from "../../data/mockData";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.common.transparent,
    color: theme.palette.common.iconColor,
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden", // Hide overflowing text
    textOverflow: "ellipsis", // Show ellipsis (...) for overflow
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

const AddBlogTable = ({ blogData, allData }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  // For column filtering
  const [anchorEl, setAnchorEl] = useState(null);
  const defaultVisibleColumns = ["Title", "Image", "Actions"];
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

  // Media query for small screens
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedFormData, setSelectedFormData] = useState(null);

  // For delete user
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // notistack
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
    if (userIdToDelete) mutationDelete.mutate(userIdToDelete);
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => setShowDeleteConfirmation(false);

  // For view modal
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDataForView, setSelectedDataForView] = useState(null);

  const handleViewClick = (item) => {
    setSelectedDataForView(item);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => setViewModalOpen(false);

  const handleEditClick = (formData) => {
    setSelectedFormData(formData);
    setIsEditOpen(true);
  };

  const filteredData = blogData?.filter((item) =>
    item.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const iconColor = theme.palette.mode === "dark" ? "white" : "black";
  const transparentColor =
    theme.palette.mode === "dark" ? theme.palette.primary.main : "transparent";

  const totalLength = filteredData?.length || 0;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData?.slice(startIndex, endIndex);

  // Download Excel
  const handleDownloadExcel = () => {
    const filteredAndVisibleData = paginatedData?.map((item) =>
      addBlogCol
        .filter(
          (col) =>
            visibleColumns.includes(col.name) &&
            col.name !== "Actions" &&
            col.name.toLowerCase() !== "image"
        )
        .map((col) => item[col.name.toLowerCase()])
    );

    const ws = XLSX.utils.aoa_to_sheet([
      addBlogCol
        .filter((col) => visibleColumns.includes(col.name))
        .map((col) => col.name),
      ...filteredAndVisibleData,
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Blog Data.xlsx");
  };

  // Download PDF
  const handleDownloadPDFClick = () => {
    const doc = new jsPDF();
    const columns = [
      "Sr. No.",
      ...visibleColumns.filter((col) => col !== "Actions"),
    ];
    const rows = paginatedData?.map((item, index) => [
      index + 1,
      ...addBlogCol
        .filter((col) => visibleColumns.includes(col.name))
        .map((col) => item[col.name.toLowerCase()]),
    ]);

    handleDownloadPDF({ doc, tableHeading: "Blog Data", columns, rows });
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
        {/* Download buttons */}
        <DownloadButton
          columnFilter={handleFilterClick}
          handleDownloadPDF={handleDownloadPDFClick}
          handleDownloadExcel={handleDownloadExcel}
        />

        {/* Search Input */}
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          title="Search by title name"
        />

        {/* Column Filter */}
        <ColumnFilter
          columns={addBlogCol}
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
              {addBlogCol.map(
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
                  {addBlogCol.map(
                    (col, i) =>
                      visibleColumns.includes(col.name) && (
                        <StyledTableCell key={i}>
                          {col.name === "Image" ? (
                            <Tooltip title={item.title}>
                              <img
                                src={item[col.name.toLowerCase()]}
                                alt={item.title}
                                style={{ width: "50px", height: "50px" }}
                              />
                            </Tooltip>
                          ) : (
                            item[col.name.toLowerCase()]
                          )}
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
                  colSpan={addBlogCol.length + 2}
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
          width: "100%",
          padding: "0px !important",
          margin: { lg: "0", md: "0", sm: "0", xs: "10px 0px" },
          display: "flex",
          flexDirection: { lg: "row", md: "row", sm: "row", xs: "column" },
          justifyContent: "space-between",
          alignItems: {
            lg: "center",
            md: "center",
            sm: "center",
            xs: "flex-start",
          },
        }}
      >
        <Box>
          <Typography sx={{ pl: 1 }}>Total Blog : {totalLength}</Typography>
        </Box>
        <Box>
          {isSmallScreen ? (
            // Configuration for small screens
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalLength}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                "& .MuiTablePagination-toolbar": {
                  padding: "0px !important",
                  marginRight: "25px !important",
                },
                "& .MuiTablePagination-actions": {
                  padding: "0px !important",
                  margin: "0px !important",
                },
                "& .css-1hgjne-MuiButtonBase-root-MuiIconButton-root": {
                  padding: "0px 0px 0px 0px !important",
                  margin: "0px !important",
                },
              }}
            />
          ) : (
            // Configuration for larger screens
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={allData}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Box>
      </Box>

      {/* View modal */}
      <ViewModal
        open={viewModalOpen}
        onClose={handleCloseViewModal}
        data={selectedDataForView}
      />

      {/* Edit modal */}
      <EditDialogs
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        formData={selectedFormData}
        allData={allData}
      />

      {/* Delete confirmation modal */}
      <DeleteModal
        open={showDeleteConfirmation}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default AddBlogTable;
