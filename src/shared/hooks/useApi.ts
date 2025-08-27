import { useState, useCallback } from 'react';
import { useAppStore } from '@/config/store';
import { ApiError } from '@/shared/api';

// Types
export interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  showLoading?: boolean;
}

export interface UseApiReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

// Custom hook for API calls with Zustand integration
export function useApi<T = any>(
  apiCall: (...args: any[]) => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  
  const { setLoading } = useAppStore();
  const { onSuccess, onError, showLoading = true } = options;

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setIsLoading(true);
      setError(null);
      
      if (showLoading) {
        setLoading(true);
      }

      try {
        const result = await apiCall(...args);
        setData(result);
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        return result;
      } catch (err: any) {
        const apiError: ApiError = {
          message: err.message || 'An error occurred',
          status: err.status || 500,
          errors: err.errors,
        };
        
        setError(apiError);
        
        if (onError) {
          onError(apiError);
        }
        
        return null;
      } finally {
        setIsLoading(false);
        
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [apiCall, onSuccess, onError, showLoading, setLoading]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
  };
}
