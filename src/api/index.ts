import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터: access token 붙이기
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers!['Authorization'] = `Bearer ${token}`;
  return config;
});

// 리프레시 중 플래그와 대기 큐
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error: any) => void;
}> = [];

// 대기 중인 요청에 새 토큰으로 재시도 트리거
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 응답이 없거나 status가 401이 아니면 바로 reject
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // 이미 _retry 플래그가 있으면 무한 루프 방지
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    // 리프레시 로직 실행 중이면 대기열에 넣고 promise 반환
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers!['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    // 이제 진짜 리프레시 시도
    isRefreshing = true;
    try {
      const { refreshToken } = useAuthStore.getState();
      if (!refreshToken) throw new Error('No refresh token available');

      const res = await api.post('/token/refresh/', { refresh: refreshToken });
      const newAccess = res.data.access;

      // 상태와 인터셉터용 헤더 갱신
      useAuthStore.getState().setAccessToken(newAccess);
      processQueue(null, newAccess);

      // 원래 요청 재시도
      originalRequest.headers!['Authorization'] = `Bearer ${newAccess}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      useAuthStore.getState().clearTokens(); // 토큰 초기화
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
