import { Badge, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Stack, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { CreatePostDto } from "../dto/CreatePostDto";


function Post(postProp: CreatePostDto) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={postProp.createAt.toDateString()}
            />

            <CardMedia
                component="img"
                height="300"
                image={postProp.imageUrl}
                alt="Post image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {postProp.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {postProp.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Stack direction="row" spacing={3}>
                    <IconButton aria-label="fingerprint" color="secondary">
                        <Badge badgeContent={postProp.likes} color="primary">
                            <FavoriteIcon color="error" />
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="fingerprint" color="success">
                        <Badge badgeContent={postProp.comments} color="primary" >
                            <ChatBubbleOutlineIcon color="action" sx={{ cursor: 'pointer' }} />
                        </Badge>
                    </IconButton>
                </Stack>
            </CardActions>
        </Card>
    )
}

export default Post
