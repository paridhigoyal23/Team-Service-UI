// import React, { useState, useEffect } from 'react';
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
  
// const EditModal = ({ open, handleClose, handleSave, employeeData}) => {
//   const [formData, setFormData] = useState(employeeData);

//   useEffect(() => {
//     setFormData(employeeData);
//   }, [employeeData]);

//  //set the edited data in api
//  const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   //handles the submit click
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSave(formData);
//   };

//   return (
//     <Modal open={open} onClose={handleClose} aria-labelledby="edit-training-modal"
//     aria-describedby="edit-training-modal-description">
//       <Box sx={style} component="form" onSubmit={handleSubmit}>
//         <Typography id="edit-training-modal" variant="h6" component="h2">
//           Edit Training Data
//         </Typography>
//         <TextField
//           fullWidth
//           margin="normal"
//           name="Name"
//           label="Name"
//           value={formData.Name || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           name="TrainingTitle"
//           label="Training Title"
//           value={formData.TrainingTitle || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           name="TrainingType"
//           label="Training Type"
//           value={formData.TrainingType || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           name="Mode"
//           label="Mode"
//           value={formData.Mode || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           name="PlannedDate"
//           label="Planned Date"
//           value={formData.PlannedDate || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           name="StartDate"
//           label="Start Date"
//           value={formData.StartDate || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           name="EndDate"
//           label="End Date"
//           value={formData.EndDate || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           name="Status"
//           label="Status"
//           value={formData.Status || ''}
//           onChange={handleChange}
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

// EditModal.propTypes = {
//     open: PropTypes.bool.isRequired,
//     handleClose: PropTypes.func.isRequired,
//     employeeData: PropTypes.object.isRequired,
//     handleSave: PropTypes.func.isRequired,
//   };
  
// export default EditModal;

import React, { useState, useEffect } from 'react';
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

const EditModal = ({ open, handleClose, handleSave, employeeData }) => {
  const [formData, setFormData] = useState(employeeData);

  useEffect(() => {
    setFormData(employeeData);
  }, [employeeData]);

  //set the edited data in api
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //handles the submit click
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="edit-training-modal"
      aria-describedby="edit-training-modal-description">
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
            <TextField
              fullWidth
              margin="normal"
              name="TrainingType"
              label="Training Type"
              value={formData.TrainingType || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              name="Mode"
              label="Mode"
              value={formData.Mode || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              name="PlannedDate"
              label="Planned Date"
              value={formData.PlannedDate || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              name="StartDate"
              label="Start Date"
              value={formData.StartDate || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              name="EndDate"
              label="End Date"
              value={formData.EndDate || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              name="Status"
              label="Status"
              value={formData.Status || ''}
              onChange={handleChange}
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

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  employeeData: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default EditModal;
