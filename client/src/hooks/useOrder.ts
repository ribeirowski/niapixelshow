import { useState, useCallback } from 'react';
import api from '@/services/api';

interface Order {
    email: string;
    item: string;
    description: string;
    qtd: number;
    price: number;
    status: string;
    date: string;
    addr: string;
}

interface UseOrderInterface<T> {
    orderData: T | null;
    orders: T[];
    createOrder: (orderData: T) => Promise<void>;
    updateOrder: (orderId: string, orderData: Partial<T>) => Promise<void>;
    getOrderById: (orderId: string) => Promise<void>;
    deleteOrder: (orderId: string) => Promise<void>;
    getAllOrders: () => Promise<void>;
    getStats: () => Promise<void>;
    exportOrders: () => Promise<void>;
    filterOrdersByDate: (startDate: string, endDate: string) => Promise<void>;
    filterOrders: (filter: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    resetError: () => void;
}

const useOrder = (): UseOrderInterface <Order> => {

    const [orderData, setOrderData] = useState<Order | null>(null);
    const [orders, setOrders] = useState<Order []>([])
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
    const createOrder = async (orderData: Order) => {
        await handleApiCall(api.post<{ data: Order }>('/orders', orderData));
    };

    const updateOrder = async (orderId: string, orderData: Partial<Order>) => {
        await handleApiCall(api.patch<{ data: Order }>(`/orders/${orderId}`, orderData));
    };

    const getOrderById = useCallback(async (orderId: string) => {
        const response = await handleApiCall<{ data: Order }>(api.get(`/orders/${orderId}`));
        setOrderData(response);
    }, []);

    const deleteOrder = async (orderId: string) => {
        await handleApiCall(api.delete(`/orders/${orderId}`));
    };

    const getAllOrders = useCallback(async () => {
        const response = await handleApiCall<{ data: Order[] }>(api.get('/orders/all'));
        setOrders(response);
    }, []);

    const getStats = useCallback(async () => {
        await handleApiCall(api.get('/orders/stats'));
    }, []);

    const exportOrders = useCallback(async () => {
        await handleApiCall(api.get('/orders/export'));
    }, []);

    const filterOrdersByDate = useCallback(async (startDate: string, endDate: string) => {
        const response = await handleApiCall<{ data: Order[] }>(api.get(`/orders/filterByDate?start=${startDate}&end=${endDate}`));
        setOrders(response);
    }, []);

    const filterOrders = useCallback(async (filter: string) => {
        const response = await handleApiCall<{ data: Order[] }>(api.get(`/orders/filter/${filter}`));
        setOrders(response);
    }, []);

    const resetError = () => {
        setError(null);
    };

    return {
        orderData,
        orders,
        createOrder,
        updateOrder,
        getOrderById,
        deleteOrder,
        getAllOrders,
        getStats,
        exportOrders,
        filterOrdersByDate,
        filterOrders,
        loading,
        error,
        resetError,
    };
};

export default useOrder;