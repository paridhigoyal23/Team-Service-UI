// import React, { useState } from 'react';
// import { Modal, Box, Typography, TextField, Button } from '@mui/material';
// import PropTypes from 'prop-types';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '90%',  // Use a percentage to ensure it fits within the viewport
//     maxWidth: 400,  // Set a maximum width
//     maxHeight: '90%',  // Ensure it does not exceed the viewport height
//     overflow: 'auto',  // Allow scrolling if content overflows
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//   };

// const AddModal = ({ open, handleClose, handleSave }) => {
//   const [newEmployee, setNewEmployee] = useState({
//     EmpId: '',
//     Name: '',
//     Grade: '',
//     Designation: '',
//     Project: '',
//     Skills: '',
//     Location: '',
//     ContactNo: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewEmployee((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSave(newEmployee);
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="add-employee-modal"
//       aria-describedby="add-employee-modal-description"
//     >
//       <Box sx={style} component="form" onSubmit={handleSubmit}>
//         <Typography id="add-employee-modal" variant="h6" component="h2">
//           Add Employee
//         </Typography>
//         <TextField
//           label="EmpId"
//           name="EmpId"
//           value={newEmployee.EmpId}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Name"
//           name="Name"
//           value={newEmployee.Name}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Grade"
//           name="Grade"
//           value={newEmployee.Grade}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Designation"
//           name="Designation"
//           value={newEmployee.Designation}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Project"
//           name="Project"
//           value={newEmployee.Project}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Skills"
//           name="Skills"
//           value={newEmployee.Skills}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Location"
//           name="Location"
//           value={newEmployee.Location}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="ContactNo"
//           name="ContactNo"
//           value={newEmployee.ContactNo}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
//           <Button type="submit" variant="contained" color="primary">
//             Save
//           </Button>
//           <Button onClick={handleClose} variant="contained" color="secondary">
//             Cancel
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// AddModal.propTypes = {
//   open: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   handleSave: PropTypes.func.isRequired,
// };

// export default AddModal;

import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',  // Use a percentage to ensure it fits within the viewport
  maxWidth: 400,  // Set a maximum width
  maxHeight: '90%',  // Ensure it does not exceed the viewport height
  overflow: 'auto',  // Allow scrolling if content overflows
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddModal = ({ open, handleClose, handleSave }) => {
  const [newEmployee, setNewEmployee] = useState({
    EmpId: '',
    Name: '',
    Grade: '',
    Designation: '',
    Project: '',
    Skills: '',
    Location: '',
    ContactNo: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for the current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value ? `${name} is required` : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate all fields
    Object.keys(newEmployee).forEach((key) => {
      if (!newEmployee[key]) {
        newErrors[key] = `${key} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      handleSave(newEmployee);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-employee-modal"
      aria-describedby="add-employee-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography id="add-employee-modal" variant="h6" component="h2">
          Add Employee
        </Typography>
        <TextField
          label="EmpId"
          name="EmpId"
          value={newEmployee.EmpId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.EmpId}
          helperText={errors.EmpId}
        />
        <TextField
          label="Name"
          name="Name"
          value={newEmployee.Name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.Name}
          helperText={errors.Name}
        />
        <TextField
          label="Grade"
          name="Grade"
          value={newEmployee.Grade}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.Grade}
          helperText={errors.Grade}
        />
        <TextField
          label="Designation"
          name="Designation"
          value={newEmployee.Designation}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.Designation}
          helperText={errors.Designation}
        />
        <TextField
          label="Project"
          name="Project"
          value={newEmployee.Project}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.Project}
          helperText={errors.Project}
        />
        <TextField
          label="Skills"
          name="Skills"
          value={newEmployee.Skills}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.Skills}
          helperText={errors.Skills}
        />
        <TextField
          label="Location"
          name="Location"
          value={newEmployee.Location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.Location}
          helperText={errors.Location}
        />
        <TextField
          label="ContactNo"
          name="ContactNo"
          value={newEmployee.ContactNo}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.ContactNo}
          helperText={errors.ContactNo}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

AddModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default AddModal;
