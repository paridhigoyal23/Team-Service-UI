import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',  // Use a percentage to ensure it fits within the viewport
  maxWidth: 600,  // Set a maximum width for two columns
  maxHeight: '90%',  // Ensure it does not exceed the viewport height
  overflow: 'hidden',  // Remove the overflow auto to hide scrollbars
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddModal = ({ open, handleClose, handleSave }) => {
  const [newEmployee, setNewEmployee] = useState({
    EmpId: '',
    Name: '',
    TrainingTitle: '',
    TrainingType: '',
    Mode: '',
    PlannedDate: '',
    StartDate: '',
    EndDate: '',
    Status: '',
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
      aria-labelledby="add-training-modal"
      aria-describedby="add-training-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography id="add-training-modal" variant="h6" component="h2">
          Add Training Data
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="EmpId"
              name="EmpId"
              value={newEmployee.EmpId}
              onChange={handleChange}
              fullWidth
              margin="dense"  // Reduced spacing
              required
              error={!!errors.EmpId}
              helperText={errors.EmpId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="Name"
              value={newEmployee.Name}
              onChange={handleChange}
              fullWidth
              margin="dense"  // Reduced spacing
              required
              error={!!errors.Name}
              helperText={errors.Name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Training Title"
              name="TrainingTitle"
              value={newEmployee.TrainingTitle}
              onChange={handleChange}
              fullWidth
              margin="dense"  // Reduced spacing
              required
              error={!!errors.TrainingTitle}
              helperText={errors.TrainingTitle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Training Type"
              name="TrainingType"
              value={newEmployee.TrainingType}
              onChange={handleChange}
              fullWidth
              margin="dense"  // Reduced spacing
              required
              error={!!errors.TrainingType}
              helperText={errors.TrainingType}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mode"
              name="Mode"
              value={newEmployee.Mode}
              onChange={handleChange}
              fullWidth
              margin="dense"  // Reduced spacing
              required
              error={!!errors.Mode}
              helperText={errors.Mode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Planned Date"
              name="PlannedDate"
              value={newEmployee.PlannedDate}
              onChange={handleChange}
              fullWidth
              margin="dense"  // Reduced spacing
              required
              error={!!errors.PlannedDate}
              helperText={errors.PlannedDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              name="StartDate"
              value={newEmployee.StartDate}
              onChange={handleChange}
              fullWidth
              margin="dense"  // Reduced spacing
              required
              error={!!errors.StartDate}
              helperText={errors.StartDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              name="EndDate"
              value={newEmployee.EndDate}
              onChange={handleChange}
              fullWidth
              margin="dense"  // Reduced spacing
              required
              error={!!errors.EndDate}
              helperText={errors.EndDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Status"
              name="Status"
              value={newEmployee.Status}
              onChange={handleChange}
              fullWidth
              margin="dense"  // Reduced spacing
              required
              error={!!errors.Status}
              helperText={errors.Status}
            />
          </Grid>
        </Grid>
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



