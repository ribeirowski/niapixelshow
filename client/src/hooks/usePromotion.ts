import { useState, useCallback } from "react";
import api from "@/services/api";
import { PromotionSchema, UsePromotionReturn } from "@/types";

const usePromotion = (): UsePromotionReturn<PromotionSchema> => {
  const [promotionData, setPromotionData] = useState<PromotionSchema | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = async <T>(
    apiCall: Promise<{ data: T }>
  ): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall;
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data.message || "Ocorreu um erro inesperado";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createPromotion = async (promotionData: PromotionSchema) => {
    await handleApiCall(
      api.post<{ data: PromotionSchema }>("/promotion", promotionData)
    );
  };

  const updatePromotion = async (
    promotionId: string,
    promotionData: Partial<PromotionSchema>
  ) => {
    await handleApiCall(
      api.patch<{ data: PromotionSchema }>(
        `/promotion/${promotionId}`,
        promotionData
      )
    );
  };

  const getPromotionById = useCallback(async (promotionId: string) => {
    const response = await handleApiCall<{ data: PromotionSchema }>(
      api.get(`/promotion/${promotionId}`)
    );
    // @ts-ignore
    setPromotionData(response);
  }, []);

  const getAllPromotions = useCallback(async () => {
    const response = await handleApiCall<{ data: PromotionSchema[] }>(
      api.get("/promotion")
    );
    // @ts-ignore
    setPromotionData(response);
  }, []);

  const deletePromotion = async (promotionId: string) => {
    await handleApiCall(api.delete(`/promotion/${promotionId}`));
  };

  const resetError = () => {
    setError(null);
  };

  return {
    promotionData,
    createPromotion,
    updatePromotion,
    getPromotionById,
    deletePromotion,
    getAllPromotions,
    loading,
    error,
    resetError,
  };
};

export default usePromotion;
