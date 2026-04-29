import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CurrencyCode } from '@/lib/types';

interface CurrencyState {
  selectedCurrency: CurrencyCode | null;
  setSelectedCurrency: (currency: CurrencyCode | null) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      selectedCurrency: null,
      setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
    }),
    {
      name: 'currency-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
