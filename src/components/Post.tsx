import React, { useEffect, useState } from 'react';
import { Badge, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Stack, Typography, Modal, Box, TextField, Avatar } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { CreatePostDto } from "../dto/CreatePostDto";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { deletePost } from "../redux/postSlice";
import { CreateCommentDto } from '../dto/CreateCommentDto';
import { createComment, fetchAllComments } from '../redux/commentSlice';
import { CommentInfoDto } from '../dto/CommentInfoDto';
import { fetchUserInfo } from '../redux/userSlice';
import { CreateUserDto } from '../dto/CreateUserDto';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
};

function Post(postProp: CreatePostDto) {
    const { info: user } = useSelector((store: RootState) => store.user);
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [commentCount, setCommentCount] = useState(0);
    const [commentsWithUserInfo, setCommentsWithUserInfo] = useState<{ comment: CommentInfoDto; userInfo: CreateUserDto | null }[]>([]);

    // Yorumları çekmek için kullanılan fonksiyon
    const fetchComments = async () => {
        try {
            const action = await dispatch(fetchAllComments(postProp.id));
            if (fetchAllComments.fulfilled.match(action)) {
                const comments: CommentInfoDto[] = action.payload;

                // Kullanıcı bilgilerini almak için fetchUserInfo'yu çağırıyoruz
                const userInfos = await Promise.all(
                    comments.map(async (comment) => {
                        const userInfoAction = await dispatch(fetchUserInfo(comment.userId));
                        if (fetchUserInfo.fulfilled.match(userInfoAction)) {
                            return userInfoAction.payload; // Kullanıcı bilgilerini döndür
                        } else {
                            console.error("Kullanıcı bilgileri alınırken hata oluştu:", userInfoAction.error);
                            return null; // Hata durumunda null döndür
                        }
                    })
                );

                // Kullanıcı bilgilerini yorumlarla birleştirme
                const commentsWithUserInfo = comments.map((comment, index) => ({
                    comment,
                    userInfo: userInfos[index],
                }));

                setCommentsWithUserInfo(commentsWithUserInfo);
                setCommentCount(comments.length);
            } else {
                console.error("Yorumlar alınırken bir hata oluştu:", action.error);
            }
        } catch (error) {
            console.error("Yorumlar alınırken hata oluştu:", error);
        }
    };

    useEffect(() => {
        fetchComments(); // Yorumları başlangıçta çek
    }, [dispatch, postProp.id]);

    const handleDelete = async () => {
        await dispatch(deletePost(postProp.id));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        const commentDto: CreateCommentDto = {
            userId: user.id,
            postId: postProp.id,
            content: comment
        };

        const response = await dispatch(createComment(commentDto));
        if (response) {
            handleClose();
            setComment('');
            await fetchComments(); // Yeni yorumu ekledikten sonra yorumları tekrar çek
        }
    };

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
                        <IconButton size="medium" sx={{ width: 30, height: 30 }} color="success" onClick={handleOpen}>
                            <Badge badgeContent={commentCount} color="primary">
                                <ChatBubbleOutlineIcon color="action" />
                            </Badge>
                        </IconButton>
                    </Stack>
                    <IconButton size="medium" onClick={handleDelete} sx={{ width: 30, height: 30 }} color="default" style={{ marginLeft: 'auto' }}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Stack>
            </CardActions>

            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Stack direction="column" spacing={2}>
                        <Stack spacing={1}>
                            {commentsWithUserInfo.map(({ comment, userInfo }) => (
                                <Stack direction="row" key={comment.id} spacing={1} alignItems="center">
                                    {userInfo && (
                                        <>
                                            <Avatar alt={userInfo.name} src={userInfo.avatarUrl} />
                                            <Typography variant="body2">
                                                {userInfo.name}: {comment.content}
                                            </Typography>
                                        </>
                                    )}
                                </Stack>
                            ))}
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <TextField
                                id="comment-field"
                                label="Comment"
                                variant="outlined"
                                size="small"
                                value={comment}
                                onChange={handleCommentChange}
                                fullWidth
                            />
                            <IconButton color="primary" onClick={handleCommentSubmit}>
                                <SendIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </Card>
    );
}

export default Post;
