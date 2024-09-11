import { Box, Button, Grid, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginDto } from '../../dto/LoginDto';
import { AppDispatch, RootState } from '../../redux/store';
import { loginUser } from '../../redux/userSlice';

function LoginPage() {

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((store: RootState) => store.user);

    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginDto>({
        email: '',
        password: '',
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
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const SignIn = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const loginResult = await dispatch(loginUser(formData));
            if (loginResult.payload) {
                navigate('/meet-page');
            }
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
            {
                !isLoading ? <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Sign in
                    </Typography>
                    <Grid container spacing={2} direction="column">
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
                        onClick={SignIn}
                    >
                        Login
                    </Button>
                </Paper>

                    :

                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
            }

        </div>
    )
}

export default LoginPage
