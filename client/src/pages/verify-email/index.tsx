import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const VerifyEmail: React.FC = () => {
    const router = useRouter();

    const handleRedirectToLogin = () => {
        router.push('/sign-in');
    };

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', py: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                Verificação de E-mail
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 1 }}>
                Verifique seu e-mail para ativar sua conta.
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 4 }}>
                Após verificar seu e-mail, clique no botão abaixo para fazer login.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleRedirectToLogin} sx={{ display: 'block', mx: 'auto' }}>
                Ir para Login
            </Button>
        </Container>
    );
};

export default VerifyEmail;
