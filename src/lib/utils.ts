import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CurrencyCode } from '@/lib/types';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const CURRENCY_RATES: Record<CurrencyCode, number> = {
  RUB: 1,
  USD: 0.011,
  EUR: 0.0102,
};

export function formatPrice(
  priceRub: number,
  locale: string = 'en',
  currency?: CurrencyCode
): string {
  const effectiveCurrency: CurrencyCode =
    currency ?? (locale === 'ru' ? 'RUB' : 'USD');
  const convertedPrice = priceRub * CURRENCY_RATES[effectiveCurrency];
  const numberLocale = locale === 'ru' ? 'ru-RU' : 'en-US';

  return new Intl.NumberFormat(numberLocale, {
    style: 'currency',
    currency: effectiveCurrency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(convertedPrice);
}

export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
