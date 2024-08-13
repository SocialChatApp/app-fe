import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

function Footer() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#f5f5f5',
                borderTop: '1px solid #e0e0e0',
            }}
        >
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    © 2024 Friend Fusion. All rights reserved.
                </Typography>
            </Box>
            <Box>
                <IconButton color="primary" aria-label="facebook">
                    <Facebook />
                </IconButton>
                <IconButton color="primary" aria-label="twitter">
                    <Twitter />
                </IconButton>
                <IconButton color="primary" aria-label="instagram">
                    <Instagram />
                </IconButton>
                <IconButton color="primary" aria-label="linkedin">
                    <LinkedIn />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Footer;
