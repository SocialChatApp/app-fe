import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, TextField, ToggleButton, ToggleButtonGroup, Typography, Divider, Button } from '@mui/material';
import { AppDispatch, RootState } from '../../redux/store';
import { UpdateUserDto } from '../../dto/UpdateUserDto';
import { updateUser, uploadAvatar } from '../../redux/userSlice';

function UserSettings() {
    const { info: user } = useSelector((store: RootState) => store.user);

    const [formData, setFormData] = useState({ ...user });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isFormChanged, setIsFormChanged] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            const fileUrl = URL.createObjectURL(file);
            setImagePreview(fileUrl);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        const isChanged =
            formData.name !== user.name ||
            formData.surname !== user.surname ||
            formData.email !== user.email ||
            formData.password !== user.password ||
            formData.searchType !== user.searchType ||
            (selectedFile !== null && imagePreview !== user.avatarUrl);

        setIsFormChanged(isChanged);
    }, [formData, selectedFile, imagePreview, user, user.avatarUrl]);

    const dispatch = useDispatch<AppDispatch>();

    const handleUpdateAvatar = async () => {

        const updateUserDto: UpdateUserDto = {
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            password: formData.password,
            searchType: formData.searchType,
        };


        if (selectedFile && user.id) {
            updateUserDto.avatarUrl = await dispatch(uploadAvatar({ img: selectedFile, userId: user.id })).unwrap();
        }

        if (user.id)
            await dispatch(updateUser({
                userId: user.id,
                userObj: updateUserDto
            }));
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
                    src={imagePreview || user.avatarUrl}
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
                    name="name"
                    label="Name"
                    value={formData.name}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={handleInputChange}
                />

                <TextField
                    id="surname"
                    name="surname"
                    label="Surname"
                    value={formData.surname}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={handleInputChange}
                />

                <TextField
                    id="email"
                    name="email"
                    label="Mail"
                    value={formData.email}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={handleInputChange}
                />

                <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={formData.password}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={handleInputChange}
                />

                <Divider sx={{ width: '100%', my: 2 }} />

                <Typography variant="subtitle1" component="div" gutterBottom>
                    Search Type
                </Typography>
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    aria-label="Search Type"
                    value={formData.searchType}
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(e, value) => setFormData(prev => ({ ...prev, searchType: value }))}
                >
                    <ToggleButton value="PRIVATE">PRIVATE</ToggleButton>
                    <ToggleButton value="PUBLIC">PUBLIC</ToggleButton>
                </ToggleButtonGroup>


                <Button
                    onClick={handleUpdateAvatar}
                    disabled={!isFormChanged}
                >
                    Gönder
                </Button>
            </Box>
        </div>
    );
}

export default UserSettings;
