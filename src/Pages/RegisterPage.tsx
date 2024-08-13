import React, { useState } from 'react';
import { Button, Grid, TextField, Typography, Paper, Alert, Box, LinearProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { CreateUserDto } from '../dto/CreateUserDto';
import { createUser } from '../redux/userSlice';

function RegisterPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { isSignUp, isLoading } = useSelector((state: RootState) => state.user);

    const [formData, setFormData] = useState<CreateUserDto>({
        id: '',
        name: '',
        email: '',
        surname: '',
        password: '',
        role: "NORMAL",
        searchType: "PUBLIC",
        avatarUrl: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.surname) newErrors.surname = 'Surname is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const signUp = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await dispatch(createUser(formData));
            console.log(response.payload);
            // Optionally clear form or redirect
        } catch (error) {
            console.error('Error signing up user:', error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            {!isLoading ? (
                isSignUp ? (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Congratulations, your registration has been completed successfully. You can now log in.
                    </Alert>
                ) : (
                    <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
                        <Typography variant="h4" gutterBottom align="center">
                            Register
                        </Typography>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <TextField
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    name="surname"
                                    label="Surname"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.surname}
                                    onChange={handleChange}
                                    error={!!errors.surname}
                                    helperText={errors.surname}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    name="password"
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '20px' }}
                            fullWidth
                            onClick={signUp}
                        >
                            Sign Up
                        </Button>
                    </Paper>
                )
            ) : (
                <Box sx={{ width: '100%' }}>
                    {isSignUp ? (
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            Congratulations, your registration has been completed successfully. You can now log in.
                        </Alert>

                    ) : (
                        <LinearProgress />
                    )}
                </Box>
            )}
        </div>
    );
}

export default RegisterPage;
