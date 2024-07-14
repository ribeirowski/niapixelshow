import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
    return (
        <Box sx={{ backgroundColor: '#DA0037', borderRadius: '1rem', marginBottom: '2rem', padding: '2rem 0' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginX: '1.5rem' }}>
                    <Typography variant="h6" sx={{ color: '#EDEDED', fontWeight: '700', cursor: 'default' }}>
                        Nia Pixel Show
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#EDEDED', cursor: 'default' }}>
                        © 2024 Nia Pixel Show. All Rights Reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <IconButton aria-label="Instagram" sx={{ color: '#EDEDED' }}>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton aria-label="WhatsApp" sx={{ color: '#EDEDED' }}>
                            <WhatsAppIcon />
                        </IconButton>
                        <IconButton aria-label="LinkedIn" sx={{ color: '#EDEDED' }}>
                            <LinkedInIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
