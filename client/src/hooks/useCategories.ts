import { useState, useCallback } from 'react';
import api from '@/services/api';
import { Category } from '@/types';

interface Category {
    name: string;
    description?: string;
}

interface UseCategoryInterface<T> {
    categoryData: T | null;
    categories: T[];
    createCategory: (categoryData: T) => Promise<void>;
    updateCategory: (categoryName: string, categoryData: Partial<T>) => Promise<void>;
    getCategoryByName: (categoryName: string) => Promise<void>;
    deleteCategory: (categoryName: string) => Promise<void>;
    getAllCategories: () => Promise<void>;
    loading: boolean;
    error: string | null;
    resetError: () => void;
}

const useCategories = (): UseCategoryInterface<Category> => {
    const [categoryData, setCategoryData] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleApiCall = useCallback(async (apiCall: Promise<{ data: any }>): Promise<any> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiCall;
            return response.data;
        } catch (err: any) {
            const errorMessage = err.response?.data.message || 'Ocorreu um erro inesperado';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const createCategory = useCallback(async (categoryData: Category) => {
        await handleApiCall(api.post<{ data: Category }>('/category', categoryData));
        await getAllCategories();
    }, [handleApiCall]);

    const updateCategory = useCallback(async (categoryName: string, categoryData: Partial<Category>) => {
        const response = await handleApiCall(api.put<{ data: Category }>(`/category/${categoryName}`, categoryData));
        if (response) {
            await getAllCategories(); // Atualiza a lista de categorias após a atualização
            setCategoryData(response as Category); // Atualiza os dados da categoria
        }
    }, [handleApiCall]);

    const getCategoryByName = useCallback(async (categoryName: string) => {
        const response = await handleApiCall(api.get<{ data: Category }>(`/category/${categoryName}`));
        setCategoryData(response);
    }, [handleApiCall]);

    const deleteCategory = useCallback(async (categoryName: string) => {
        await handleApiCall(api.delete(`/category/${categoryName}`));
        await getAllCategories();
    }, [handleApiCall]);

    const getAllCategories = useCallback(async () => {
        const response = await handleApiCall(api.get<{ data: Category[] }>('/category/all'));
        setCategories(response);
    }, [handleApiCall]);

    const resetError = useCallback(() => {
        setError(null);
    }, []);

    return {
        categoryData,
        categories,
        createCategory,
        updateCategory,
        getCategoryByName,
        deleteCategory,
        getAllCategories,
        loading,
        error,
        resetError,
    };
};

export default useCategories;
