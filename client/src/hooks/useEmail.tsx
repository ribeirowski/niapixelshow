import { useState, useCallback } from 'react';
import api from '@/services/api';
import { Order } from '@/types';

interface Email {
    order: Order
    name: string
    stat: string
}

interface useEmailInterface<T> {
    sendEmail: (emailData: T, sendEmail: string) => Promise <void>;
}

const useOrder = (): useEmailInterface <Email> => {
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
    
    const sendEmail = async (emailData: Email, sendEmail: string) => {
        await handleApiCall(api.post<{ data: Email }>(`/email/${sendEmail}`, emailData));
    };
    
    return {
        sendEmail,
    };
};

export default useOrder;