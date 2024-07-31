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
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import {TextField,Tooltip} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


// styling the search bar
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(70),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
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
  
  // styling the footer
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

export default function TrainingTable() {
// Implement edit functionality here
  const handleEdit=(EmpId) => {
    console.log(`Edit item with EmpId: ${EmpId}`);
  };
  // Implement search functionality here
  const [searchTerm, setSearchTerm] = React.useState('');
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

 

// Implement copy functionality here
    const [copyContent, setCopyContent] = React.useState(false);
  
    const handleCopy = (text) => {
      copyToClipboard(text);
      setCopyContent(true);
    };
  
    const handleCopyClose = () => {
        setCopyContent(false);
    };

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
  const [trainingData, setTrainingData] = useState([])

  // Using useEffect to use db.json
  useEffect(() => {
    axios.get("http://localhost:8000/trainingData")
    .then(response => setTrainingData(response.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <Box sx={{ paddingRight:20,paddingLeft:20}}>
          <AppBar position="static">
          <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

        <Tooltip title="Add Employee" >
          <IconButton  style={{ marginLeft: '10px' }} sx={{backgroundColor: 'blue', color: 'white','&:hover': {backgroundColor: 'darkblue'}}}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download Employee List">
          <IconButton style={{ marginLeft: '8px' }} sx={{backgroundColor: 'green', color: 'white','&:hover': {backgroundColor: 'darkgreen'}}}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
        
      </Toolbar>
      </AppBar>

    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead >
          <TableRow>
            <TableCell sx={{fontWeight:"bold"}} >Name</TableCell>
            <TableCell sx={{fontWeight:"bold"}} >Training Title</TableCell>
            <TableCell sx={{fontWeight:"bold"}} >Training Type</TableCell>
            <TableCell sx={{fontWeight:"bold"}} >Mode</TableCell>
            <TableCell sx={{fontWeight:"bold"}} >Planned Date</TableCell>
            <TableCell sx={{fontWeight:"bold"}} >Start Date</TableCell>
            <TableCell sx={{fontWeight:"bold"}} >End Date</TableCell>
            <TableCell sx={{fontWeight:"bold"}} >Status</TableCell>
            <TableCell sx={{fontWeight:"bold"}} >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? trainingData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : trainingData
          ).map((row) => (
            <TableRow key={row.Name}>
{/* this is the entry that should be filled by db.json */}
              <TableCell>{row.Name}</TableCell>
              <TableCell>{row.TrainingTitle}</TableCell>
              <TableCell>{row.TrainingType}</TableCell>
              <TableCell>{row.Mode}</TableCell>
              <TableCell>{row.PlannedDate}</TableCell>
              <TableCell>{row.StartDate}</TableCell>
              <TableCell>{row.EndDate}</TableCell>
              <TableCell>{row.Status}</TableCell>

              <TableCell>
          {/* Edit Icon  */}
              <Tooltip title="Edit Employee List">
                <IconButton sx={{color: 'blue','&:hover': {color:'darkblue'}}} onClick={() => handleEdit(TrainingTable.EmpID)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
          {/* Copy Icon  */}
              <Tooltip title="Copy Employee Details">
                <IconButton sx={{color: 'green','&:hover': {color:'darkgreen'}}} onClick={() => handleCopy(TrainingTable.Name)}>
                  <ContentCopyIcon />
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
              count={trainingData.length}
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
