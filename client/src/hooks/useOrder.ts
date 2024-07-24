import { useState, useCallback } from 'react';
import api from '@/services/api';
import { Order, UseOrderInterface } from '@/types';

const useOrder = (): UseOrderInterface<Order> => {
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
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
        const order = {
            email: orderData.email,
            item: orderData.item,
            description: orderData.description,
            qtd: orderData.qtd,
            price: orderData.price,
            status: orderData.status,
            date: orderData.date,
            addr: orderData.addr,
        } 
        await handleApiCall(api.post<{ data: Order }>('/order', order));
    };

  const updateOrder = async (orderId: string, orderData: Partial<Order>) => {
    await handleApiCall(
      api.patch<{ data: Order }>(`/order/${orderId}`, orderData)
    );
  };

  const getOrderById = useCallback(async (orderId: string) => {
    const response = await handleApiCall<{ data: Order }>(
      api.get(`/order/${orderId}`)
    );
    // @ts-ignore
    setOrderData(response);
  }, []);

  const deleteOrder = async (orderId: string) => {
    await handleApiCall(api.delete(`/order/${orderId}`));
  };

  const getAllOrders = useCallback(async () => {
    var response
    try{
      response = await handleApiCall<{ data: Order[] }>(
        api.get("/order/all")
      );
    }
    catch{
      response = []
    }
    // @ts-ignore
    setOrders(response);
  }, []);

    const getStats = useCallback(async () => {
        await handleApiCall(api.get(`/order/stats?year=0000&end=$00`));
    }, []);

  const exportOrders = useCallback(async () => {
    await handleApiCall(api.get("/order/export"));
  }, []);

  const filterOrdersByDate = useCallback(
    async (startDate: string, endDate: string) => {
      const response = await handleApiCall<{ data: Order[] }>(
        api.get(`/order/filterByDate?start=${startDate}&end=${endDate}`)
      );
      // @ts-ignore
      setOrders(response);
    },
    []
  );

  const filterOrders = useCallback(
    async (atribute: string, func: string, filter: string, email: string) => {
      var response
      try{
        response = await handleApiCall<{ data: Order[] }>(
          api.get(
            `/order/filter/${atribute}?func=${func}&filter=${filter}&email=${email}`
          )
        );}
        catch{
          response = []
        }
      // @ts-ignore
      setOrders(response);
    },
    []
  );

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
