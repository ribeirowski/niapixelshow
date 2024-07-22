import React, { useState } from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import useOrder from '@/hooks/useOrder';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';

const PaymentPage = () => {
    const router = useRouter();
    const { loading, error } = useOrder();
    const { users } = useUser();
    const [paymentCode] = useState<string>('COPIA_E_COLA_CODE'); // Substitua pelo código real

    const handleBack = () => {
        router.back();
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handleCopyCode = () => {
        navigator.clipboard.writeText(paymentCode).then(() => {
            alert('Código copiado para a área de transferência!');
        });
    };

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', p: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                Pagamento
            </Typography>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
                <Typography variant="h6" component="h2" color='primary' gutterBottom sx={{ fontWeight: '700', textAlign: 'center', mb: 2 }}>
                    Código Copia e Cola
                </Typography>
                <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                    <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>{paymentCode}</Typography>
                </Box>
                <Box textAlign='center'>
                    <Button variant="contained" color="primary" onClick={handleCopyCode}>
                        Copiar Código
                    </Button>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
                <Typography variant="h6" component="h2" color='primary' gutterBottom sx={{ fontWeight: '700', textAlign: 'center', mb: 2 }}>
                    QR Code
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/nia-pixel-show.appspot.com/o/shereko.png?alt=media&token=e707c37c-822a-40ea-8252-e185312a30da" alt="QR Code para Pagamento" style={{ maxWidth: '100%' }} />
                </Box>
            </Paper>
            <Box textAlign='center'>
                <Button variant="contained" color="primary" onClick={handleBack} sx={{ mt: 2 }}>
                    Voltar
                </Button>
            </Box>
        </Container>
    );
}

export default PaymentPage;
