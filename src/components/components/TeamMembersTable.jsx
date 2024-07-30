import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

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
import TableHead  from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import {TextField,Tooltip} from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'; 
import InputBase from '@mui/material/InputBase';

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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
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

function createData(EmpId,Name,Grade,Designation,Project,Skills,Location,ContactNo) {
  return { EmpId,Name,Grade,Designation,Project,Skills,Location,ContactNo };
}

const rows = [
  createData(123456,'Pernika', 'A1','Sn.Software Engineer','Team Services','Java','Noida','75754-86584'),
  createData(123457,'Yash', 'A1','Jn.Software Engineer','Team Services','Java','Noida','75785-78686'),
  createData(123459,'Megha', 'A3','Software Engineer','Feedback Portal','Angular JS','Noida','73683-83273'),
  createData(123452,'Vishal', 'A1','Module Lead','Team Services','React JS','Noida','73862-84687'),
  createData(123451,'Nidhi', 'A1','Teach Lead','Team Services','Angular JS','Noida','75736-48667'),
]

export default function TeamMembersTable() {

  const handleEdit=(EmpId) => {
    console.log(`Edit item with EmpId: ${EmpId}`);
    // Implement edit functionality here
  };
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // // Filter data based on search term
  // const filteredData = data.filter(row =>
  //   row.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Fetching data by creating hooks and axios
  //using useState to put items into table
  const [data, setData] = useState([])

  // Using useEffect to use db.json
  useEffect(() => {
    axios.get("http://localhost:5050/TeamMemberTable")
    .then(response => setData(response.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <Box sx={{ paddingRight:20,paddingLeft:20}}>
      {/* Toolbar with search bar and icons */}
      {/* <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2, 
        justifyContent: 'flex-end'
      }}> */}
        <AppBar  position='static'>
          <Toolbar display='flex' justifyContent='flex-end'>
          <Typography
            variant='inherit'
            noWrap
            sx={{ color:'' ,display: { xs: 'none', sm: 'block' } }}
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
            />
          </Search>
        
       {/* <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <IconButton sx={{ padding: 1}}>
                <SearchIcon />
              </IconButton>
            ),
          }}/> */}

        <Tooltip  title="Add Employee">
          <IconButton style={{ marginLeft: '400px' }} sx={{backgroundColor: 'blue', color: 'white','&:hover': {backgroundColor: 'darkblue'}}}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Upload Employee List">
          <IconButton style={{ marginLeft: '8px' }} sx={{backgroundColor: 'red', color: 'white','&:hover': {backgroundColor: 'darkred'}}}>
            <UploadIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download Employee List">
          <IconButton style={{ marginLeft: '8px' }} sx={{backgroundColor: 'green', color: 'white','&:hover': {backgroundColor: 'darkred'}}}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
        </Toolbar>
        </AppBar>
      {/* </Box> */}

    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead >
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>EmpID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} >Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} >Grade</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} >Designation</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} >Project</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} >Skills</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} >Location</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} >ContactNo</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} >Actions</TableCell>
          </TableRow>
        </TableHead>

  {/* Here data is coming from db.json file */}
        <TableBody>{
          data.map((TeamMemberTable, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">{TeamMemberTable.EmpID}</TableCell>
              <TableCell>{TeamMemberTable.Name}</TableCell>
              <TableCell>{TeamMemberTable.Grade}</TableCell>
              <TableCell>{TeamMemberTable.Designation}</TableCell>
              <TableCell>{TeamMemberTable.Project}</TableCell>
              <TableCell>{TeamMemberTable.Skills}</TableCell>
              <TableCell>{TeamMemberTable.Location}</TableCell>
              <TableCell>{TeamMemberTable.ContactNo}</TableCell>
              <TableCell>
              <Tooltip title="Edit Employee List">
                <IconButton sx={{color: 'blue','&:hover': {color:'darkblue'}}} onClick={() => handleEdit(TeamMemberTable.EmpId)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={9}
              count={rows.length}
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
    </Box>
    
  );
}
