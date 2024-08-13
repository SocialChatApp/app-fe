import { useEffect } from 'react';
import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../redux/postSlice';
import { AppDispatch, RootState } from '../redux/store';
import { Box, Fab, Grid, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchAllPosts());
    }, []);

    const { posts, isLoading } = useSelector((store: RootState) => store.post);
    const navigate = useNavigate();

    return (
        <Box
            height='100%'
            width='100%'
            my={4}
            p={2}
        >
            {
                !isLoading ? (
                    <Grid container spacing={2} alignItems="center">
                        {posts && posts.map((post) => (
                            <Grid item key={post.id}>
                                <Post
                                    likes={post.likes}
                                    comments={post.comments}
                                    imageUrl={post.imageUrl}
                                    title={post.title}
                                    content={post.content}
                                    createAt={new Date(post.createAt)}
                                    status={post.status}
                                    id={post.id}
                                    userId={post.userId}
                                />
                            </Grid>
                        ))}
                        <Grid item>
                            <Fab color="default" onClick={() => navigate('../create-post')} aria-label="add">
                                <AddIcon color='info' />
                            </Fab>
                        </Grid>
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

export default UserProfile;
