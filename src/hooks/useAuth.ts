// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { tokenCreate } from '@/api/generated';

export const useLogin = () => {
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: tokenCreate,
    onSuccess: (data) => {
      setTokens(data.access, data.refresh);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};
