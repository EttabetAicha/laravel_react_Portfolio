import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function ProductsView() {
  const [personalInfo, setPersonalInfo] = useState([]);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/personal-information');
        setPersonalInfo(response.data);
      } catch (error) {
        console.error('Error fetching personal information:', error);
      }
    };

    fetchPersonalInfo();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Personal Information
      </Typography>
      {personalInfo.map((item) => (
        <Card key={item.id} sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            height="140"
            image={item.images} // Assuming the image URL is stored in item.image
            alt={`${item.first_name} ${item.last_name}`}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {`${item.first_name} ${item.last_name}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {item.email}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
