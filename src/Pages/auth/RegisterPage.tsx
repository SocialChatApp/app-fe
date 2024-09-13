import CheckIcon from '@mui/icons-material/Check';
import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateUserDto } from '../../dto/CreateUserDto';
import { AppDispatch, RootState } from '../../redux/store';
import { createUser } from '../../redux/userSlice';

interface RegisterPageProps {
    setForm: React.Dispatch<React.SetStateAction<'login' | 'register' | '2FA'>>;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setForm }) => {

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
        <Box style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            {
                isSignUp ? (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Congratulations, your registration has been completed successfully. You can now log in.
                    </Alert>
                ) : (
                    <Box width={{ xs: "100%", sm: "60%" }}>
                        <Typography color='#ADA2FF' fontFamily='onton' variant="h2" gutterBottom align="center">
                            Register
                        </Typography>
                        <Stack spacing={2} direction="column">

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
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ backgroundColor: '#ADA2FF', marginTop: '20px' }}
                                fullWidth
                                onClick={signUp}
                            >
                                {isLoading ? <CircularProgress color="inherit" /> : <Typography >Send</Typography>}

                            </Button>
                            <Typography>You already have account?
                                <span
                                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={() => { setForm('login') }}
                                >
                                    Login
                                </span>
                            </Typography>

                        </Stack>
                    </Box>
                )

            }
        </Box >
    );
}

export default RegisterPage;
