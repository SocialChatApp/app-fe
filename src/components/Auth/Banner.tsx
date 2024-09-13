import { Box, Stack, Typography } from '@mui/material';
import '../../App.css';
import photo1 from '../../assets/images/file.png';
import Lottie from 'lottie-react';
import animationdata from '../../assets/Animation - 1726184971780.json';

function Banner() {
    console.log("main page")
    return (
        <div className='Main-Layout'>
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    // backgroundColor: '#ADA2FF',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Stack padding="40px">
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'flex-start',
                        }}
                    >
                        {/* <Box
                            component="img"
                            sx={{
                                width: '100%',

                            }}
                            src={photo1}
                            alt="Left Image"
                        /> */}

                        <Lottie
                            animationData={animationdata}
                        />
                    </Box>

                    {/* <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',

                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Welcome to Friend Fusion!
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: 17 }} >
                            Friend Fusion is the ultimate platform designed to connect you with new people from all around the world. Whether you're looking to make new friends, find someone with similar interests, or simply have a fun chat, Friend Fusion makes it happen!
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: 17, marginTop: 4 }}>
                            Our unique system randomly matches users for spontaneous and exciting conversations. No more awkward silences or dead-end chats—every three minutes, there's an opportunity for a community vote to remove unwanted participants, keeping your conversations lively and engaging.
                        </Typography>
                    </Box> */}
                </Stack>

            </Box>


        </div>
    );
}

export default Banner;
