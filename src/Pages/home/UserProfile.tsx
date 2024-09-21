import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Grid, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Post from '../../components/Post';
import { fetchMyPosts } from '../../redux/postSlice';
import { AppDispatch, RootState } from '../../redux/store';

function UserProfile() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchMyPosts());
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
                                    likeCount={post.likeCount}
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
