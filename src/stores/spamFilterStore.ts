// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface spamFilterState {
  filterOption: 'all' | 'notSpam' | 'spam' | 'unprocessed';
  setFilterOption: (option: 'all' | 'notSpam' | 'spam' | 'unprocessed') => void;
}

export const useSpamFilterStore = create<spamFilterState>()(
  persist(
    (set) => ({
      filterOption: 'all',
      setFilterOption: (option) => {
        set({ filterOption: option });
      },
    }),
    {
      name: 'spam-filter-storage',
    },
  ),
);
