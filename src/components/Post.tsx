import { Badge, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Stack, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { CreatePostDto } from "../dto/CreatePostDto";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { deletePost } from "../redux/postSlice";


function Post(postProp: CreatePostDto) {

    const dispatch = useDispatch<AppDispatch>();
    const handleDelete = async () => {
        await dispatch(deletePost(postProp.id));
    }
    return (
        <Card sx={{ maxWidth: 350 }}>
            <CardHeader
                title={
                    <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                        {postProp.createAt.toDateString()}
                    </Typography>
                }
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
            <Divider />
            <CardActions>
                <Stack
                    direction="row"
                    spacing={2}
                    style={{ width: '100%' }}
                    justifyContent="space-between"
                >
                    <Stack direction="row" spacing={2}>
                        <IconButton size="medium" sx={{ width: 30, height: 30 }} color="secondary">
                            <Badge badgeContent={4} color="primary">
                                <FavoriteIcon color="error" />
                            </Badge>
                        </IconButton>
                        <IconButton size="medium" sx={{ width: 30, height: 30 }} color="success">
                            <Badge badgeContent={5} color="primary">
                                <ChatBubbleOutlineIcon color="action" />
                            </Badge>
                        </IconButton>
                    </Stack>
                    <IconButton size="medium" onClick={handleDelete} sx={{ width: 30, height: 30 }} color="default" style={{ marginLeft: 'auto' }}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Stack>
            </CardActions>
        </Card>
    )
}

export default Post
