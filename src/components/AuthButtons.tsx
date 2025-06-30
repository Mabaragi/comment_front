import { useAuthStore } from '../stores/authStore';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button'; // shadcn 버튼 import
import { useLogin } from '../hooks/useAuth';
import type { LoginCredentials } from '../types/auth';

export default function AuthButtons() {
  const isLoggedIn = useAuthStore((state) => state.refreshToken);
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
      {isLoggedIn ? (
        <Button
          className="rounded-full border-zinc-400 text-zinc-700 cursor-pointer"
          variant="outline"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      ) : (
        <>
          <Button
            className="rounded-full border-zinc-400 text-zinc-700 cursor-pointer"
            variant="outline"
            onClick={() =>
              handleLogin({ username: 'super', password: 'super' })
            }
            disabled={isPending}
          >
            {isPending ? (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            ) : (
              '로그인'
            )}
          </Button>
          <Button
            className="rounded-full border-zinc-400 text-zinc-700 cursor-pointer"
            variant="outline"
          >
            회원가입
          </Button>
        </>
      )}
    </div>
  );
}
