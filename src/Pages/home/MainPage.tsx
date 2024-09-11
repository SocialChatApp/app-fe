import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import photo from '../../assets/images/img1.jpg';
import votePhoto from '../../assets/images/vote.jpg';
import UserComment from '../../components/UserComment';


function MainPage() {
    console.log("main page")
    return (
        <div>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item xs={6} style={{ margin: 0, padding: 0 }}>
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        src={photo}
                    />
                </Grid>

                <Grid item xs={6} style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome to Friend Fusion!
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Friend Fusion is the ultimate platform designed to connect you with new people from all around the world. Whether you're looking to make new friends, find someone with similar interests, or simply have a fun chat, Friend Fusion makes it happen!
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Our unique system randomly matches users for spontaneous and exciting conversations. No more awkward silences or dead-end chats—every three minutes, there's an opportunity for a community vote to remove unwanted participants, keeping your conversations lively and engaging.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You can join both public and private chats, depending on your preference. Share your favorite moments by posting photos on your profile. Premium members enjoy exclusive benefits such as the ability to comment on and respond to posts, making interactions even more meaningful.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Ready to dive in? Friend Fusion is all about building genuine connections in a fun, safe, and dynamic environment. Don't miss out on the chance to be part of a vibrant community where every interaction is a new adventure.
                    </Typography>
                    <Button variant="contained" color="primary" style={{ width: '300px', alignSelf: 'center' }} sx={{ mt: 2 }}>
                        Get Started
                    </Button>
                </Grid>

                <Box sx={{ width: '100%', my: 1 }}>
                    <Divider sx={{ bgcolor: 'grey.200', height: '2px' }} />
                </Box>

                <Grid item xs={6} style={{ margin: 0, padding: 0 }}>
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        src={votePhoto}
                    />
                </Grid>

                <Grid item xs={6} style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>

                    <Typography variant="body1" paragraph>
                        At Friend Fusion, conversations start spontaneously as users are randomly placed into chat rooms. Every 5 minutes, a voting session occurs, allowing users to provide feedback on their chat experience. To initiate a voting session, there must be more than two users in the room.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        This system ensures that users who engage in harassment, disruptive behavior, or persistently discuss unwanted topics can be removed from the chat. By maintaining a respectful and enjoyable environment, Friend Fusion helps foster meaningful interactions and a positive community experience. Join us to be part of a dynamic and secure space where every conversation is a new opportunity to connect!
                    </Typography>
                </Grid>

                <Box sx={{ width: '100%', my: 1 }}>
                    <Divider sx={{ bgcolor: 'grey.200', height: '2px' }} />
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <UserComment
                            avatarLetter="A"
                            date="August 7, 2024"
                            comment="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <UserComment
                            avatarLetter="A"
                            date="August 7, 2024"
                            comment="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <UserComment
                            avatarLetter="A"
                            date="August 7, 2024"
                            comment="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
                        />
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );
}

export default MainPage;
