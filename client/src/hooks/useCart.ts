import { useState, useCallback } from 'react';
import api from '@/services/api';

interface CartItem {
    image?: string;
    name: string;
    description: string;
    price: number;
    status: boolean;
    category: {
        name: string;
        description?: string;
    };
    promotionId?: string;
    quantity: number;
    size: string;
    item_id: string;
}

interface UseCartInterface<T> {
    cartData: T | null;
    cart: T[];
    createCartItem: (userId: string, cartData: T) => Promise<void>;
    updateCartItem: (userId: string, cartId: string, cartData: Partial<T>) => Promise<void>;
    deleteCartItem: (userId: string, cartId: string) => Promise<void>;
    getAllCartItems: (userId: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    resetError: () => void;
}

const useCart = (): UseCartInterface<CartItem> => {
    const [cartData, setCartData] = useState<CartItem | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
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

    const createCartItem = async (userId: string, cartData: CartItem) => {
        const response = await handleApiCall(api.post<{ data: CartItem }>(`/cart/${userId}`, cartData));
        await getAllCartItems(userId);
    };

    const updateCartItem = async (userId: string, cartId: string, cartData: Partial<CartItem>) => {
        const response = await handleApiCall(api.patch<{ data: CartItem }>(`/cart/${userId}/${cartId}`, cartData));
        setCartData(response as CartItem);
        await getAllCartItems(userId);
    };

    const deleteCartItem = async (userId: string, cartId: string) => {
        await handleApiCall(api.delete<{ data: CartItem }>(`/cart/${userId}/${cartId}`));
        await getAllCartItems(userId);
    };

    const getAllCartItems = async (userId: string) => {
        const response = await handleApiCall(api.get<{ data: CartItem[] }>(`/cart/${userId}`));
        setCart(response as CartItem[]);
    };

    const resetError = () => setError(null);

    return {
        cartData,
        cart,
        createCartItem,
        updateCartItem,
        deleteCartItem,
        getAllCartItems,
        loading,
        error,
        resetError,
    };
};

export default useCart;
export type { CartItem, UseCartInterface };
