'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_LOCALE } from '@/lib/constants';
import type { Locale } from '@/lib/types';

interface LangState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      locale: DEFAULT_LOCALE,
      setLocale: (locale) => set({ locale }),
      toggleLocale: () =>
        set((state) => ({
          locale: state.locale === 'ru' ? 'en' : 'ru',
        })),
    }),
    {
      name: 'lang-storage',
    }
  )
);
