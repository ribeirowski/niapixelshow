import { useEffect, useState } from 'react';
import axios from 'axios';
import { LoginSchema } from '@/pages/sign-in/types';
import { ForgotPasswordSchema } from '@/pages/forgot-password/types';
import { SERVER_URL } from '@/hooks/url';
import { useRouter } from 'next/router';

interface UseAuthReturn {
    login: (data: LoginSchema) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    forgotPassword: (data: ForgotPasswordSchema) => Promise<void>;
    loading: boolean;
    authenticated: boolean;
    error: string | null;
}

const useAuth = (): UseAuthReturn => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (data: LoginSchema) => {
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${SERVER_URL}/auth/login`, data, { withCredentials: true });
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Error logging in');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${SERVER_URL}/auth/logout`, {}, { withCredentials: true });
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Error logging out');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const checkAuth = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.get(`${SERVER_URL}/auth/check`, { withCredentials: true });
            setAuthenticated(true);
        } catch (error) {
            setAuthenticated(false);
            router.push('/sign-in');
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (data: ForgotPasswordSchema) => {
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${SERVER_URL}/auth/forgot-password`, data);
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Error sending password reset email');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return { login, logout, checkAuth, forgotPassword, loading, authenticated, error };
};

export default useAuth;
