import React, { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const UploadModal = ({ open, handleClose, handleSave }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        handleSave(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="upload-modal-title"
      aria-describedby="upload-modal-description"
    >
      <Box sx={style}>
        <Typography id="upload-modal-title" variant="h6" component="h2">
          Upload Employee Data
        </Typography>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <Box sx={{ display: 'flex', gap:2, justifyContent:'right', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFileUpload}
          >
            Upload
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

UploadModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default UploadModal;
