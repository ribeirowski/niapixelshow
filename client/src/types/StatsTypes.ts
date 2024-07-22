export interface Stats {
    totalValue: GLfloat;
    mostSold: string;
    productName: string[];
    productAmount: GLint[];
    productValue: GLfloat[];
}

export interface UseStatsInterface<T> {
    statsData: T | null;
    getStats: (year: string, month: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}