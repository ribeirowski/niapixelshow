import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { Box, Button, Container, IconButton, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { userSchema } from '@/types';
import useUser from '@/hooks/useUser';
import { useAuth } from '@/hooks';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import z from 'zod';
import { ConfirmationModal } from '@/components';

const UpdateUserSchema = userSchema.partial().extend({
    password: z.string().optional()
});

type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;

const EditUser: React.FC = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const { user } = useAuth();
    const { getUserById, updateUser, deleteUser, userData, loading } = useUser();

    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalAction, setModalAction] = useState<'delete' | 'save'>('save');

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdateUserSchemaType>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            password: '',
        }
    });

    useEffect(() => {
        if (user && id) {
            getUserById(id);
        }
    }, [id, getUserById, user]);

    useEffect(() => {
        if (userData) {
            reset({
                name: userData.name,
                email: userData.email,
                phone: userData.phone || '',
                address: userData.address || '',
                password: '',
            });
        }
    }, [userData, reset]);

    const onSubmit = async (data: UpdateUserSchemaType) => {
        setIsUpdating(true);
        try {
            if (!changePassword) {
                delete data.password; // Remove a senha dos dados enviados se a opção de alterar senha não estiver marcada
            }
            console.log('Submitting data:', data);
            await updateUser(id, data);
            router.push('/profile');
        } catch (error) {
            console.error('Error updating user:', error);
        }
        setIsUpdating(false);
    };

    const handleDelete = async () => {
        setModalAction('delete');
        setOpenModal(true);
    };

    const handleSave = async (data: UpdateUserSchemaType) => {
        setModalAction('save');
        setOpenModal(true);
    };

    const handleConfirm = async () => {
        setOpenModal(false);
        if (modalAction === 'delete') {
            setIsDeleting(true);
            try {
                await deleteUser(id);
                router.push('/home/user');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
            setIsDeleting(false);
        } else if (modalAction === 'save') {
            handleSubmit(onSubmit)();
        }
    };

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', py: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                Editar Usuário
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleSave)} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mx: 6 }}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
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
                <FormControlLabel
                    control={<Checkbox checked={changePassword} onChange={(e) => setChangePassword(e.target.checked)} />}
                    label="Alterar Senha"
                    sx={{ color: 'secondary.main', '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }} // Adicionando estilo para diminuir o tamanho da fonte do label
                />
                {changePassword && (
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
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button type="button" onClick={handleDelete} variant="outlined" color="primary" sx={{ px: 4, py: 1 }} disabled={isDeleting}>
                        {isDeleting ? 'Deletando...' : 'Deletar'}
                    </Button>
                    <Button type="submit" variant="contained" color="primary" sx={{ px: 4, py: 1 }} disabled={isUpdating}>
                        {isUpdating ? 'Salvando...' : 'Salvar'}
                    </Button>
                </Box>
            </Box>
            <ConfirmationModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onConfirm={handleConfirm}
                title={modalAction === 'delete' ? 'Confirmar Exclusão' : 'Confirmar Salvar'}
                description={modalAction === 'delete' ? 'Tem certeza de que deseja excluir este usuário?' : 'Tem certeza de que deseja salvar as alterações?'}
            />
        </Container>
    );
};

export default EditUser;
