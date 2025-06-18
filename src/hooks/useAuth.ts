// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { TokenService } from '@/api/services/TokenService';
import { useAuthStore } from '@/stores/authStore';
import type { TokenObtainPair } from '@/api/models/TokenObtainPair';

export const useLogin = () => {
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: (credentials: TokenObtainPair) =>
      TokenService.tokenCreate(credentials),
    onSuccess: (data) => {
      setTokens(data.access, data.refresh);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};
