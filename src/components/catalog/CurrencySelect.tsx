'use client';

import { useTranslations } from 'next-intl';
import { useDisplayCurrency } from '@/hooks/useDisplayCurrency';
import type { CurrencyCode, Locale } from '@/lib/types';

interface CurrencySelectProps {
  locale: Locale;
  id?: string;
}

const CURRENCIES: CurrencyCode[] = ['RUB', 'USD', 'EUR'];

export function CurrencySelect({ locale, id = 'catalog-currency' }: CurrencySelectProps) {
  const t = useTranslations('common');
  const { currency, setSelectedCurrency } = useDisplayCurrency(locale);

  return (
    <div className="flex min-w-0 items-center gap-2">
      <label htmlFor={id} className="hidden text-sm font-medium text-foreground-secondary sm:block">
        {t('currencyLabel')}
      </label>
      <select
        id={id}
        value={currency}
        onChange={(event) => setSelectedCurrency(event.target.value as CurrencyCode)}
        className="h-10 min-w-0 w-full rounded-[var(--radius-button)] border border-border-color bg-background-secondary px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:min-w-[140px]"
      >
        {CURRENCIES.map((item) => (
          <option key={item} value={item}>
            {t(`currency${item}`)}
          </option>
        ))}
      </select>
    </div>
  );
}
