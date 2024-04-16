import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function ProductsView() {
  const [personalInfo, setPersonalInfo] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    first_name: '',
    last_name: '',
    email: '',
    images: null // Updated attribute name for image
  });

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/personal-information');
      setPersonalInfo(response.data);
    } catch (error) {
      console.error('Error fetching personal information:', error);
    }
  };

  const handleUpdate = async (_id) => {
    if (!_id) {
      console.error('Error updating personal information: ID is empty or invalid.');
      window.alert('Error updating personal information: ID is empty or invalid.');
      return;
    }

    try {
      const updatedItem = personalInfo.find(item => item._id === _id);
      await axios.put(`http://localhost:8000/api/personal-information/${_id}`, updatedItem);
      window.alert('Data updated successfully!');
    } catch (error) {
      console.error('Error updating personal information:', error);
      window.alert('Error updating personal information.');
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8000/api/personal-information/${_id}`);
      const updatedPersonalInfo = personalInfo.filter(item => item._id !== _id);
      setPersonalInfo(updatedPersonalInfo);
      window.alert('Data deleted successfully!');
    } catch (error) {
      console.error('Error deleting personal information:', error);
      window.alert('Error deleting personal information.');
    }
  };

  const handleChange = (_id, field, value) => {
    const updatedPersonalInfo = personalInfo.map(item => {
      if (item._id === _id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setPersonalInfo(updatedPersonalInfo);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleAddItem = async () => {
    try {
      const formData = new FormData();
      formData.append('first_name', newItem.first_name);
      formData.append('last_name', newItem.last_name);
      formData.append('email', newItem.email);
      formData.append('images', newItem.images);

      const response = await axios.post('http://localhost:8000/api/personal-information', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPersonalInfo([...personalInfo, response.data]);
      setIsAddModalOpen(false);
      setNewItem({
        first_name: '',
        last_name: '',
        email: '',
        images: null
      });
    } catch (error) {
      console.error('Error adding personal information:', error);
    }
  };

  const handleImageChange = (e) => {
    setNewItem({ ...newItem, images: e.target.files[0] });
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Personal Information
      </Typography>
      {personalInfo.map((item) => (

      <Card key={item._id} sx={{ mb: 3 }} style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Avatar alt={`${item.first_name} ${item.last_name}`} src={`http://localhost:8000/${item.images}`} sx={{ width: 300, height: 300 }} />
          </div>
          <TextField
            label="First Name"
            value={item.first_name}
            onChange={(e) => handleChange(item._id, 'first_name', e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            value={item.last_name}
            onChange={(e) => handleChange(item._id, 'last_name', e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            value={item.email}
            onChange={(e) => handleChange(item._id, 'email', e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            onClick={() => handleUpdate(item._id)}
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Save
          </Button>
          <Button
            onClick={() => handleDelete(item._id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </CardContent>
      </Card>

      ))}
      {personalInfo.length === 0 && (
        <Button onClick={handleAdd} variant="contained" color="primary">
          Add
        </Button>
      )}
      <Modal open={isAddModalOpen} onClose={handleCloseAddModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Add Personal Information
          </Typography>
          <TextField
            label="First Name"
            value={newItem.first_name}
            onChange={(e) => setNewItem({ ...newItem, first_name: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            value={newItem.last_name}
            onChange={(e) => setNewItem({ ...newItem, last_name: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            value={newItem.email}
            onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}

          />
          <Button onClick={handleAddItem} variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}
