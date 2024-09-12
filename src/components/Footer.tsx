import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';


function Footer() {
    return (
        <Box
            sx={{
                // position: 'fixed',
                // bottom: 0,
                width: '100%',
                height: '50px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#ADA2FF',
                borderTop: '1px solid #e0e0e0',
            }}
        >
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'left' }}>
                <Typography variant="body2" sx={{ color: '#FFE5F1', fontFamily: 'Onton, sans-serif' }}>
                    © 2024 Friend Fusion. All rights reserved.
                </Typography>
            </Box>
            <Box sx={{ flexGrow: 150, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" sx={{ color: '#FFE5F1', fontSize: 25 }}>
                    Friend Fusion
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
