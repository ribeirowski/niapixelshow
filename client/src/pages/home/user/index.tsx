import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

const UserHome: React.FC = () => {
    const router = useRouter();

    return (
        <Container maxWidth="xl" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', py: 4, boxShadow: 3 }}>
            <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: '700', color: 'text.primary' }}>
                    Bem-vindo ao Nia Pixel Show
                </Typography>
                <Typography variant="h5" component="p" gutterBottom sx={{ color: 'text.secondary', mb: 4 }}>
                    Seu hub de tecnologia e inovação.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ px: 4, py: 1.5, fontWeight: '600' }} 
                    onClick={() => router.push('/about')}
                >
                    Saiba Mais
                </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', mt: 4 }}>
                <Box sx={{ width: { xs: '100%', md: '45%' }, mb: 4 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: '600', color: 'text.primary' }}>
                        Nossos Produtos
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ color: 'text.secondary', mt: 2 }}>
                        Explore nossa vasta gama de produtos tecnológicos que vão desde softwares inovadores até gadgets de última geração.
                    </Typography>
                </Box>
                <Box sx={{ width: { xs: '100%', md: '45%' }, mb: 4 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: '600', color: 'text.primary' }}>
                        Quem Somos
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ color: 'text.secondary', mt: 2 }}>
                        Conheça mais sobre a nossa empresa, nossa missão e nossos valores. Descubra como estamos revolucionando o mercado de tecnologia.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default UserHome;
