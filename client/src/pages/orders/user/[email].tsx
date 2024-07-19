import React, { useEffect } from 'react';
import { Container, Typography, Box, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import useOrder from '@/hooks/useOrder';
import useUser from '@/hooks/useUser'
import { withProtectedRoute } from '@/components';
import { useRouter } from 'next/router';
import { OrderTable } from '../../../components';

const OrderDetails: React.FC = () => {
    const router = useRouter();
    const { email } = router.query; // Obtém o email do pedido da URL
    const { orders, filterOrders, loading, error } = useOrder();

    useEffect(() => {
        if (email && typeof email === 'string') {
            filterOrders("email", "Igual a", email);
        }
    }, [email, filterOrders]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <Container maxWidth="lg" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', p: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                Histórico de Pedidos
            </Typography>
            {orders.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center' }}>Nenhum pedido encontrado.</Typography>
            ) : (
                OrderTable(orders)
            )}
        </Container>
    );
};

export default withProtectedRoute(OrderDetails);
