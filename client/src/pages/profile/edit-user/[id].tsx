import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { userSchema, UserSchema } from '@/types';
import useUser from '@/hooks/useUser';
import { useAuth } from '@/hooks';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

const EditUser: React.FC = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const { user } = useAuth();
    const { getUserById, updateUser, deleteUser, userData, loading } = useUser();

    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: userData?.name || '',
            email: userData?.email || '',
            phone: userData?.phone || '',
            address: userData?.address || '',
            password: '',
        }
    });

    const [inputFocus, setInputFocus] = useState({
        name: false,
        phone: false,
        address: false,
    });

    useEffect(() => {
        if (user && id) {
            getUserById(id);
        }
    }, [id, getUserById, user]);

    useEffect(() => {
        if (userData) {
            reset({
                ...userData,
                password: ''
            });
        }
    }, [userData, reset]);

    const onSubmit = async (data: UserSchema) => {
        setIsUpdating(true);
        try {
            await updateUser(id, data);
            router.push('/profile');
        } catch (error) {
            console.error('Error updating user:', error);
        }
        setIsUpdating(false);
    };
    
    const handleDelete = async () => {
        if (typeof id === 'string' && confirm('Tem certeza que deseja deletar este usuário?')) {
            setIsDeleting(true);
            try {
                await deleteUser(id);
                router.push('/home/user');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
            setIsDeleting(false);
        }
    };

    // Handle field focus changes
    const handleFocus = (field: keyof typeof inputFocus) => {
        setInputFocus(prev => ({ ...prev, [field]: true }));
    };

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', py: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                Editar Usuário
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mx: 6 }}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            onFocus={() => handleFocus('name')}
                            label="Nome"
                            placeholder='Digite seu novo nome'
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    )}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={userData?.email || ''}
                    InputLabelProps={{ shrink: !!userData?.email }}
                    disabled
                />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            onFocus={() => handleFocus('phone')}
                            label="Telefone"
                            placeholder='Digite seu novo telefone'
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    )}
                />
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            onFocus={() => handleFocus('address')}
                            label="Endereço"
                            placeholder='Digite seu novo endereço'
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            fullWidth
                            error={!!errors.address}
                            helperText={errors.address?.message}
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
                                type={showPassword ? 'text' : 'password'}
                                label="Senha"
                                variant="outlined"
                                placeholder="Digite sua nova senha"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                defaultValue="" // Garante que não há valor inicial
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button type="button" onClick={handleDelete} variant="outlined" color="primary" sx={{ px: 4, py: 1 }} disabled={isDeleting}>
                        {isDeleting ? 'Deletando...' : 'Deletar'}
                    </Button>
                    <Button type="submit" variant="contained" color="primary" sx={{ px: 4, py: 1 }} disabled={isUpdating}>
                        {isUpdating ? 'Confirmando...' : 'Confirmar'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EditUser;