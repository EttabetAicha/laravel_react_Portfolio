import axios from 'axios';
import React, { useState, useEffect } from 'react';

import {
    Card,
    Grid,
    Dialog,
    Button,
    TextField,
    Container,
    Typography,
    DialogTitle,
    CardContent,
    DialogActions,
    DialogContent,
} from '@mui/material';

const ExperienceForm = () => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [experiences, setExperiences] = useState([]);
    const [errors, setErrors] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentExperience, setCurrentExperience] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/experiences');
                setExperiences(response.data);
            } catch (error) {
                console.error('Error fetching experiences:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/experiences', {
                title,
                company,
                start_date: startDate,
                end_date: endDate
            });
            console.log('Experience added successfully:', response.data);
            setExperiences([...experiences, response.data]);
            setTitle('');
            setCompany('');
            setStartDate('');
            setEndDate('');
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                console.error('Error adding experience:', error.response.data.errors);
            } else {
                console.error('Error adding experience:', error);
            }
        }
    };

    const handleDelete = async (_id) => {
        try {
            await axios.delete(`http://localhost:8000/api/experiences/${_id}`);
            const updatedExperiences = experiences.filter(experience => experience._id !== _id);
            setExperiences(updatedExperiences);
        } catch (error) {
            console.error('Error deleting experience:', error);
        }
    };

    const handleEditModalOpen = (experience) => {
        setCurrentExperience(experience);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setCurrentExperience(null);
    };

    const handleEditSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/experiences/${currentExperience._id}`, {
                title: currentExperience.title,
                company: currentExperience.company,
                start_date: currentExperience.start_date,
                end_date: currentExperience.end_date
            });
            console.log('Experience edited successfully:', response.data);
            // Update experiences state with the edited experience
            const updatedExperiences = experiences.map(experience =>
                experience._id === currentExperience._id ? response.data : experience
            );
            setExperiences(updatedExperiences);
            setEditModalOpen(false);
            setCurrentExperience(null);
        } catch (error) {
            console.error('Error editing experience:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Add Experience
            </Typography>
            <br />
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                fullWidth
                                error={errors.title !== undefined}
                                helperText={errors.title}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                fullWidth
                                error={errors.company !== undefined}
                                helperText={errors.company}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                fullWidth
                                error={errors.start_date !== undefined}
                                helperText={errors.start_date}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                fullWidth
                                error={errors.end_date !== undefined}
                                helperText={errors.end_date}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Add Experience
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>

            {/* Display added experiences */}
            <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                Added Experiences
            </Typography>
            <br />
            <Grid container spacing={2}>
                {experiences.map((experience, index) => (
                    <Grid item xs={12} key={index}>
                        <Card style={{ boxShadow: '0px 5px 10px rgba(2, 2, 2, 0.1)', background: 'rgba(231, 231, 231, 0.1)' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {experience.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {experience.company} | {experience.start_date} - {experience.end_date}
                                </Typography>
                                <br />
                                <div style={{ justifyContent: "end" }}>
                                    <Button style={{ margin: "12px" }} onClick={() => handleDelete(experience._id)} color='error' variant="contained">Delete</Button>
                                    <Button onClick={() => handleEditModalOpen(experience)} variant="contained" color="primary">
                                        Edit
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                    </Grid>
                ))}
            </Grid>

            {/* Edit Experience Modal */}
            <Dialog open={editModalOpen} onClose={handleEditModalClose}>
                <DialogTitle>Edit Experience</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        value={currentExperience ? currentExperience.title : ''}
                        onChange={(e) => setCurrentExperience({ ...currentExperience, title: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Company"
                        value={currentExperience ? currentExperience.company : ''}
                        onChange={(e) => setCurrentExperience({ ...currentExperience, company: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        type="date"
                        label="Start Date"
                        value={currentExperience ? currentExperience.start_date : ''}
                        onChange={(e) => setCurrentExperience({ ...currentExperience, start_date: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        type="date"
                        label="End Date"
                        value={currentExperience ? currentExperience.end_date : ''}
                        onChange={(e) => setCurrentExperience({ ...currentExperience, end_date: e.target.value })}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditModalClose}>Cancel</Button>
                    <Button onClick={handleEditSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ExperienceForm;
