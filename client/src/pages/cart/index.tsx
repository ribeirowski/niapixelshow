import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Snackbar, Alert, TextField } from '@mui/material';
import useCart, { CartItem } from '@/hooks/useCart';
import { useRouter } from 'next/router';

const CartPage: React.FC = () => {
    const router = useRouter();
    const userId = router.query.id as string; // Obtenha o userId da rota ou ajuste conforme necessário
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const { cart, getAllCartItems, updateCartItem, deleteCartItem, loading, error, resetError } = useCart();

    useEffect(() => {
        if (userId) {
            getAllCartItems(userId);
        }
    }, [userId]);

    useEffect(() => {
        if (error) {
            setSnackbarMessage(error);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    }, [error]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
        if (newQuantity <= 0) {
            await deleteCartItem(userId, item.item_id);
        } else {
            await updateCartItem(userId, item.item_id, { ...item, quantity: newQuantity });
        }
        await getAllCartItems(userId);
    };

    const handleRemoveItem = async (itemId: string) => {
        await deleteCartItem(userId, itemId);
        await getAllCartItems(userId);
    };

    return (
        <Container maxWidth="md" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', py: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                Carrinho de Compras
            </Typography>
            {cart.length === 0 ? (
                <Typography variant="h6" component="p" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    Seu carrinho está vazio.
                </Typography>
            ) : (
                <Box>
                    {cart.map((item) => (
                        <Box key={item.item_id} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box component="img" src={item.image} alt={item.name} sx={{ width: 100, height: 100, borderRadius: 1, mr: 2 }} />
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" component="p">{item.name}</Typography>
                                <Typography variant="body2" component="p" color="text.secondary">{item.description}</Typography>
                                <Typography variant="body1" component="p">R$ {item.price.toFixed(2)}</Typography>
                            </Box>
                            <TextField
                                label="Quantidade"
                                type="number"
                                variant="outlined"
                                size="small"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                sx={{ width: 80, mr: 2 }}
                                InputProps={{
                                    inputProps: { min: 1 }
                                }}
                            />
                            <Button variant="contained" color="secondary" onClick={() => handleRemoveItem(item.item_id)}>
                                Remover
                            </Button>
                        </Box>
                    ))}
                </Box>
            )}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CartPage;
