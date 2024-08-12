import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Avatar, Box, TextField, ToggleButton, ToggleButtonGroup, Typography, Divider, Button } from '@mui/material';
import { updateAvatar } from '../redux/userSlice';

function UserSettings() {
    const { info: user } = useSelector((store: RootState) => store.user);

    const profileImageUrl = `https://nestjs-upload.s3.amazonaws.com/user/${user.id}.jpg`;

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file); // Dosya objesini set ediyoruz

            // Dosyanın önizlemesini oluşturuyoruz
            const fileUrl = URL.createObjectURL(file);
            setImagePreview(fileUrl);
        }
    };

    const dispatch = useDispatch<AppDispatch>();

    const handleUpdateAvatar = () => {
        if (selectedFile && user.id) {
            dispatch(updateAvatar({ img: selectedFile, userId: user.id }));
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Box
                width={600}
                my={2}
                display="flex"
                alignItems="center"
                gap={2}
                p={3}
                sx={{ border: '2px solid grey', borderRadius: '10px' }}
                flexDirection="column"
                boxShadow={3}
            >
                <Typography variant="h5" component="h2" gutterBottom>
                    User Settings
                </Typography>

                <Avatar
                    alt="Profile Photo"
                    src={imagePreview || profileImageUrl}
                    sx={{ width: 120, height: 120, mb: 2 }}
                />


                <Button
                    variant="contained"
                    component="label"
                    sx={{ mb: 2 }}
                >
                    Select Image
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>

                <TextField
                    id="name"
                    label="Name"
                    value={user.name}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <TextField
                    id="surname"
                    label="Surname"
                    value={user.surname}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <TextField
                    id="email"
                    label="Mail"
                    value={user.email}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <TextField
                    id="password"
                    type="password"
                    label="Password"
                    value={user.password}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <Divider sx={{ width: '100%', my: 2 }} />

                <Typography variant="subtitle1" component="div" gutterBottom>
                    Search Type
                </Typography>
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    aria-label="Search Type"
                    value={user.searchType}
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    <ToggleButton value="PRIVATE">PRIVATE</ToggleButton>
                    <ToggleButton value="PUBLIC">PUBLIC</ToggleButton>
                </ToggleButtonGroup>

                <Typography variant="subtitle1" component="div" gutterBottom>
                    Role
                </Typography>
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    aria-label="Role"
                    value={user.role}
                    fullWidth
                >
                    <ToggleButton value="PREMIUM">PREMIUM</ToggleButton>
                    <ToggleButton value="NORMAL">NORMAL</ToggleButton>
                    <ToggleButton value="ADMIN">ADMIN</ToggleButton>
                </ToggleButtonGroup>
                <Button
                    onClick={handleUpdateAvatar}
                >
                    Gönder
                </Button>
            </Box>
        </div>
    );
}

export default UserSettings;
