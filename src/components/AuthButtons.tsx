import { useAuthStore } from '../store/authStore';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import AuthButton from './AuthButton';
import { useLogin } from '../hooks/useAuth';
import type { LoginCredentials } from '../types/auth';

export default function AuthButtons() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // 구독으로 상태 가져오기
  const mutation = useLogin();
  const isPending = mutation.isPending;

  const handleLogout = () => {
    useAuthStore.getState().clearTokens();
  };
  const handleLogin = ({ username, password }: LoginCredentials) => {
    mutation.mutate({ username, password });
  };

  return (
    <div className="flex items-center gap-2">
      <span>{isLoggedIn}</span>
      {isLoggedIn ? (
        <AuthButton label="로그아웃" onClick={handleLogout}>
          로그아웃
        </AuthButton>
      ) : (
        <>
          <AuthButton
            label="로그인"
            onClick={() =>
              handleLogin({ username: 'super', password: 'super' })
            }
            disabled={isPending}
          >
            {isPending ? (
              <ArrowPathIcon className="h-5 w-12 animate-spin" />
            ) : (
              '로그인'
            )}
          </AuthButton>
          <AuthButton label="회원가입">회원가입</AuthButton>
        </>
      )}
    </div>
  );
}
