import { useMutation } from '@tanstack/react-query';
import { apiLogin } from '../api/auth'; // apiLogin 함수를 가져옵니다.
import { useAuthStore } from '../store/authStore';

export function useLogin() {
  return useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      // 로그인 성공 시 호출되는 콜백 함수입니다.
      // 로그인 성공 시, 로그인 정보를 authStore에 저장합니다.
      const authStore = useAuthStore.getState();
      const { access, refresh } = data; // 로그인 성공 시, access token과 refresh token을 가져옵니다.
      authStore.setAccessToken(access); // access token을 authStore에 저장합니다.
      authStore.setRefreshToken(refresh); // refresh token을 authStore에 저장합니다.
      authStore.setIsLoggedIn(true); // 로그인 상태를 true로 설정합니다.
      console.log('로그인 성공:', data);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
}

export type LoginHandler = ReturnType<typeof useLogin>['mutate'];
