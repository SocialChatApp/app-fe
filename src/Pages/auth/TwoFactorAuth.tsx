import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { redirect, useNavigate } from 'react-router-dom';
import { verifyToken } from '../../redux/authSlice';
import { VerificationDto } from '../../dto/VerificationDto';

interface TwoFactorAuthProps {
    setForm: React.Dispatch<React.SetStateAction<'login' | 'register' | '2FA'>>;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ setForm }) => {

    const { isLoading, userInf: userInfoCache } = useSelector((store: RootState) => store.auth);

    const [formData, setFormData] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [estimated, setEstimated] = useState<string>("00:00");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(e.target.value);
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData) newErrors.password = 'Verify code is required';
        return newErrors;
    };

    const checkVerifyCode = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            //TODO: do it something here sukkkk
            //TODOLUYORUM RAMSSSSSSSSSSSSSSSS TISSSSSSSSSSS

            if (userInfoCache) {
                const verificationDto: VerificationDto = {
                    mail: userInfoCache.email,
                    token: parseInt(formData)
                };

                const response = await dispatch(verifyToken(verificationDto));
                if (response.payload as true) {
                    console.log("GİRİŞ BAŞARILI");
                    navigate('/');
                }
            }


        } catch (error) {
            console.error('Error signing up user:', error);
        }
    };

    const discard = async () => {
        if (window.confirm("iptal etmek istiyor musunuz?")) {
            setForm("login");
        }
    };


    useEffect(() => {
        let timer = 120;

        const intervalId = setInterval(() => {

            timer--;
            const minute = Math.floor(timer / 60);
            const second = timer % 60;

            setEstimated(
                `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
            );

            if (timer <= 0) {
                //TODO: Do it something
                clearInterval(intervalId)
            };
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Box style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>

            <Box width={{ xs: "100%", sm: "60%" }}>
                <Typography variant="h2" gutterBottom align="center">
                    Verification
                </Typography>
                <Typography gutterBottom align="center">
                    example@mail.com adresine doğrulama kodunu gönderdik. Lütfen mailinizi kontrol edip 4 haneli kodu giriniz. kodu almanız biraz zaman alabilir.
                </Typography>
                <Stack spacing={2} direction="column">

                    <TextField
                        name="verify"
                        type="text"
                        label="code"
                        variant="outlined"
                        fullWidth
                        value={formData}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                        fullWidth
                        onClick={checkVerifyCode}
                    >
                        {isLoading ? <CircularProgress color="inherit" /> : <Typography>Onayla</Typography>}
                    </Button>

                    <Button
                        variant="text"
                        color="primary"
                        style={{ marginTop: '20px' }}
                        fullWidth
                        onClick={discard}
                    >
                        <Typography>iptal</Typography>
                    </Button>
                    <Typography>kalan süre: {estimated}</Typography>
                    <Typography>Doğrulama kodunu almadınız mı? <span onClick={() => { alert("re-mail") }}>Tekrar Deneyin</span> </Typography>
                </Stack>
            </Box>

        </Box>
    )
}

export default TwoFactorAuth;
