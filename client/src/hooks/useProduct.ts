import { useState, useCallback } from 'react';
import api from '@/services/api';
import { Product, PromotionSchema } from '@/types';

// Interface para o tipo Product
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
    promotion?: PromotionSchema;
}

// Interface para o hook useProduct
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

// Hook personalizado para lidar com operações de produto
const useProduct = (): UseProductsInterface<Product> => {
    const [productData, setProductData] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleApiCall = async <T,>(apiCall: Promise<{ data: { product: T } | T }>): Promise<T> => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await apiCall;
            if (data && typeof data === 'object' && 'product' in data) {
                return data.product;
            } else {
                return data as T;
            }
        } catch (err: any) {
            setError(err.response?.data.message || 'Ocorreu um erro inesperado');
            throw new Error(err.response?.data.message || 'Ocorreu um erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    const fetchPromotion = async (promotionId: string) => {
        try {
            return (await api.get(`/promotion/${promotionId}`)).data;
        } catch (err) {
            console.error(`Failed to fetch promotion with ID: ${promotionId}`, err);
            return null;
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
        if (response.promotionId) {
            response.promotion = await fetchPromotion(response.promotionId);
        }
        setProductData(response);
    }, []);

    const deleteProduct = async (productId: string) => {
        await handleApiCall(api.delete(`/product/${productId}`));
    };

    const getAllProducts = useCallback(async () => {
        const response = await handleApiCall<Product[]>(api.get('/product/'));
        const productsWithPromotions = await Promise.all(response.map(async (product) => {
            if (product.promotionId) {
                product.promotion = await fetchPromotion(product.promotionId);
            }
            return product;
        }));
        console.log("Fetched products: ", productsWithPromotions); // Log to check products
        setProducts(productsWithPromotions);
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
