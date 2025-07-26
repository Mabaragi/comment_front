// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { tokenCreate } from '@/api/endpoints';
import { setRefreshTokenToCookie } from '@/utils/cookie';

export const useLogin = () => {
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: tokenCreate,
    onSuccess: (data) => {
      console.log('로그인 성공:', data);
      setTokens(data.access);
      setRefreshTokenToCookie(data.refresh);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};
