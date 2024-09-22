import React, { useEffect, useState } from 'react'
import { CommentInfoDto } from '../dto/CommentInfoDto'
import { CreateUserDto } from '../dto/CreateUserDto';
import { Avatar, Box, Button, IconButton, Modal, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { createCommentReply, fetchAllCommentReply } from '../redux/commentReplies';
import { CommentReplyInfoDto } from '../dto/CommentReplyInfoDto';
import { CreateCommentReplyDto } from '../dto/CreateCommentReplyDto';
import CommentReply from './CommentReply';

interface CommentProps {
    commentInfo: CommentInfoDto;
    userInfo: CreateUserDto;
    onUserDetail: (info: CreateUserDto) => void;
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
};


function Comment({ commentInfo, userInfo, onUserDetail }: CommentProps) {

    const dispatch = useDispatch<AppDispatch>();

    const [replies, setReplies] = useState<CommentReplyInfoDto[]>([]);

    const { info } = useSelector((store: RootState) => store.user);

    useEffect(() => {
        fetchReply();
    }, []);


    const [open, setOpen] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReplyContent(event.target.value);
    };

    const fetchReply = async () => {
        const response = await dispatch(fetchAllCommentReply(commentInfo.id)).unwrap();
        setReplies(response);
    }

    const handleReplySubmit = async () => {
        console.log('Yanıt gönderildi:', replyContent);
        const replyDto: CreateCommentReplyDto = {
            commentId: commentInfo.id,
            userId: info.id,
            content: replyContent
        };
        await dispatch(createCommentReply(replyDto));
        await fetchReply();

        setReplyContent('');
        handleClose();
    };

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
                onClick={() => onUserDetail(userInfo)}
                sx={{
                    '&:hover': {
                        cursor: 'pointer',
                        transform: 'scale(1.1)',
                        transition: 'transform 0.2s ease-in-out',
                    },
                }}
            >
                <Avatar alt={userInfo.name} src={userInfo.avatarUrl} />
            </IconButton>
            <Typography variant="body2">
                {userInfo.name}: {commentInfo.content}
            </Typography>
            <Button onClick={handleOpen} sx={{ textTransform: 'none' }}>
                {replies.length > 0 ? `+${replies.length}` : "Answer"}
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6">Yanıtlar</Typography>
                    <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 2 }}>
                        {replies.map(reply => (
                            <CommentReply onClose={handleClose} onFetch={fetchReply} key={reply.id} info={reply} />
                        ))}
                    </Box>
                    <Typography variant="h6">Yeni Yanıt Yaz</Typography>
                    <TextField
                        label="Yanıtınızı yazın"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={replyContent}
                        onChange={handleReplyChange}
                        sx={{ mt: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleReplySubmit}
                        sx={{ mt: 2 }}
                    >
                        Gönder
                    </Button>
                </Box>
            </Modal>
        </Stack>
    )
}

export default Comment
