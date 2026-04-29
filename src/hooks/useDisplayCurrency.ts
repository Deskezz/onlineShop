'use client';

import type { CurrencyCode, Locale } from '@/lib/types';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { useCurrencyStore } from '@/stores/currencyStore';

const LOCALE_DEFAULT_CURRENCY: Record<Locale, CurrencyCode> = {
  ru: 'RUB',
  en: 'USD',
};

export function useDisplayCurrency(locale: Locale): {
  currency: CurrencyCode;
  selectedCurrency: CurrencyCode | null;
  setSelectedCurrency: (currency: CurrencyCode | null) => void;
} {
  const selectedCurrency = useHydratedStore(
    useCurrencyStore,
    (state) => state.selectedCurrency
  );
  const setSelectedCurrency = useCurrencyStore((state) => state.setSelectedCurrency);

  return {
    currency: selectedCurrency ?? LOCALE_DEFAULT_CURRENCY[locale],
    selectedCurrency: selectedCurrency ?? null,
    setSelectedCurrency,
  };
}
