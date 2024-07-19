import { useState, useCallback } from 'react';
import api from '@/services/api';
import { UserSchema, UseUserReturn } from '@/pages/sign-up/types';

const useUser = (): UseUserReturn<UserSchema> => {
    const [userData, setUserData] = useState<UserSchema | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleApiCall = async <T,>(apiCall: Promise<{ data: T }>): Promise<T> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiCall;
            return response.data;
        } catch (err: any) {
            const errorMessage = err.response?.data.message || 'Ocorreu um erro inesperado';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const createUser = async (userData: UserSchema) => {
        await handleApiCall(api.post<{ data: UserSchema }>('/user', userData));
    };

    const updateUser = async (userId: string, userData: Partial<UserSchema>) => {
        await handleApiCall(api.patch<{ data: UserSchema }>(`/user/${userId}`, userData));
    };

    const getUserById = useCallback(async (userId: string) => {
        const response = await handleApiCall<{ data: UserSchema }>(api.get(`/user/${userId}`));
        setUserData(response);
    }, []);

    const deleteUser = async (userId: string) => {
        await handleApiCall(api.delete(`/user/${userId}`));
    };

    const resetError = () => {
        setError(null);
    };

    return {
        userData,
        createUser,
        updateUser,
        getUserById,
        deleteUser,
        loading,
        error,
        resetError,
    };
};

export default useUser;
