import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import useUser from '@/hooks/useUser';
import { withProtectedRoute } from '@/components';
import useAuth from '@/hooks/useAuth';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const { userData, getUserById, loading, error } = useUser();

    useEffect(() => {
        if (user && user.uid) {
            getUserById(user.uid);
        }
    }, [user, getUserById]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', p: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                Perfil do Usuário
            </Typography>
            {userData && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 4, mb: 1 }}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>Nome:</Typography>
                        <Typography variant="body1">{userData.name}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>Email:</Typography>
                        <Typography variant="body1">{userData.email}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>Telefone:</Typography>
                        <Typography variant="body1">{userData.phone}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>Endereço:</Typography>
                        <Typography variant="body1">{userData.address}</Typography>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default withProtectedRoute(Profile);