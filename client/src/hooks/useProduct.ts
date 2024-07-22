import { useState, useCallback } from 'react';
import api from '@/services/api';
import { Product, Category } from '@/types';

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
    // Estado para armazenar um único produto
    const [productData, setProductData] = useState<Product | null>(null);
    // Estado para armazenar uma lista de produtos
    const [products, setProducts] = useState<Product[]>([]);
    // Estado para indicar carregamento
    const [loading, setLoading] = useState<boolean>(false);
    // Estado para armazenar erros
    const [error, setError] = useState<string | null>(null);

    // Função para lidar com chamadas de API
    const handleApiCall = async <T,>(apiCall: Promise<{ data: { product: T } | T }>): Promise<T> => {
        setLoading(true); // Indica que a chamada está em andamento
        setError(null); // Reseta qualquer erro anterior
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
            setLoading(false); // Indica que a chamada foi concluída
        }
    };

    // Função para criar um produto
    const createProduct = async (productData: Product) => {
        await handleApiCall(api.post<{ data: Product }>('/product', productData));
    };

    // Função para atualizar um produto
    const updateProduct = async (productId: string, productData: Partial<Product>) => {
        await handleApiCall(api.put<{ data: Product }>(`/product/${productId}`, productData));
    };

    // Função para obter um produto por ID
    const getProductById = useCallback(async (productId: string) => {
        const response = await handleApiCall<Product>(api.get(`/product/${productId}`));
        setProductData(response);
    }, []);

    // Função para deletar um produto por ID
    const deleteProduct = async (productId: string) => {
        await handleApiCall(api.delete(`/product/${productId}`));
    };

    // Função para obter todos os produtos
    const getAllProducts = useCallback(async () => {
        const response = await handleApiCall<Product[]>(api.get('/product/'));
        setProducts(response);
    }, []);

    // Função para resetar o estado de erro
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
