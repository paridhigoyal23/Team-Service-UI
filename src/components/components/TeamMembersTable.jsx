// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';
// import TableHead from '@mui/material/TableHead';
// import EditIcon from '@mui/icons-material/Edit';
// import AddIcon from '@mui/icons-material/Add';
// import UploadIcon from '@mui/icons-material/Upload';
// import DownloadIcon from '@mui/icons-material/Download';
// import SearchIcon from '@mui/icons-material/Search';
// import { Tooltip } from '@mui/material';
// import Typography from '@mui/material/Typography';
// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import InputBase from '@mui/material/InputBase';
// import EditModal from './EditModal'; // Make sure to import the EditModal component

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 50,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(2),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// function TablePaginationActions(props) {
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onPageChange } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

// const TeamMembersTable = () => {
//   const [employeesData, setEmployeesData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editData, setEditData] = useState({});
// //fetch data from api
//   useEffect(() => {
//     axios.get('http://localhost:8000/employeesData')
//       .then(response => {
//         setEmployeesData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data: ', error);
//       });
//   }, []);
// //handles edit on licking the edit icon
//   const handleEdit = (employee) => {
//     setEditData(employee);
//     setEditModalOpen(true);
//   };
// //saves the edited data in the api
//   const handleSave = (updatedEmployee) => {
//     axios.put(`http://localhost:8000/employeesData/${updatedEmployee.id}`, updatedEmployee)
//       .then(response => {
//         setEmployeesData((prevData) =>
//           prevData.map(emp => emp.id === updatedEmployee.id ? response.data : emp)
//         );
//         setEditModalOpen(false);
//       })
//       .catch(error => {
//         console.error('Error updating data: ', error);
//         alert('Failed to update employee. Please try again.');
//       });
//   };
// //to close the edit modal
//   const handleCloseModal = () => {
//     setEditModalOpen(false);
//   };
// //for searching the data
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };
// //filtering the data according to the search
//   const filteredData = employeesData.filter((row) =>
//     row.Name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ paddingRight: 20, paddingLeft: 20 }}>
//       <AppBar position='static'>
//         <Toolbar display='flex' justifycontent='flex-end'>
//           <Typography
//             variant='inherit'
//             noWrap
//             sx={{ color: '', display: { xs: 'none', sm: 'block' } }}
//           >
//             Employee
//           </Typography>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ 'aria-label': 'search' }}
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//           </Search>
//           <Tooltip title="Add Employee">
//             <IconButton
//               style={{ marginLeft: '400px' }}
//               sx={{
//                 backgroundColor: 'blue',
//                 color: 'white',
//                 '&:hover': { backgroundColor: 'darkblue' }
//               }}
//             >
//               <AddIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Upload Employee List">
//             <IconButton
//               style={{ marginLeft: '8px' }}
//               sx={{
//                 backgroundColor: 'red',
//                 color: 'white',
//                 '&:hover': { backgroundColor: 'darkred' }
//               }}
//             >
//               <UploadIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Download Employee List">
//             <IconButton
//               style={{ marginLeft: '8px' }}
//               sx={{
//                 backgroundColor: 'green',
//                 color: 'white',
//                 '&:hover': { backgroundColor: 'darkred' }
//               }}
//             >
//               <DownloadIcon />
//             </IconButton>
//           </Tooltip>
//         </Toolbar>
//       </AppBar>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold' }}>EmpID</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Grade</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Designation</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Project</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Skills</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>ContactNo</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {(rowsPerPage > 0
//               ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               : filteredData
//             ).map((row) => (
//               <TableRow key={row.EmpId}>
//                 <TableCell component="th" scope="row">{row.EmpId}</TableCell>
//                 <TableCell>{row.Name}</TableCell>
//                 <TableCell>{row.Grade}</TableCell>
//                 <TableCell>{row.Designation}</TableCell>
//                 <TableCell>{row.Project}</TableCell>
//                 <TableCell>{row.Skills}</TableCell>
//                 <TableCell>{row.Location}</TableCell>
//                 <TableCell>{row.ContactNo}</TableCell>
//                 <TableCell>
//                   <Tooltip title="Edit Employee List">
//                     <IconButton
//                       sx={{ color: 'blue', '&:hover': { color: 'darkblue' } }}
//                       onClick={() => handleEdit(row)}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {emptyRows > 0 && (
//               <TableRow style={{ height: 53 * emptyRows }}>
//                 <TableCell colSpan={9} />
//               </TableRow>
//             )}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//                 colSpan={9}
//                 count={filteredData.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 slotProps={{
//                   select: {
//                     inputProps: {
//                       'aria-label': 'rows per page',
//                     },
//                     native: true,
//                   },
//                 }}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 ActionsComponent={TablePaginationActions}
//               />
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
// {/* edit modal opens here*/}
//       {editData && (
//         <EditModal
//           open={editModalOpen}
//           handleClose={handleCloseModal}
//           employee={editData}
//           handleSave={handleSave}
//         />
//       )}
//     </Box>
//   );
// }

// export default TeamMembersTable;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import { Tooltip, Modal, Typography, AppBar, Toolbar, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import EditModal from './EditModal';
import AddModal from './AddModal';

// Styling for the search bar in the table header
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 50,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Pagination component for the footer of the table
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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/employeesData')
      .then(response => {
        setEmployeesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleEdit = (employee) => {
    setEditData(employee);
    setEditModalOpen(true);
  };

  const handleDelete = async (empId) => {
    try {
      // Send a DELETE request to remove the employee data with the specified ID
      const response = await axios.delete(`http://localhost:8000/employeesData/${empId}`);
  
      if (response.status === 200) {
        // Update the local state to remove the deleted employee from the list
        setEmployeesData(employeesData.filter((employee) => employee.EmpId !== empId));
        console.log(`Employee with ID ${empId} deleted successfully`);
      } else {
        console.error('Failed to delete employee:', response);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSave = (updatedEmployee) => {
    axios.put(`http://localhost:8000/employeesData/${updatedEmployee.id}`, updatedEmployee)
      .then(response => {
        setEmployeesData((prevData) =>
          prevData.map(emp => emp.id === updatedEmployee.id ? response.data : emp)
        );
        setEditModalOpen(false);
      })
      .catch(error => {
        console.error('Error updating data: ', error);
        alert('Failed to update employee. Please try again.');
      });
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleAddSave = (newEmployee) => {
    axios.post('http://localhost:8000/employeesData', newEmployee)
      .then(response => {
        setEmployeesData((prevData) => [...prevData, response.data]);
        setAddModalOpen(false);
      })
      .catch(error => {
        console.error('Error adding data: ', error);
        alert('Failed to add employee. Please try again.');
      });
  };

  const handleAddClose = () => {
    setAddModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = employeesData.filter((row) =>
    row.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ paddingRight: 20, paddingLeft: 20 }}>
      <AppBar position='static'>
        <Toolbar display='flex' justifycontent='flex-end'>
          <Typography
            variant='inherit'
            noWrap
            sx={{ color: '', display: { xs: 'none', sm: 'block' } }}
          >
            Employee
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
          <Tooltip title="Add Employee">
            <IconButton
              onClick={handleAdd}
              style={{ marginLeft: '400px' }}
              sx={{
                backgroundColor: 'blue',
                color: 'white',
                '&:hover': { backgroundColor: 'darkblue' }
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Upload Employee List">
            <IconButton
              style={{ marginLeft: '8px' }}
              sx={{
                backgroundColor: 'red',
                color: 'white',
                '&:hover': { backgroundColor: 'darkred' }
              }}
            >
              <UploadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Employee List">
            <IconButton
              style={{ marginLeft: '8px' }}
              sx={{
                backgroundColor: 'green',
                color: 'white',
                '&:hover': { backgroundColor: 'darkred' }
              }}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>EmpID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Grade</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Project</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Skills</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ContactNo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredData
            ).map((row) => (
              <TableRow key={row.EmpId}>
                <TableCell component="th" scope="row">{row.EmpId}</TableCell>
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row.Grade}</TableCell>
                <TableCell>{row.Designation}</TableCell>
                <TableCell>{row.Project}</TableCell>
                <TableCell>{row.Skills}</TableCell>
                <TableCell>{row.Location}</TableCell>
                <TableCell>{row.ContactNo}</TableCell>
                <TableCell>
                  <Tooltip title="Edit Employee List">
                    <IconButton
                      sx={{ color: 'blue', '&:hover': { color: 'darkblue' } }}
                      onClick={() => handleEdit(row)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Employee">
                    <IconButton
                      sx={{ color: 'red', '&:hover': { color: 'darkred' } }}
                      onClick={() => handleDelete(row.id)}
                    >
                      <HighlightOffOutlinedIcon />
                    </IconButton>
                  </Tooltip>
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
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={9}
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
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

      {editData && (
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
    </Box>
  );
}

export default TeamMembersTable;
