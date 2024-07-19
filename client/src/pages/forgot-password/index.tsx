import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { forgotPasswordSchema, ForgotPasswordSchema } from './types';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';

const ForgotPassword: React.FC = () => {
    const router = useRouter();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const { forgotPassword, loading, error } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        clearErrors,
    } = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

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

    const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (data) => {
        try {
            await forgotPassword(data.email);
            setSnackbarMessage('Link enviado por email.');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            reset();

            setTimeout(() => {
                router.push('/sign-in');
            }, 1000);
        } catch (err) {
            setSnackbarMessage('Erro ao enviar o email.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', py: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary' }}>
                Esqueci minha senha
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 2, mt: 4 }}>
                Insira seu email e nós enviaremos um link para redefinir sua senha.
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', mx: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                placeholder="Digite seu email"
                                variant="outlined"
                                fullWidth
                                required
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                onChange={(e) => {
                                    field.onChange(e);
                                    if (e.target.value === '') {
                                        clearErrors('email');
                                    }
                                }}
                            />
                        )}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'center', px: 4, mt: 3.5 }} disabled={isSubmitting || loading}>
                    {isSubmitting || loading ? 'Enviando...' : 'Enviar'}
                </Button>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ForgotPassword;
