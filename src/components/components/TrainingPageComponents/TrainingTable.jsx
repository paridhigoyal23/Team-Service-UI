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
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import { Tooltip, InputBase, AppBar, Toolbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled, alpha } from '@mui/material/styles';
import EditModal from './EditModal';
import AddModal from './AddModal';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200], // Light grey shade
  '&:hover': {
    backgroundColor: theme.palette.grey[300], // Slightly darker on hover
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
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
color: theme.palette.text.primary, // Ensure icon color contrasts well with the grey background
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
  const [trainingData, setTrainingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/trainingData')
      .then(response => {
        setTrainingData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleEdit = (employeeData) => {
    setEditData(employeeData);
    setEditModalOpen(true);
  };

  const handleSave = (updatedEmployee) => {
    axios.put(`http://localhost:8000/trainingData/${updatedEmployee.id}`, updatedEmployee)
      .then(response => {
        setTrainingData((prevData) =>
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
    axios.post('http://localhost:8000/trainingData', newEmployee)
      .then(response => {
        setTrainingData((prevData) => [...prevData, response.data]);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopyContent(true);
  };

  const filteredData = trainingData.filter((row) =>
    row.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.TrainingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.TrainingType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.Mode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.PlannedDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.StartDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.EndDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.Status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  return (
    <Box sx={{ paddingRight: 10, paddingLeft: 10 }}>
      <AppBar position="static" sx={{ backgroundColor: 'var(--lt-color-gray-400)' }}>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search', style: { color: 'black' } } }
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
          <Tooltip title="Add Employee">
            <IconButton
              onClick={handleAdd}
              style={{ marginLeft: '700px'}}
              sx={{
                backgroundColor: 'blue',
                color: 'white',
                '&:hover': { backgroundColor: 'darkblue' }
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download Employee List">
            <IconButton
              style={{ marginLeft: '8px' }}
              sx={{
                backgroundColor: 'green',
                color: 'white',
                '&:hover': { backgroundColor: 'darkgreen' },
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
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Training Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Training Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Mode</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Planned Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredData
            ).map((row) => (
              <TableRow key={row.id}>
              
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row.TrainingTitle}</TableCell>
                <TableCell>{row.TrainingType}</TableCell>
                <TableCell>{row.Mode}</TableCell>
                <TableCell>{row.PlannedDate}</TableCell>
                <TableCell>{row.StartDate}</TableCell>
                <TableCell>{row.EndDate}</TableCell>
                <TableCell>{row.Status}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Edit Employee List">
                      <IconButton
                        sx={{ color: 'blue', '&:hover': { color: 'darkblue' } }}
                        onClick={() => handleEdit(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy Employee Details">
                      <IconButton
                        sx={{ color: 'green', '&:hover': { color: 'darkgreen' } }}
                        onClick={() => handleCopy(row.Name)}
                      >
                        <ContentCopyIcon />
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
          employeeData={editData}
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
