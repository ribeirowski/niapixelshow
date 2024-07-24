import { useState, useCallback } from 'react';
import api from '@/services/api';
import { Stats, UseStatsInterface } from '@/types/StatsTypes';

const useStats = (): UseStatsInterface <Stats> => {

    const [statsData, setStatsData] = useState<Stats | null>(null);
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

    const getStats = useCallback(async (year: string, month: string) => {
        const response = await handleApiCall(api.get(`/order/stats?year=${year}&month=${month}`));
        setStatsData(response);
    }, []);

    return {
        statsData,
        getStats,
        loading,
        error,
    };
};

export default useStats;