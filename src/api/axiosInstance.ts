import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../stores/authStore';
import { getRefreshTokenFromCookie } from '@/utils/cookie';

const baseURL = 'http://localhost:8000';

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Orval의 custom mutator 함수
 */
export const axiosInstance = async <T = any>(
  config: AxiosRequestConfig,
): Promise<T> => {
  const accessToken = useAuthStore.getState().accessToken;

  // 요청 헤더에 accessToken 주입
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  try {
    const response = await axiosClient<T>({
      ...config,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const originalRequest = config as AxiosRequestConfig & { _retry?: boolean };

    // accessToken 만료 시 refresh 시도
    if (axiosError.response?.status === 401 && !originalRequest._retry) {
      console.log('Access token expired, attempting to refresh...');
      originalRequest._retry = true;

      const refreshToken = getRefreshTokenFromCookie();
      if (refreshToken) {
        try {
          const refreshResponse = await axiosClient.post('/token/refresh/', {
            refresh: refreshToken,
          });

          const newAccessToken = refreshResponse.data.access;
          useAuthStore.getState().setTokens(newAccessToken);

          // 재요청 시 Authorization 헤더 갱신
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          const retryResponse = await axiosClient<T>(originalRequest);
          return retryResponse.data;
        } catch (refreshError) {
          useAuthStore.getState().clearTokens();
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
};
