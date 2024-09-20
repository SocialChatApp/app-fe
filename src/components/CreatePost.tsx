import { Alert, Box, Button, Divider, LinearProgress, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { CreatePostDto } from '../dto/CreatePostDto';
import { StatusType } from '../enums/StatusType';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { createPost, updatePost, uploadPostImage } from '../redux/postSlice';
import { UpdatePostDto } from '../dto/UpdatePostDto';
import CheckIcon from '@mui/icons-material/Check';


function CreatePost() {

    const { info: user } = useSelector((store: RootState) => store.user);
    const { isLoading } = useSelector((store: RootState) => store.post);

    const [formData, setFormData] = useState<CreatePostDto>({
        id: '',
        title: '',
        content: '',
        userId: user.id,
        status: StatusType.Draft,
        createAt: new Date(),
        imageUrl: '',
        likeCount: 0,
        comments: 0,
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSavePost, setIsSavingPost] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const dispatch = useDispatch<AppDispatch>();


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            const fileUrl = URL.createObjectURL(file);
            setImagePreview(fileUrl);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let formErrors: { [key: string]: string } = {};
        if (!formData.title) formErrors.title = 'Title is required';
        if (!formData.content) formErrors.content = 'Content is required';
        if (!selectedFile) formErrors.image = 'Image is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            handlePost();
        }
    };

    const handlePost = async () => {
        const postObj = await dispatch(createPost(formData)).unwrap();
        if (selectedFile) {
            const imageUrl = await dispatch(uploadPostImage({ img: selectedFile, postId: postObj.id })).unwrap();

            const updatePostDto: UpdatePostDto = {
                title: postObj.title,
                content: postObj.content,
                imageUrl: imageUrl
            };

            await dispatch(updatePost({ postId: postObj.id, postObj: updatePostDto }));
            setIsSavingPost(true);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            {!isLoading ? (
                isSavePost ? (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Congratulations, your new post has been created.
                    </Alert>
                ) : (
                    <Box
                        width={600}
                        my={2}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        p={3}
                        sx={{ border: '1px solid grey', borderRadius: '10px' }}
                        flexDirection="column"
                        boxShadow={3}
                    >
                        <Typography variant="h5" component="h2" gutterBottom>
                            Create Post
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                height: 300,
                                backgroundImage: `url(${imagePreview || 'https://via.placeholder.com/600x300'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                mb: 2,
                            }}
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

                        {errors.image && <Typography color="error">{errors.image}</Typography>}

                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={formData.title}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            error={!!errors.title}
                            helperText={errors.title}
                        />

                        <TextField
                            id="content"
                            name="content"
                            label="Content"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={formData.content}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            error={!!errors.content}
                            helperText={errors.content}
                        />

                        <Divider sx={{ width: '100%', my: 2 }} />

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Create
                        </Button>
                    </Box>
                )
            ) : (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}
        </div>
    );
}

export default CreatePost
