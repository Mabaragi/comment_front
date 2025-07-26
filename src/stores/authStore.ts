// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  setTokens: (accessToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,

      setTokens: (accessToken: string) => {
        set({ accessToken });
      },
      clearTokens: () => {
        set({ accessToken: null });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
