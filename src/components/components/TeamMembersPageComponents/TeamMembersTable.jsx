import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import UploadModal from "./UploadModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.primary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const TeamMembersTable = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false); // New state for upload modal
  const [editData, setEditData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/employeesData")
      .then((response) => {
        setEmployeesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleEdit = (employee) => {
    setEditData(employee);
    setEditModalOpen(true);
  };

  const handleSave = (updatedEmployee) => {
    axios
      .put(
        `http://localhost:8000/employeesData/${updatedEmployee.id}`,
        updatedEmployee
      )
      .then((response) => {
        setEmployeesData((prevData) =>
          prevData.map((emp) =>
            emp.id === updatedEmployee.id ? response.data : emp
          )
        );
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
        alert("Failed to update employee. Please try again.");
      });
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleAddSave = (newEmployee) => {
    axios
      .post("http://localhost:8000/employeesData", newEmployee)
      .then((response) => {
        setEmployeesData((prevData) => [...prevData, response.data]);
        setAddModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding data: ", error);
        alert("Failed to add employee. Please try again.");
      });
  };

  const handleAddClose = () => {
    setAddModalOpen(false);
  };

  const handleUploadOpen = () => {
    setUploadModalOpen(true);
  };

  const handleUploadSave = (newData) => {
    newData.forEach((employee) => {
      axios
        .post("http://localhost:8000/employeesData", employee)
        .then((response) => {
          setEmployeesData((prevData) => [...prevData, response.data]);
        })
        .catch((error) => {
          console.error("Error adding data: ", error);
          alert("Failed to add employee. Please try again.");
        });
    });
    setUploadModalOpen(false);
  };

  const handleUploadClose = () => {
    setUploadModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(employeesData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "employees_list.xlsx");
  };

  const filteredData = employeesData.filter(
    (row) =>
      row.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.Grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.Designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.Project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.Skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.Location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.ContactNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ paddingRight: 10, paddingLeft: 10 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "var(--lt-color-gray-400)" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="inherit"
              noWrap
              sx={{ color: "black", display: { xs: "none", sm: "block" } }}
            >
              Employee
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{
                  "aria-label": "search",
                  style: { color: "black" },
                }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Search>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Add Employee">
              <IconButton
                onClick={handleAdd}
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  "&:hover": { backgroundColor: "darkblue" },
                  marginRight: "8px", // Space between Add and Upload
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Upload Employee List">
              <IconButton
                onClick={handleUploadOpen}
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "darkred" },
                  marginRight: "8px", // Space between Upload and Download
                }}
              >
                <UploadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download Employee List">
              <IconButton
                onClick={handleDownload}
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  "&:hover": { backgroundColor: "darkgreen" },
                }}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>EmpID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Grade</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Project</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Skills</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>ContactNo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredData
            ).map((row) => (
              <TableRow key={row.EmpId}>
                <TableCell component="th" scope="row">
                  {row.EmpId}
                </TableCell>
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row.Grade}</TableCell>
                <TableCell>{row.Designation}</TableCell>
                <TableCell>{row.Project}</TableCell>
                <TableCell>{row.Skills}</TableCell>
                <TableCell>{row.Location}</TableCell>
                <TableCell>{row.ContactNo}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="Edit Employee List">
                      <IconButton
                        sx={{ color: "blue", "&:hover": { color: "darkblue" } }}
                        onClick={() => handleEdit(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={9} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={9}
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {editModalOpen && (
        <EditModal
          open={editModalOpen}
          handleClose={handleCloseModal}
          employee={editData}
          handleSave={handleSave}
        />
      )}

      <AddModal
        open={addModalOpen}
        handleClose={handleAddClose}
        handleSave={handleAddSave}
      />

      <UploadModal
        open={uploadModalOpen}
        handleClose={handleUploadClose}
        handleSave={handleUploadSave}
      />
    </Box>
  );
};

export default TeamMembersTable;
