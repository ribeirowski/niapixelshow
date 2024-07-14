import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { userSchema, UserSchema } from '../SignUp/types';
import useUser from '../../hooks/useUser';
import { useRouter } from 'next/router';

const theme = createTheme({
    palette: {
        primary: {
            main: '#DA0037',
        },
        background: {
            default: '#171717',
            paper: '#EDEDED',
        },
        text: {
            primary: '#171717',
            secondary: '#444444',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: '600',
                    borderRadius: '0.6rem',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#EDEDED',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '0.7rem',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#444444',
                },
            },
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    borderRadius: '1rem',
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '1rem',
                },
            },
        },
    },
});

const SignUp: React.FC = () => {
    const router = useRouter();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [showPassword, setShowPassword] = useState(false);

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
    } = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            password: '',
        }
    });

    const { createUser, loading, error } = useUser();

    useEffect(() => {
        if (error) {
            setSnackbarMessage(error);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    }, [error]);

    const onSubmit: SubmitHandler<UserSchema> = async (data) => {
        try {
            await createUser(data);
            setSnackbarMessage('User created successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            reset();
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" sx={{ my: 6, backgroundColor: 'background.paper', borderRadius: '1rem', py: 4, boxShadow: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                    Cadastro de Usuário
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mx: 6 }}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nome"
                                placeholder="Digite seu nome"
                                variant="outlined"
                                fullWidth
                                required
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                onChange={(e) => {
                                    field.onChange(e);
                                    if (e.target.value === '') {
                                        clearErrors('name');
                                    }
                                }}
                                InputLabelProps={{ style: { color: '#444444' } }}
                                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444444' }, '&:hover fieldset': { borderColor: '#444444' }, '&.Mui-focused fieldset': { borderColor: '#444444' }, '&:-webkit-autofill': { '-webkit-box-shadow': '0 0 0 100px #EDEDED inset', '-webkit-text-fill-color': '#000000' } } }}
                            />
                        )}
                    />
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
                                InputLabelProps={{ style: { color: '#444444' } }}
                                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444444' }, '&:hover fieldset': { borderColor: '#444444' }, '&.Mui-focused fieldset': { borderColor: '#444444' }, '&:-webkit-autofill': { '-webkit-box-shadow': '0 0 0 100px #EDEDED inset', '-webkit-text-fill-color': '#000000' } } }}
                            />
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Telefone"
                                placeholder="Digite seu telefone"
                                variant="outlined"
                                fullWidth
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                onChange={(e) => {
                                    field.onChange(e);
                                    if (e.target.value === '') {
                                        clearErrors('phone');
                                    }
                                }}
                                InputLabelProps={{ style: { color: '#444444' } }}
                                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444444' }, '&:hover fieldset': { borderColor: '#444444' }, '&.Mui-focused fieldset': { borderColor: '#444444' }, '&:-webkit-autofill': { '-webkit-box-shadow': '0 0 0 100px #EDEDED inset', '-webkit-text-fill-color': '#000000' } } }}
                            />
                        )}
                    />
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Endereço"
                                placeholder="Digite seu endereço"
                                variant="outlined"
                                fullWidth
                                error={!!errors.address}
                                helperText={errors.address?.message}
                                onChange={(e) => {
                                    field.onChange(e);
                                    if (e.target.value === '') {
                                        clearErrors('address');
                                    }
                                }}
                                InputLabelProps={{ style: { color: '#444444' } }}
                                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444444' }, '&:hover fieldset': { borderColor: '#444444' }, '&.Mui-focused fieldset': { borderColor: '#444444' }, '&:-webkit-autofill': { '-webkit-box-shadow': '0 0 0 100px #EDEDED inset', '-webkit-text-fill-color': '#000000' } } }}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
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
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ mr: 1 }}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                InputLabelProps={{ style: { color: '#444444' } }}
                                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444444' }, '&:hover fieldset': { borderColor: '#444444' }, '&.Mui-focused fieldset': { borderColor: '#444444' }, '&:-webkit-autofill': { '-webkit-box-shadow': '0 0 0 100px #EDEDED inset', '-webkit-text-fill-color': '#000000' } } }}
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 1, mb: 1, alignSelf: 'center', px: 4, py: 1 }} disabled={isSubmitting || loading}>
                        {isSubmitting || loading ? 'Cadastrando...' : 'Cadastrar'}
                    </Button>
                </Box>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;
