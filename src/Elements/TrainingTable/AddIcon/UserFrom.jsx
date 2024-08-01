import React, { useState } from 'react';

const UserForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Grade: '',
    Designation: '',
    Project: '',
    Skills: '',
    Location: '',
    ContactNo: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        name="Name"
        value={formData.Name}
        onChange={handleChange}
        placeholder="Name"
      />
      <br />
      <label htmlFor="name">Grade: </label>
      <input
        name="Grade"
        value={formData.Grade}
        onChange={handleChange}
        placeholder="Grade"
      />
      <br />
      <label htmlFor="Designation">Designation: </label>
      <input
        name="Designation"
        value={formData.Designation}
        onChange={handleChange}
        placeholder="Designation"
      />
      <br />
      <label htmlFor="Project">Project: </label>
      <input
        name="Project"
        value={formData.Project}
        onChange={handleChange}
        placeholder="Project"
      />
      <br />
      <label htmlFor="Skills">Skills: </label>
      <input
        name="Skills"
        value={formData.Skills}
        onChange={handleChange}
        placeholder="Skills"
      />
      <br />
      <label htmlFor="Location">Location: </label>
      <input
        name="Location"
        value={formData.Location}
        onChange={handleChange}
        placeholder="Location"
      />
      <br />
      <label htmlFor="ContactNo">ContactNo: </label>
      <input
        name="ContactNo"
        value={formData.ContactNo}
        onChange={handleChange}
        placeholder="ContactNo"
      />
      <br /><br />
      <button style={{backgroundColor:"#00d025", color:"white", border:"none", boxShadow:"0px 0px 5px 1px gray", borderRadius:"2rem", padding:"2px 10px 2px 10px", marginRight:"0.8rem"}} type="submit">Submit</button>
      <button style={{backgroundColor:"#f00000", color:"white", border:"none", boxShadow:"0px 0px 5px 1px gray", borderRadius:"2rem", padding:"2px 10px 2px 10px", marginRight:"0.8rem"}} type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UserForm;
