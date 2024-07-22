import React, { useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import useOrder from '@/hooks/useOrder';
import { withProtectedRoute, OrderTable } from '@/components';
import { useRouter } from 'next/router';

const AdminHome = () => {

    const router = useRouter();
    const { orders, getAllOrders, loading, error } = useOrder();

    useEffect(() => {
        getAllOrders();
    }, [getAllOrders]);

    const handleProduct = () => {
        router.push('/product');
    };

    const handleCategory = () => {
        router.push('/admin/categories');
    };

    const handlePromotion = () => {
        router.push('/admin/promotions');
    };

    const handlePayment = () => {
        router.push('/payment/admin')
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h1>ADMIN</h1>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'center' }}>
                <Button style={{ backgroundColor: "#FFFFFF", color: "#121212", fontWeight: 800 }} variant="contained" onClick={handleProduct}>Produtos</Button>
                <Button style={{ backgroundColor: "#FFFFFF", color: "#121212", fontWeight: 800 }} variant="contained">Categorias</Button>
                <Button style={{ backgroundColor: "#FFFFFF", color: "#121212", fontWeight: 800 }} variant="contained">Promoções</Button>
                <Button style={{ backgroundColor: "#FFFFFF", color: "#121212", fontWeight: 800 }} variant="contained" onClick={handlePayment}>Pagamento</Button>
            </div>
            <h1>HISTÓRICO DE PEDIDOS</h1>
            {loading ? (
                <Typography>Carregando...</Typography>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                OrderTable(orders)
            )}
        </div>
    );
};

export default AdminHome;
