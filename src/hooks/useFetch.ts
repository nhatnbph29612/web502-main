// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import request from '../api/request';

// Định nghĩa kiểu cho state của hook
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  headers: Record<string, string>;
}

export const useFetch = <T>(url: string, dependencies: React.DependencyList = []) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
    headers: {},
  });

  useEffect(() => {
    let isMounted = true; // Ngăn ngừa cập nhật state khi component đã unmount
    setState((prevState) => ({ ...prevState, loading: true, error: null })); // Đặt lại trạng thái tải

    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await request.get(url);
        
        if (isMounted) {
          // Lấy tất cả headers và chuyển về dạng key-value
          const allHeaders = Object.fromEntries(
              Object.entries(response.headers).map(([key, value]) => [key.toLowerCase(), String(value)])
          );
          
          setState({
            data: response.data,
            loading: false,
            error: null,
            headers: allHeaders,
          });
        }
      } catch (err) {
        if (isMounted) {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            error: `Failed to fetch data from ${url}.`,
          }));
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [url, ...dependencies]);

  return state;
};