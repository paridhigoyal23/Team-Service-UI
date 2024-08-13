
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import PropTypes from "prop-types";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  maxHeight: "90%",
  overflow: "hidden",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddModal = ({ open, handleClose, handleSave }) => {
  const [newEmployee, setNewEmployee] = useState({
    Nominate: "",
    TrainingTitle: "",
    TrainingType: "",
    Mode: "",
    PlannedDate: null,
    StartDate: null,
    EndDate: null,
    Status: "",
    Reference: "",
  });

  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8000/employeesData");
        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value ? `${name} is required` : "",
    }));
  };

  const handleDateChange = (name, value) => {
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value ? `${name} is required` : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(newEmployee).forEach((key) => {
      if (!newEmployee[key]) {
        newErrors[key] = `${key} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const dataToSave = {
        ...newEmployee,
        Name: newEmployee.Nominate, // Map Nominate field to Name field
      };
      handleSave(dataToSave);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-training-modal"
      aria-describedby="add-training-modal-description"
    >
      <Box sx={style}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography id="add-training-modal" variant="h6" component="h2">
              Add Training Data
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  margin="dense"
                  required
                  error={!!errors.Nominate}
                >
                  <InputLabel id="nominate-label">Nominate</InputLabel>
                  <Select
                    labelId="nominate-label"
                    name="Nominate"
                    value={newEmployee.Nominate}
                    onChange={handleChange}
                  >
                    {employees.map((emp) => (
                      <MenuItem
                        key={emp.EmpId}
                        value={`${emp.Name}(${emp.EmpId})`}
                      >
                        {`${emp.Name}(${emp.EmpId})`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Training Titles (comma separated)"
                  name="TrainingTitle"
                  value={newEmployee.TrainingTitle}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  required
                  error={!!errors.TrainingTitle}
                  helperText={errors.TrainingTitle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Planned Date"
                  value={newEmployee.PlannedDate}
                  onChange={(value) => handleDateChange("PlannedDate", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="dense"
                      required
                      error={!!errors.PlannedDate}
                      helperText={errors.PlannedDate}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  margin="dense"
                  required
                  error={!!errors.Mode}
                >
                  <InputLabel id="mode-label">Mode</InputLabel>
                  <Select
                    labelId="mode-label"
                    name="Mode"
                    value={newEmployee.Mode}
                    onChange={handleChange}
                  >
                    <MenuItem value="Online">online</MenuItem>
                    <MenuItem value="Offline">offline</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Start Date"
                  value={newEmployee.StartDate}
                  onChange={(value) => handleDateChange("StartDate", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="dense"
                      required
                      error={!!errors.StartDate}
                      helperText={errors.StartDate}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  margin="dense"
                  required
                  error={!!errors.TrainingType}
                >
                  <InputLabel id="training-type-label">
                    Training Type
                  </InputLabel>
                  <Select
                    labelId="training-type-label"
                    name="TrainingType"
                    value={newEmployee.TrainingType}
                    onChange={handleChange}
                  >
                    <MenuItem value="Self">Self</MenuItem>
                    <MenuItem value="Corporate">Corporate</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="End Date"
                  value={newEmployee.EndDate}
                  onChange={(value) => handleDateChange("EndDate", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="dense"
                      required
                      error={!!errors.EndDate}
                      helperText={errors.EndDate}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  margin="dense"
                  required
                  error={!!errors.Status}
                >
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    name="Status"
                    value={newEmployee.Status}
                    onChange={handleChange}
                  >
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Reference"
                  name="Reference"
                  value={newEmployee.Reference}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  error={!!errors.Reference}
                  helperText={errors.Reference}
                />
              </Grid>
            </Grid>
            <Box
              sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "right" }}
            >
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </LocalizationProvider>
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
