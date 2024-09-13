import { Box, Button, Card, CircularProgress, Grid, LinearProgress, Link, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginDto } from '../../dto/LoginDto';
import { AppDispatch, RootState } from '../../redux/store';
import { loginUser } from '../../redux/userSlice';

interface LoginPageProps {
    setForm: React.Dispatch<React.SetStateAction<'login' | 'register' | '2FA'>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setForm }) => {

    // const { setForm } = props;

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
        <Box style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>

            <Box width={{ xs: "100%", sm: "60%" }}>
                <Typography color='#ADA2FF' fontFamily='onton' variant="h2" gutterBottom align="center">
                    Sign in
                </Typography>
                <Stack spacing={2} direction="column">
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
                        onClick={SignIn}
                    >
                        {isLoading ? <CircularProgress color="inherit" /> : <Typography>Login</Typography>}
                    </Button>
                    <Typography>Don't you have account?
                        <span
                            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => {
                                setForm('register')
                            }}
                        >
                            Register
                        </span>
                    </Typography>
                </Stack>
            </Box>

        </Box>
    )
}

export default LoginPage;
