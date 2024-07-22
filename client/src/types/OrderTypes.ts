export interface Order {
    id: string;
    email: string;
    item: string;
    description: string;
    qtd: number;
    price: number;
    status: string;
    date: string;
    addr: string;
}

export interface UseOrderInterface<T> {
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
    filterOrders: (atribute: string, func: string, filter: string, email: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    resetError: () => void;
}