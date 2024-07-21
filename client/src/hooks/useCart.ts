import { useState, useCallback } from 'react';
import api from '@/services/api';
import { z } from 'zod';
import { CartItem as CartItemSchema, Cart as CartSchema } from '../types/CartTypes';

export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;

interface UseCartInterface {
    cartData: CartItem | null;
    cartItems: CartItem[];
    cart: Cart | null;
    createCartItem: (userId: string, cartData: CartItem) => Promise<void>;
    updateCartItem: (userId: string, itemId: string, cartData: Partial<CartItem>) => Promise<void>;
    deleteCartItem: (userId: string, itemId: string) => Promise<void>;
    deleteCart: (userId: string) => Promise<void>;
    getAllCartItems: (userId: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    resetError: () => void;
}

const useCart = (): UseCartInterface => {
    const [cartData, setCartData] = useState<CartItem | null>(null);
    const [cart, setCart] = useState<Cart | null > (null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
        await handleApiCall(api.post<{ data: CartItem }>(`/cart/${userId}`, cartData));
        await getAllCartItems(userId);
    };

    const updateCartItem = async (userId: string, itemId: string, cartData: Partial<CartItem>) => {
        const response = await handleApiCall(api.put<{ data: CartItem }>(`/cart/${userId}/${itemId}`, cartData));
        setCartData(response as CartItem);
        await getAllCartItems(userId);
    };

    const deleteCartItem = async (userId: string, itemId: string) => {
        await handleApiCall(api.delete<{ data: CartItem }>(`/cart/${userId}/${itemId}`));
        await getAllCartItems(userId);
    };

    const deleteCart = async (userId: string) => {
        await handleApiCall(api.delete<{ data: CartItem }>(`/cart/${userId}`));
        setCart(null);
        setCartItems([]);
    };

    const getAllCartItems = async (userId: string) => {
        const response = await handleApiCall(api.get<{ data: CartItem[] }>(`/cart/${userId}`));
        setCart(response as Cart);
        setCartItems(response.items as CartItem[]);
    };

    const resetError = () => setError(null);

    return {
        cartData,
        cart,
        cartItems,
        createCartItem,
        updateCartItem,
        deleteCartItem,
        deleteCart,
        getAllCartItems,
        loading,
        error,
        resetError,
    };
};

export default useCart;
export type { UseCartInterface };
