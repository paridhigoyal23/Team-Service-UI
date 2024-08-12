
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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

const EditModal = ({ open, handleClose, handleSave, employeeData }) => {
  const [formData, setFormData] = useState({
    ...employeeData,
    PlannedDate: employeeData.PlannedDate ? new Date(employeeData.PlannedDate) : null,
    StartDate: employeeData.StartDate ? new Date(employeeData.StartDate) : null,
    EndDate: employeeData.EndDate ? new Date(employeeData.EndDate) : null,
    Mode: employeeData.Mode || '',  // Ensure Mode is set from the provided employeeData
  });

  useEffect(() => {
    setFormData({
      ...employeeData,
      PlannedDate: employeeData.PlannedDate ? new Date(employeeData.PlannedDate) : null,
      StartDate: employeeData.StartDate ? new Date(employeeData.StartDate) : null,
      EndDate: employeeData.EndDate ? new Date(employeeData.EndDate) : null,
      Mode: employeeData.Mode || '',  // Ensure Mode is set from the provided employeeData
    });
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="edit-training-modal"
      aria-describedby="edit-training-modal-description">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="edit-training-modal" variant="h6" component="h2">
            Edit Training Data
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="Name"
                label="Name"
                value={formData.Name || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="TrainingTitle"
                label="Training Title"
                value={formData.TrainingTitle || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="training-type-label">Training Type</InputLabel>
                <Select
                  labelId="training-type-label"
                  name="TrainingType"
                  value={formData.TrainingType || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Self">Self</MenuItem>
                  <MenuItem value="Corporate">Corporate</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="mode-label">Mode</InputLabel>
                <Select
                  labelId="mode-label"
                  name="Mode"
                  value={formData.Mode || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="online">online</MenuItem>
                  <MenuItem value="offline">offline</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Planned Date"
                value={formData.PlannedDate}
                onChange={(value) => handleDateChange('PlannedDate', value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Start Date"
                value={formData.StartDate}
                onChange={(value) => handleDateChange('StartDate', value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="End Date"
                value={formData.EndDate}
                onChange={(value) => handleDateChange('EndDate', value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="Status"
                  value={formData.Status || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', gap:2, justifyContent:'right' }}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
    </Modal>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  employeeData: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default EditModal;


