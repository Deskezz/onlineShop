import type { Locale, OrderStatus } from './types';

export const LOCALES: Locale[] = ['ru', 'en'];
export const DEFAULT_LOCALE: Locale = 'ru';

export const PROMO_CODES: Record<string, number> = {
  DEMO: 0.1,
  SAVE25: 0.25,
};

export const CART_LIMITS = {
  maxQuantityPerItem: 10,
  maxItemsInCart: 50,
} as const;

export const SEARCH_CONFIG = {
  debounceMs: 300,
  maxResults: 6,
} as const;

export const PAGINATION = {
  productsPerPage: 12,
} as const;

export const PRICE_RANGE = {
  min: 0,
  max: 500000,
} as const;

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  'processing',
  'confirmed',
  'shipped',
  'delivered',
];

export const TRANSITION_DURATION = '300ms';
export const TRANSITION_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
