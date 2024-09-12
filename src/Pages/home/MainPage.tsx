import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import photo1 from '../../assets/images/file.png';
import photo2 from '../../assets/images/People-showing.png';
import votePhoto from '../../assets/images/vote.jpg';
import UserComment from '../../components/UserComment';
import '../../App.css'

function MainPage() {
    console.log("main page")
    return (
        <div className='Main-Layout'>
            <Box
                sx={{
                    width: '80%',
                    height: '300px',
                    backgroundColor: '#ADA2FF',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    borderRadius: 10,
                    marginBottom: 5
                }}
            >
                <Box
                    sx={{
                        width: '40%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
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
                        //justifyContent: 'center', 
                        paddingLeft: '20px',
                        color: '#FFF8E1',
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
                </Box>
            </Box>

            <Box
                sx={{
                    width: '80%',
                    height: '300px',
                    backgroundColor: '#ADA2FF',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    borderRadius: 10,
                    marginBottom: 5
                }}
            >
                <Box
                    sx={{
                        width: '40%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        src={photo2}
                        alt="Left Image"
                    />
                </Box>

                <Box
                    sx={{
                        width: '60%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        //justifyContent: 'center', 
                        paddingLeft: '20px',
                        color: '#FFF8E1',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="body1" sx={{ fontSize: 17 }} >
                        You can join both public and private chats, depending on your preference. Share your favorite moments by posting photos on your profile. Premium members enjoy exclusive benefits such as the ability to comment on and respond to posts, making interactions even more meaningful.
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: 17, marginTop: 4 }}>
                        Ready to dive in? Friend Fusion is all about building genuine connections in a fun, safe, and dynamic environment. Don't miss out on the chance to be part of a vibrant community where every interaction is a new adventure.
                    </Typography>

                    <Button sx={{
                        width: 150,
                        marginTop: 3,
                        borderRadius: 10,
                        backgroundColor: '#B5ADF4',
                    }} variant="contained">Get Started</Button>
                </Box>
            </Box>


            <Divider
                sx={{
                    width: '80%',
                    borderBottomWidth: 2,
                    marginY: 3,
                    backgroundColor: '#FFE5F1',
                }}
            />

            <Box
                sx={{
                    width: '80%',
                    height: 'auto',
                    padding: 2,
                    borderRadius: 10,
                }}
            >

                <Box
                    sx={{
                        backgroundColor: 'red'
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, color: '#FFF' }}>
                        Üyelik Satışı
                    </Typography>
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
                            height: 150,
                            borderRadius: 10,
                            backgroundColor: '#ADA2FF',
                            padding: 2,
                        }}
                    >
                        <Typography variant="body1" sx={{ color: '#FFF8E1' }}>
                            Üyeliğinizi hemen yükseltin ve premium özelliklerden yararlanın. Sohbet odalarında öncelikli yer alın, profilinizde daha fazla fotoğraf paylaşın ve sınırsız mesajlaşmanın keyfini çıkarın.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: '45%',
                            height: 150,
                            borderRadius: 10,
                            backgroundColor: '#ADA2FF',
                            padding: 2,
                        }}
                    >
                        <Typography variant="body1" sx={{ color: '#FFF8E1' }}>
                            Premium üyeler ayrıca özel sohbetlere katılabilir ve tüm içeriklere sınırsız erişim sağlayabilir. Şimdi üye olun ve ayrıcalıklı bir deneyim yaşayın!
                        </Typography>
                    </Box>
                </Box>
            </Box>

        </div>
    );
}

export default MainPage;
