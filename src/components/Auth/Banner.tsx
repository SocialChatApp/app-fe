import { Box, Stack } from '@mui/material';
import '../../App.css';
import Lottie from 'lottie-react';
import animationdata from '../../assets/LottieLoginAnimation.json';

function Banner() {
    return (
        <div className='Main-Layout'>
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
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

                        <Lottie
                            animationData={animationdata}
                        />
                    </Box>
                </Stack>

            </Box>


        </div>
    );
}

export default Banner;
