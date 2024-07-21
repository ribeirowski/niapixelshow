import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, MenuItem, Select, InputLabel, FormControl, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useUser, useOrder } from '@/hooks';
import { useRouter } from 'next/router';

const PaymentManagement = () => {
    const router = useRouter();
    const { users, getAllUsers } = useUser();
    const { orders, filterOrders, getAllOrders, updateOrder, loading, error } = useOrder();
    const [status, setStatus] = useState<string>('Aguardando Pagamento');
    const [userMap, setUserMap] = useState<{ [email: string]: string }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([getAllOrders(), getAllUsers()]);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, [getAllOrders, getAllUsers]);

    useEffect(() => {
        if (users) {
            const map = users.reduce((acc: { [email: string]: string }, user) => {
                acc[user.email] = user.name;
                return acc;
            }, {});
            setUserMap(map);
        }
    }, [users]);

    const handleFilter = () => {
        filterOrders('status', 'Igual a', status, '');
    };

    const resetFilters = () => {
        setStatus('Aguardando Pagamento');
        getAllOrders();
    };

    const handleStatus = (orderId: string) => {
        router.push(`/payment/admin/${orderId}`)
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    var val: string

    return (
        <Container maxWidth="lg" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', p: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                Status dos Pedidos
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Filtrar Status</InputLabel>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            label="Status"
                        >
                            <MenuItem value="Erro no Pagamento">Erro no Pagamento</MenuItem>
                            <MenuItem value="Aguardando Pagamento">Aguardando Pagamento</MenuItem>
                            <MenuItem value="Pago">Pago</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                    <Button variant="contained" onClick={handleFilter} sx={{ mb: 2 }}>
                        Filtrar
                    </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant="outlined" onClick={resetFilters} sx={{ mb: 2 }}>
                        Resetar Filtros
                    </Button>
                </Grid>
            </Grid>
            {orders.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center' }}>Nenhum pedido encontrado.</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 'none' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center'}}>Nome</TableCell>
                                <TableCell sx={{ textAlign: 'center'}}>Email</TableCell>
                                <TableCell sx={{ textAlign: 'center'}}>Valor</TableCell>
                                <TableCell sx={{ textAlign: 'center'}}>Status</TableCell>
                                <TableCell sx={{ textAlign: 'center'}}>Alterar Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell sx={{ textAlign: 'center'}}>{userMap[order.email]}</TableCell>
                                    <TableCell sx={{ textAlign: 'center'}}>{order.email}</TableCell>
                                    <TableCell sx={{ textAlign: 'center'}}>{order.price}</TableCell>
                                    <TableCell sx={{ textAlign: 'center'}}>{order.status}</TableCell>
                                    <TableCell sx={{ textAlign: 'center'}}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleStatus(order.id)}
                                        >
                                            Alterar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}

export default PaymentManagement;
