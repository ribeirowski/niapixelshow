import React, { useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import useUser from '@/hooks/useUser';
import { withProtectedRoute } from '@/components';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';

const Profile: React.FC = () => {
    const router = useRouter();
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

    const handleEdit = () => {
        router.push(`/profile/edit-user/${user?.uid}`);
    };

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', p: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" color="secondary" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', mb: 4, mt: 1 }}>
                Perfil do Usuário
            </Typography>
            {userData && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 4, mb: 1 }}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" color="secondary" sx={{ fontWeight: 600 }}>Nome:</Typography>
                        <Typography variant="body1" color="secondary">{userData.name || "-"}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" color="secondary" sx={{ fontWeight: 600 }}>Email:</Typography>
                        <Typography variant="body1" color="secondary">{userData.email || "-"}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" color="secondary" sx={{ fontWeight: 600 }}>Telefone:</Typography>
                        <Typography variant="body1" color="secondary">{userData.phone || "-"}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" color="secondary" sx={{ fontWeight: 600 }}>Endereço:</Typography>
                        <Typography variant="body1" color="secondary">{userData.address || "-"}</Typography>
                    </Box>
                    <Button onClick={handleEdit} variant="contained" color="primary" sx={{ alignSelf: 'end', marginTop: '1rem' }}>
                        Editar Perfil
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default withProtectedRoute(Profile);