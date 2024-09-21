import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchAllPosts } from '../../redux/postSlice';
import { PostInfoDto } from '../../dto/PostInfoDto';
import { Box, Grid, LinearProgress } from '@mui/material';
import Post from '../../components/Post';
import MediaPost from '../../components/MediaPost';

function MediaPage() {

    const dispatch = useDispatch<AppDispatch>();

    const [posts, setPosts] = useState<PostInfoDto[]>([]);
    const { isLoading } = useSelector((store: RootState) => store.post);

    useEffect(() => {
        getAllPost();

    }, []);

    const getAllPost = async () => {
        const response = await dispatch(fetchAllPosts()).unwrap();
        setPosts(response)
    }


    return (
        <Box height="100%" width="100%" my={4} p={2}>
            {
                !isLoading ? (
                    <Grid container spacing={2} alignItems="center">
                        {posts && posts.map((post) => (
                            <Grid item key={post.id}>
                                <MediaPost post={post} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                )
            }
        </Box>
    );
}

export default MediaPage
