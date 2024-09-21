import { Box, Button, Divider, Typography } from '@mui/material';
import photo1 from '../../assets/images/file.png';
import photo2 from '../../assets/images/People-showing.png';
import '../../App.css';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import Cookies from 'js-cookie';
import { setUser } from '../../redux/userSlice';
import { LogicOperation, updateAuthInf } from '../../redux/authSlice';

function MainPage() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const userInf = Cookies.get('authInf');
        if (userInf) {
            const parsedUserInf = JSON.parse(userInf) as LogicOperation;
            dispatch(updateAuthInf(parsedUserInf));
            dispatch(setUser(parsedUserInf.userInf));

            console.log(parsedUserInf);
        }

    }, [dispatch]);
    return (
        <div className='Main-Layout'>

            <Box
                sx={{
                    width: '80%',
                    height: '300px',
                    backgroundColor: '#ADA2FF',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    borderRadius: 10,
                    marginBottom: 5,
                    boxShadow: 3
                }}
            >
                <Box
                    sx={{
                        width: '40%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 10
                        }}
                        src={photo1}
                        alt="Left Image"
                    />
                </Box>

                <Box
                    sx={{
                        width: '60%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        paddingLeft: '20px',
                        color: '#FFF8E1'
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Welcome to Friend Fusion!
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: 17, mb: 2 }}>
                        Friend Fusion is the ultimate platform designed to connect you with new people from all around the world. Whether you're looking to make new friends, find someone with similar interests, or simply have a fun chat, Friend Fusion makes it happen!
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: 17 }}>
                        Our unique system randomly matches users for spontaneous and exciting conversations. No more awkward silences or dead-end chats—every three minutes, there's an opportunity for a community vote to remove unwanted participants, keeping your conversations lively and engaging.
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    width: '80%',
                    height: '300px',
                    backgroundColor: '#ADA2FF',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    borderRadius: 10,
                    marginBottom: 5,
                    boxShadow: 3
                }}
            >
                <Box
                    sx={{
                        width: '40%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 10
                        }}
                        src={photo2}
                        alt="Right Image"
                    />
                </Box>

                <Box
                    sx={{
                        width: '60%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        paddingLeft: '20px',
                        color: '#FFF8E1',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="body1" sx={{ fontSize: 17, mb: 2 }}>
                        You can join both public and private chats, depending on your preference. Share your favorite moments by posting photos on your profile. Premium members enjoy exclusive benefits such as the ability to comment on and respond to posts, making interactions even more meaningful.
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: 17 }}>
                        Ready to dive in? Friend Fusion is all about building genuine connections in a fun, safe, and dynamic environment. Don't miss out on the chance to be part of a vibrant community where every interaction is a new adventure.
                    </Typography>

                    <Button
                        sx={{
                            width: 150,
                            marginTop: 3,
                            borderRadius: 10,
                            backgroundColor: '#B5ADF4',
                            color: '#FFF',
                            '&:hover': {
                                backgroundColor: '#9B8ED0'
                            }
                        }}
                        variant="contained"
                    >
                        Get Started
                    </Button>
                </Box>
            </Box>

            <Divider
                sx={{
                    width: '80%',
                    borderBottomWidth: 2,
                    marginY: 3,
                    backgroundColor: '#FFE5F1'
                }}
            />

            <Box
                sx={{
                    width: '80%',
                    padding: 2,
                    borderRadius: 10,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 4
                    }}
                >
                    <Box
                        sx={{
                            width: 350,
                            backgroundColor: '#ADA2FF',
                            borderRadius: 10,
                            padding: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFE5F1' }}>
                            Subscription Sale
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 4
                    }}
                >
                    <Box
                        sx={{
                            width: '45%',
                            borderRadius: 10,
                            backgroundColor: '#ADA2FF',
                            padding: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFE5F1' }}>
                            Free
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: '45%',
                            borderRadius: 10,
                            backgroundColor: '#ADA2FF',
                            padding: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFE5F1' }}>
                            Premium
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            width: '45%',
                            height: 'auto',
                            borderRadius: 10,
                            backgroundColor: '#ADA2FF',
                            padding: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1
                        }}
                    >
                        <Typography variant="body1" sx={{ color: '#FFF8E1', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CancelIcon sx={{ color: '#FFF8E1' }} /> Post Sharing
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#FFF8E1', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CancelIcon sx={{ color: '#FFF8E1' }} /> Commenting
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#FFF8E1', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CancelIcon sx={{ color: '#FFF8E1' }} /> Liking Posts
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#FFF8E1', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CancelIcon sx={{ color: '#FFF8E1' }} /> Private Chat Feature
                        </Typography>

                        <Typography variant="h6" sx={{ marginTop: 5, color: '#FFF8E1' }}>
                            Free Membership (0 TRY/month)
                        </Typography>

                        <Button
                            sx={{
                                width: 150,
                                borderRadius: 10,
                                backgroundColor: '#B5ADF4',
                                color: '#FFF',
                                '&:hover': {
                                    backgroundColor: '#9B8ED0'
                                },
                            }}
                            variant="contained"
                        >
                            Buy
                        </Button>

                    </Box>

                    <Box
                        sx={{
                            width: '45%',
                            height: 'auto',
                            borderRadius: 10,
                            backgroundColor: '#ADA2FF',
                            padding: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1
                        }}
                    >
                        <Typography variant="body1" sx={{ color: '#FFF8E1', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckIcon sx={{ color: '#FFF8E1' }} /> Post Sharing
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#FFF8E1', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckIcon sx={{ color: '#FFF8E1' }} /> Commenting
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#FFF8E1', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckIcon sx={{ color: '#FFF8E1' }} /> Liking Posts
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#FFF8E1', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckIcon sx={{ color: '#FFF8E1' }} /> Private Chat Feature
                        </Typography>

                        <Typography variant="h6" sx={{ marginTop: 5, color: '#FFF8E1' }}>
                            Premium Membership (5 TRY/month)
                        </Typography>

                        <Button
                            sx={{
                                width: 150,
                                borderRadius: 10,
                                backgroundColor: '#B5ADF4',
                                color: '#FFF',
                                '&:hover': {
                                    backgroundColor: '#9B8ED0'
                                },
                            }}
                            variant="contained"
                        >
                            Buy
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default MainPage;
