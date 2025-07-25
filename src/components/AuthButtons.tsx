import { useAuthStore } from '../stores/authStore';
import { ArrowPathIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button'; // shadcn 버튼 import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogin } from '../hooks/useAuth';
import type { LoginCredentials } from '../types/auth';
import { useState } from 'react';

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
