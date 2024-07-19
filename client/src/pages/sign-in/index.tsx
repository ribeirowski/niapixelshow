import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography, Snackbar, Alert, IconButton, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginSchema, LoginSchema } from './types';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login: React.FC = () => {
    const router = useRouter();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [showPassword, setShowPassword] = useState(false);

    const { login, loading, error, authenticated } = useAuth();

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        clearErrors,
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    useEffect(() => {
        if (authenticated) {
            router.push('/profile');
        }
    }, [authenticated, router]);

    useEffect(() => {
        if (error) {
            setSnackbarMessage(error);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    }, [error]);

    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        await login(data.email, data.password);

        if (!error) {
            setSnackbarMessage('Login bem sucedido!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            reset();
        }
    };

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', py: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                Login do Usuário
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
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    {...field}
                                    label="Senha"
                                    placeholder="Digite sua senha"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        if (e.target.value === '') {
                                            clearErrors('password');
                                        }
                                    }}
                                />
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    sx={{ color: '#444444', position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </Box>
                        )}
                    />
                </Box>
                <Typography mt={2} variant="body2" color="primary" sx={{ textDecoration: 'none', display: 'flex', justifyContent: 'flex-end' }}>
                    <Link href="/forgot-password" passHref>
                        Esqueci minha senha
                    </Link>
                </Typography>
                <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'center', px: 4, mt: 2 }} disabled={isSubmitting || loading}>
                    {isSubmitting || loading ? 'Logando...' : 'Login'}
                </Button>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mt={3}>
                    <Typography variant="body2">Não tem uma conta?</Typography>
                    <Link href="/sign-up" passHref>
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
                            Cadastre-se
                        </Typography>
                    </Link>
                </Stack>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;