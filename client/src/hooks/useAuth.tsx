import React, { createContext, useContext, useState, ReactNode } from 'react';
import api from '@/services/api';

interface User {
    uid: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    loading: boolean;
    authenticated: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const login = async (email: string, password: string): Promise<void> => {
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            const userData: User = { uid: response.data.uid };
            setUser(userData);
            setAuthenticated(true);
            setError(null);
        } catch (err: any) {
            setError('Falha ao fazer login');
            console.error('Login error:', err);
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        setLoading(true);
        try {
            await api.post('/auth/logout');
            setUser(null);
            setAuthenticated(false);
            setError(null);
        } catch (err: any) {
            console.error('Erro ao sair:', err);
            setError('Erro ao sair');
        } finally {
            setLoading(false);
        }
    };

    const checkAuth = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await api.get('/auth/check');
            if (response.data.authenticated) {
                setUser({ uid: response.data.uid });
                setAuthenticated(true);
            } else {
                setUser(null);
                setAuthenticated(false);
            }
        } catch (error: any) {
            console.error('Auth check failed:', error);
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, checkAuth, loading, authenticated, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default useAuth;