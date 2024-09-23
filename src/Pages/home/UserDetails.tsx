import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchOtherUserPosts } from '../../redux/postSlice';
import { CreatePostDto } from '../../dto/CreatePostDto';
import { Box, Grid, Avatar, Typography, LinearProgress, Divider } from '@mui/material';
import Post from '../../components/Post';
import { UserInfoDto } from '../../dto/UserInfoDto';
import { fetchInfoForMedia } from '../../redux/userSlice';

function UserDetails() {
    const { id } = useParams();
    const userId = id as string;
    const dispatch = useDispatch<AppDispatch>();
    const [posts, setPosts] = useState<CreatePostDto[]>([]);
    const [userInfo, setUserInfo] = useState<UserInfoDto>();

    const { isLoading } = useSelector((store: RootState) => store.post);

    useEffect(() => {
        fetchUserInfo();
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        const payloadPosts = await dispatch(fetchOtherUserPosts(userId)).unwrap() as CreatePostDto[];
        setPosts(payloadPosts);
    };

    const fetchUserInfo = async () => {
        const payload = await dispatch(fetchInfoForMedia(userId)).unwrap();
        setUserInfo(payload);
    };

    return (
        <Box
            height='100%'
            width='100%'
            my={4}
            p={2}
        >
            {
                !isLoading && userInfo ? (
                    <Box>
                        {/* Kullanıcı Bilgileri */}
                        <Box display="flex" alignItems="center" mb={4}>
                            <Avatar
                                src={userInfo.avatarUrl || ''}
                                alt={userInfo.name.charAt(0)}
                                sx={{ width: 80, height: 80, mr: 2 }}
                            />
                            <Box>
                                <Typography variant="h5" fontWeight="bold">
                                    {userInfo.name} {userInfo.surname}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    @{userInfo.name}{userInfo.surname}
                                </Typography>
                            </Box>

                        </Box>

                        <Divider sx={{ mb: 4 }} />

                        {/* Kullanıcı Gönderileri */}
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            Posts by {userInfo.name}
                        </Typography>
                        <Grid container spacing={2} alignItems="center">
                            {posts && posts.map((post) => (
                                <Grid item key={post.id} xs={12} sm={6} md={4}>
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
                        </Grid>
                    </Box>
                ) : (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                )
            }
        </Box>
    );
}

export default UserDetails;
