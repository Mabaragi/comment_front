import { useAuthStore } from '../stores/authStore';
import { ArrowPathIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button'; // shadcn 버튼 import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../hooks/useAuth';
import type { LoginCredentials } from '../types/auth';
import { LoginFormData, loginSchema } from '@/schemas/auth';
import ErrorMessage from './ErrorMessage';

export default function AuthButtons() {
  const isLoggedIn = useAuthStore((state) => state.accessToken !== null);
  const mutation = useLogin();
  const handleLogin = ({ username, password }: LoginCredentials) => {
    mutation.mutate({ username, password });
  };
  const isPending = mutation.isPending;
  const handleLogout = () => {
    useAuthStore.getState().clearTokens();
  };

  return (
    <>
      {/* 데스크톱 버전 */}
      <div className="hidden md:flex items-center gap-2">
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
            {/* 로그인 버튼 클릭시 다이얼로그 */}
            <LoginDialog mutation={mutation} />
            <Button
              className="rounded-full border-zinc-400 text-zinc-700 cursor-pointer"
              variant="outline"
            >
              회원가입
            </Button>
          </>
        )}
      </div>

      {/* 모바일 버전 (햄버거 메뉴) */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-zinc-400"
            >
              <Bars3Icon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isLoggedIn ? (
              <DropdownMenuItem onClick={handleLogout}>
                로그아웃
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={() =>
                    handleLogin({ username: 'super', password: 'super' })
                  }
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <ArrowPathIcon className="h-4 w-4 animate-spin" />
                      로그인 중...
                    </div>
                  ) : (
                    '로그인'
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>회원가입</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

function LoginDialog({ mutation }: { mutation: ReturnType<typeof useLogin> }) {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });
  const handleLogin = (data: LoginFormData) => {
    mutation.mutate(data);
  };
  const isPending = mutation.isPending;
  const usernameErrorMessage = formErrors.username?.message;
  const hasUsernameError = !!usernameErrorMessage;
  const passwordErrorMessage = formErrors.password?.message;
  const hasPasswordError = !!passwordErrorMessage;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="rounded-full border-zinc-400 text-zinc-700 cursor-pointer"
          variant="outline"
          disabled={isPending}
        >
          로그인
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>
            사용자 이름과 비밀번호를 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="grid gap-4">
            <Input
              id="username"
              placeholder="사용자 이름"
              {...register('username')}
            />
            {hasUsernameError && (
              <ErrorMessage errorMessage={usernameErrorMessage} />
            )}
            <Input
              id="password"
              type="password"
              placeholder="비밀번호"
              {...register('password')}
            />
            {hasPasswordError && (
              <ErrorMessage errorMessage={passwordErrorMessage} />
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button type="submit">로그인</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
