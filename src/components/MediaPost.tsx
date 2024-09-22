import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Stack, Typography, Modal, Badge, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import { PostInfoDto } from '../dto/PostInfoDto';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchInfoForMedia } from '../redux/userSlice';
import { UserInfoDto } from '../dto/UserInfoDto';
import { CommentInfoDto } from '../dto/CommentInfoDto';
import { CreateCommentDto } from '../dto/CreateCommentDto';
import { createComment, fetchAllComments } from '../redux/commentSlice';
import { CreateUserDto } from '../dto/CreateUserDto';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment';

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

interface MediaPostProps {
    post: PostInfoDto;
}

function MediaPost({ post }: MediaPostProps) {

    const dispatch = useDispatch<AppDispatch>();

    const [userInf, setUserInf] = useState<UserInfoDto | null>(null);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState('');
    const [open, setOpen] = useState(false);
    const [commentsWithUserInfo, setCommentsWithUserInfo] = useState<{ comment: CommentInfoDto; userInfo: CreateUserDto | null }[]>([]);
    const [commentCount, setCommentCount] = useState(0);

    const { info: myInfo } = useSelector((store: RootState) => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        handleUserInfo();
        fetchComments();
    }, []);

    const handleUserInfo = async () => {
        const response = await dispatch(fetchInfoForMedia(post.userId)).unwrap();
        setUserInf(response);
    }

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    // Yorum yapıldığında
    const handleCommentSubmit = async () => {
        if (!userInf) return;

        const commentDto: CreateCommentDto = {
            userId: myInfo.id,
            postId: post.id,
            content: comment
        };

        const response = await dispatch(createComment(commentDto));
        if (response) {
            handleClose();
            setComment('');
            await fetchComments();
        }
    };

    const handleUserDetail = (info: UserInfoDto) => {
        if (myInfo.id === info.id)
            navigate(`/home/user`);
        else
            navigate(`/home/user-detail/${info.id}`);
    }

    const fetchComments = async () => {
        try {
            const action = await dispatch(fetchAllComments(post.id));
            if (fetchAllComments.fulfilled.match(action)) {
                const comments: CommentInfoDto[] = action.payload;

                const userInfos = await Promise.all(
                    comments.map(async (comment) => {
                        const userInfoAction = await dispatch(fetchInfoForMedia(comment.userId));
                        if (fetchInfoForMedia.fulfilled.match(userInfoAction)) {
                            return userInfoAction.payload;
                        } else {
                            console.error("Kullanıcı bilgileri alınırken hata oluştu:", userInfoAction.error);
                            return null;
                        }
                    })
                );

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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Card sx={{ maxWidth: 400, m: 2, borderRadius: 4, boxShadow: 3 }}>
            {/* Post Image */}
            <CardMedia
                component="img"
                height="200"
                image={post.imageUrl}
                alt="Post image"
                sx={{ objectFit: 'cover' }}
            />

            {/* Avatar, Title, and Content */}
            <CardHeader
                avatar={
                    <IconButton
                        onClick={() => {
                            if (userInf)
                                handleUserDetail(userInf);
                        }}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                                transform: 'scale(1.1)',
                                transition: 'transform 0.2s ease-in-out',
                            },
                        }}
                    >
                        <Avatar
                            src={userInf?.avatarUrl || ''}
                            alt={post.title.charAt(0)}
                            sx={{ bgcolor: '#2196f3' }}
                        />
                    </IconButton>
                }
                title={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{post.title}</Typography>}
                subheader={<Typography variant="body2" color="textSecondary">{userInf?.name}</Typography>}
            />

            {/* Content */}
            <CardContent>
                <Typography variant="body1" color="textSecondary">
                    {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
                </Typography>
            </CardContent>

            {/* Divider */}
            <Divider />

            {/* Actions: Like and Comment */}
            <CardActions>
                <Stack
                    direction="row"
                    spacing={2}
                    style={{ width: '100%' }}
                    justifyContent="space-between"
                >
                    <Stack direction="row" spacing={2}>
                        <IconButton onClick={handleLike}>
                            <Badge badgeContent={0} color="primary">
                                <FavoriteIcon color={liked ? "error" : "action"} />
                            </Badge>
                        </IconButton>
                        <IconButton onClick={handleOpen}>
                            <Badge badgeContent={commentCount} color="primary">
                                <ChatBubbleOutlineIcon color="action" />
                            </Badge>
                        </IconButton>
                    </Stack>
                </Stack>
            </CardActions>

            {/* Modal for comments */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="comment-modal-title"
                aria-describedby="comment-modal-description"
            >
                <Box sx={modalStyle}>
                    <Stack direction="column" spacing={2}>
                        <Stack spacing={1}>
                            {commentsWithUserInfo.map(({ comment, userInfo }) => (
                                <Comment
                                    key={comment.id}
                                    commentInfo={comment}
                                    userInfo={userInfo!}
                                    onUserDetail={handleUserDetail}
                                    onFetchAllComments={fetchComments}
                                    onHandleClose={setOpen}
                                />
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

export default MediaPost;
