import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (state: boolean) => void;
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  clearTokens: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (state) => set({ isLoggedIn: state }),
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      refreshToken: null,
      setRefreshToken: (token) => set({ refreshToken: token }),
      clearTokens: () =>
        set({ accessToken: null, refreshToken: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 key 이름
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
