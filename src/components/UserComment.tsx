import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box } from '@mui/material';

interface UserCommentProps {
    avatarLetter: string;
    date: string;
    comment: string;
}

function UserComment({ avatarLetter, date, comment }: UserCommentProps) {
    return (
        <Card sx={{ maxWidth: 350, marginLeft: '30px', marginTop: '10px' }}>
            <CardContent>
                <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {avatarLetter}
                    </Avatar>
                    <Box ml={2}>
                        <Typography variant="body2" color="text.primary">
                            Date: {date}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" mt={2}>
                    {comment}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default UserComment;
