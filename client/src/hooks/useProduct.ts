import { useState, useCallback } from 'react';
import api from '@/services/api';
import { Product, Category } from '@/types';	

export interface Product {
    image?: string;
    id?: string;
    name: string;
    description: string;
    price: number;
    status: boolean;
    category: {
        name: string;
        description?: string;
    };
    promotionId?: string;
}

interface UseProductsInterface<T> {
    productData: T | null;
    products: T[];
    createProduct: (productData: T) => Promise<void>;
    updateProduct: (productId: string, productData: Partial<T>) => Promise<void>;
    getProductById: (productId: string) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    getAllProducts: () => Promise<void>;
    loading: boolean;
    error: string | null;
    resetError: () => void;
}

const useProduct = (): UseProductsInterface<Product> => {
    const [productData, setProductData] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleApiCall = async <T,>(apiCall: Promise<{ data: { product: T } | T }>): Promise<T> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiCall;
            const data = response.data;
            if (data && typeof data === 'object' && 'product' in data) {
                return data.product;
            } else {
                return data as T;
            }
        } catch (err: any) {
            const errorMessage = err.response?.data.message || 'Ocorreu um erro inesperado';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (productData: Product) => {
        await handleApiCall(api.post<{ data: Product }>('/product', productData));
    };

    const updateProduct = async (productId: string, productData: Partial<Product>) => {
        await handleApiCall(api.put<{ data: Product }>(`/product/${productId}`, productData));
    };

    const getProductById = useCallback(async (productId: string) => {
        const response = await handleApiCall<Product>(api.get(`/product/${productId}`));
        setProductData(response)
    }, []);

    const deleteProduct = async (productId: string) => {
        await handleApiCall(api.delete(`/product/${productId}`));
    };

    const getAllProducts = useCallback(async () => {
        const response = await handleApiCall< Product[] >(api.get('/product/'));
        setProducts(response);
    }, []);

    const resetError = () => {
        setError(null);
    };

    return {
        productData,
        products,
        createProduct,
        updateProduct,
        getProductById,
        deleteProduct,
        getAllProducts,
        loading,
        error,
        resetError,
    };
};

export default useProduct;
export type { Product };
