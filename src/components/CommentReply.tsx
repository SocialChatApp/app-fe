import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CommentReplyInfoDto } from '../dto/CommentReplyInfoDto';
import { UserInfoDto } from '../dto/UserInfoDto';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchInfoForMedia } from '../redux/userSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCommentReply } from '../redux/commentReplies';
import { useNavigate } from 'react-router-dom';

interface CommentReplyProps {
    info: CommentReplyInfoDto;
    onClose: () => void;
    onFetch: () => void;
}

function CommentReply({ info, onClose, onFetch }: CommentReplyProps) {
    const [userInf, setUserInf] = useState<UserInfoDto | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { info: user } = useSelector((store: RootState) => store.user);
    useEffect(() => {
        handleUserInfo();
    }, []);

    const navigate = useNavigate();

    const handleUserInfo = async () => {
        const response = await dispatch(fetchInfoForMedia(info.userId)).unwrap();
        setUserInf(response);
    };

    const handleDelete = async () => {
        await dispatch(deleteCommentReply(info.id));
        await onFetch();
        onClose();
    }

    const handleUserDetail = (id: string) => {
        if (user.id === id)
            navigate(`/home/user`);
        else
            navigate(`/home/user-detail/${info.id}`);
    }

    return (
        <Box sx={{ mt: 1, mb: 1, p: 1, borderRadius: 2, bgcolor: '#f5f5f5', boxShadow: 1, position: 'relative' }}>
            <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                    onClick={() => {
                        handleUserDetail(info.userId);
                    }}
                    sx={{
                        '&:hover': {
                            cursor: 'pointer',
                            transform: 'scale(1.1)',
                            transition: 'transform 0.2s ease-in-out',
                        },
                    }}
                >
                    <Avatar alt={userInf?.name} src={userInf?.avatarUrl} sx={{ width: 32, height: 32 }} />
                </IconButton>
                <Stack sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                        {userInf?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {info.content}
                    </Typography>
                </Stack>
                {info.userId === user.id && (
                    <IconButton
                        size="medium"
                        onClick={handleDelete}
                        sx={{ width: 30, height: 30 }}
                        color="default"
                        style={{ marginLeft: 'auto' }}
                    >
                        <DeleteIcon color="error" />
                    </IconButton>
                )}
            </Stack>
        </Box>
    );
}

export default CommentReply;
