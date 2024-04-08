import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function ProductsView() {
  const [personalInfo, setPersonalInfo] = useState([]);

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
  

  const handleChange = (_id, field, value) => {
    const updatedPersonalInfo = personalInfo.map(item => {
      if (item._id === _id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setPersonalInfo(updatedPersonalInfo);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Personal Information
      </Typography>
      {personalInfo.map((item) => (
        <Card key={item._id} sx={{ mb: 3 }}>
          <img src={`http://localhost:8000/${item.images}`} alt={`${item.first_name} ${item.last_name}`} height="140" />
          <CardContent>
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
            >
              Save
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
