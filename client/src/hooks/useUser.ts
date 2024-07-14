import { useState } from 'react';
import axios from 'axios';
import { UserSchema, UseUserReturn } from '../pages/SignUp/types';
import { SERVER_URL } from '@/hooks/url';

const useUser = (): UseUserReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createUser = async (data: UserSchema) => {
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${SERVER_URL}/user`, data);
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Error creating user');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createUser, loading, error };
};

export default useUser;
