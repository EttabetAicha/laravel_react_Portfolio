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

const EducationForm = () => {
    const [degree, setDegree] = useState('');
    const [institution, setInstitution] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [educations, setEducations] = useState([]);
    const [errors, setErrors] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentEducation, setCurrentEducation] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/educations');
                setEducations(response.data);
            } catch (error) {
                console.error('Error fetching educations:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/educations', {
                degree,
                institution,
                start_date: startDate,
                end_date: endDate
            });
            console.log('Education added successfully:', response.data);
            setEducations([...educations, response.data]);
            setDegree('');
            setInstitution('');
            setStartDate('');
            setEndDate('');
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                console.error('Error adding education:', error.response.data.errors);
            } else {
                console.error('Error adding education:', error);
            }
        }
    };

    const handleDelete = async (_id) => {
        try {
            await axios.delete(`http://localhost:8000/api/educations/${_id}`);
            const updatedEducations = educations.filter(education => education._id !== _id);
            setEducations(updatedEducations);
        } catch (error) {
            console.error('Error deleting education:', error);
        }
    };

    const handleEditModalOpen = (education) => {
        setCurrentEducation(education);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setCurrentEducation(null);
    };

    const handleEditSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/educations/${currentEducation._id}`, {
                degree: currentEducation.degree,
                institution: currentEducation.institution,
                start_date: currentEducation.start_date,
                end_date: currentEducation.end_date
            });
            console.log('Education edited successfully:', response.data);
            // Update educations state with the edited education
            const updatedEducations = educations.map(education =>
                education._id === currentEducation._id ? response.data : education
            );
            setEducations(updatedEducations);
            setEditModalOpen(false);
            setCurrentEducation(null);
        } catch (error) {
            console.error('Error editing education:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Add Education
            </Typography>
            <br />
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Degree"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                                fullWidth
                                error={errors.degree !== undefined}
                                helperText={errors.degree}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Institution"
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                                fullWidth
                                error={errors.institution !== undefined}
                                helperText={errors.institution}
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
                                Add Education
                            </Button>
                        </Grid>
                    </Grid>                </Grid>
            </form>

            {/* Display added educations */}
            <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                Added Educations
            </Typography>
            <br />
            <Grid container spacing={2}>
                {educations.map((education, index) => (
                    <Grid item xs={12} key={index}>
                        <Card style={{ boxShadow: '0px 5px 10px rgba(2, 2, 2, 0.1)', background: 'rgba(231, 231, 231, 0.1)' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {education.degree}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {education.institution} | {education.start_date} - {education.end_date}
                                </Typography>
                                <br />
                                <div style={{ justifyContent: "end" }}>
                                <Button style={{margin:"12"}} onClick={() => handleDelete(education._id)} color='error' variant="contained">Delete</Button>
                                <Button onClick={() => handleEditModalOpen(education)} variant="contained" color="primary">
                                    Edit
                                </Button>
                                </div>
                            </CardContent>
                        </Card>

                    </Grid>
                ))}
            </Grid>

            {/* Edit Education Modal */}
            <Dialog open={editModalOpen} onClose={handleEditModalClose}>
                <DialogTitle>Edit Education</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Degree"
                        value={currentEducation ? currentEducation.degree : ''}
                        onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Institution"
                        value={currentEducation ? currentEducation.institution : ''}
                        onChange={(e) => setCurrentEducation({ ...currentEducation, institution: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        type="date"
                        label="Start Date"
                        value={currentEducation ? currentEducation.start_date : ''}
                        onChange={(e) => setCurrentEducation({ ...currentEducation, start_date: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        type="date"
                        label="End Date"
                        value={currentEducation ? currentEducation.end_date : ''}
                        onChange={(e) => setCurrentEducation({ ...currentEducation, end_date: e.target.value })}
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

export default EducationForm;
