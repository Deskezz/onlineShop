'use client';

import * as React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { useScrollLock } from '@/hooks/useScrollLock';
import { products } from '@/data';
import type { CategorySlug, Locale } from '@/lib/types';
import { cn, formatPrice, normalizeQuery } from '@/lib/utils';
import { Input } from '@/components/ui';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

interface CategoryIntent {
  category: CategorySlug;
  terms: string[];
}

const TERM_ALIASES: Record<string, string[]> = {
  iphone: ['айфон'],
  айфон: ['iphone'],
  mac: ['мак'],
  мак: ['mac'],
  macbook: ['макбук'],
  макбук: ['macbook'],
  xiaomi: ['сяоми', 'ксиоми'],
  сяоми: ['xiaomi'],
  ксиоми: ['xiaomi'],
  huawei: ['хуавей'],
  хуавей: ['huawei'],
  lenovo: ['леново'],
  леново: ['lenovo'],
  apple: ['эппл', 'аппл'],
  эппл: ['apple'],
  аппл: ['apple'],
  redmi: ['редми'],
  редми: ['redmi'],
  oneplus: ['ванплас', 'уанплас'],
  realme: ['риалми'],
  watch: ['часы'],
  часы: ['watch'],
  charger: ['зарядка', 'зарядное'],
  keyboard: ['клавиатура'],
  gamepad: ['геймпад'],
  tablet: ['планшет'],
  laptop: ['ноутбук'],
  desktop: ['настольный', 'компьютер'],
};

const PRODUCT_ALIASES: Record<string, string[]> = {
  'iphone-17-pro': ['айфон 17 про', 'iphone 17 pro'],
  'iphone-17': ['айфон 17', 'iphone 17'],
  'iphone-17e': ['айфон 17е', 'iphone 17e'],
  'iphone-air': ['айфон эйр', 'iphone air'],
  'iphone-16': ['айфон 16', 'iphone 16'],
  'xiaomi-17-ultra': ['сяоми 17 ультра', 'ксиоми 17 ультра', 'xiaomi 17 ultra'],
  'oneplus-15t': ['уанплас 15т', 'oneplus 15t'],
  'oneplus-turbo-6': ['уанплас турбо 6', 'oneplus turbo 6'],
  'realme-gt-8-pro': ['риалми gt 8 про', 'realme gt 8 pro'],
  'redmi-k90-max': ['редми k90 макс', 'redmi k90 max'],
  'redmi-turbo-5': ['редми турбо 5', 'redmi turbo 5'],
  'huawei-mate-80-rs': ['хуавей mate 80 rs', 'huawei mate 80 rs'],
  'ipad-pro': ['айпад про', 'ipad pro'],
  'ipad-air-2026': ['айпад эйр', 'ipad air'],
  'xiaomi-pad-8-pro': ['сяоми пад 8 про', 'xiaomi pad 8 pro'],
  'realme-pad-x2': ['риалми пад x2', 'realme pad x2'],
  'legion-y700-gen5': ['леново легион y700', 'lenovo legion y700'],
  'macbook-neo': ['макбук', 'макбук нео', 'macbook', 'macbook neo'],
  'apple-watch-ultra-3': ['эппл вотч ультра 3', 'apple watch ultra 3'],
  'apple-watch-series-11': ['эппл вотч 11', 'apple watch series 11'],
  'apple-watch-se-3': ['эппл вотч se 3', 'apple watch se 3'],
  'rog-ace-hfx-keyboard': ['клавиатура rog ace hfx', 'rog ace hfx keyboard'],
  'redmagic-iceblade-keyboard': ['клавиатура redmagic iceblade', 'redmagic iceblade keyboard'],
  'redmagic-ice-domain-keyboard': ['клавиатура redmagic ice domain', 'redmagic ice domain keyboard'],
  'cuktech-140w-gan-charger': ['зарядка cuktech 140w', 'cuktech 140w charger'],
  'xiaomi-30w-magnetic-charger': ['магнитная зарядка xiaomi 30w', 'xiaomi 30w magnetic charger'],
  'flydigi-apex-5-gamepad': ['геймпад flydigi apex 5', 'flydigi apex 5 gamepad'],
  'apple-pencil-pro': ['эппл пенсил про', 'apple pencil pro'],
  'mac-mini': ['мак мини', 'mac mini'],
  'mac-studio-m4': ['мак студио', 'мак студия', 'mac studio', 'mac studio m4'],
};

const CATEGORY_INTENTS: CategoryIntent[] = [
  { category: 'smartphones', terms: ['smartphone', 'smartphones', 'phone', 'phones', 'смартфон', 'смартфоны', 'телефон', 'телефоны', 'iphone', 'айфон'] },
  { category: 'tablets', terms: ['tablet', 'tablets', 'ipad', 'планшет', 'планшеты', 'айпад'] },
  { category: 'laptops', terms: ['laptop', 'laptops', 'notebook', 'macbook', 'ноутбук', 'ноутбуки', 'макбук', 'ультрабук'] },
  { category: 'watches', terms: ['watch', 'watches', 'smartwatch', 'smartwatches', 'часы', 'смартчасы', 'вотч'] },
  { category: 'keyboards', terms: ['keyboard', 'keyboards', 'клавиатура', 'клавиатуры', 'механическая клавиатура'] },
  { category: 'accessories', terms: ['accessory', 'accessories', 'charger', 'chargers', 'gamepad', 'stylus', 'headphones', 'earbuds', 'аксессуар', 'аксессуары', 'зарядка', 'зарядки', 'геймпад', 'стилус', 'наушники'] },
  { category: 'desktops', terms: ['desktop', 'desktops', 'pc', 'mac mini', 'mac studio', 'настольный', 'настольные', 'компьютер', 'компьютеры', 'мак мини', 'мак студио'] },
];

function tokenize(value: string): string[] {
  return normalizeQuery(value)
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

function expandTerms(tokens: string[]): string[] {
  const expanded = new Set<string>(tokens);

  for (const token of tokens) {
    const direct = TERM_ALIASES[token] ?? [];
    for (const alias of direct) {
      for (const aliasToken of tokenize(alias)) {
        expanded.add(aliasToken);
      }
    }

    for (const [key, aliases] of Object.entries(TERM_ALIASES)) {
      if (key.startsWith(token) || token.startsWith(key)) {
        expanded.add(key);
        for (const alias of aliases) {
          for (const aliasToken of tokenize(alias)) {
            expanded.add(aliasToken);
          }
        }
      }
    }
  }

  return Array.from(expanded);
}

function buildSearchBlob(product: (typeof products)[number], locale: Locale): string {
  const aliases = PRODUCT_ALIASES[product.id] ?? [];
  return normalizeQuery([
    product.name.ru,
    product.name.en,
    product.description.ru,
    product.description.en,
    product.brand,
    product.category,
    product.slug,
    ...aliases,
    locale,
  ].join(' '));
}

function scoreBlob(blob: string, terms: string[]): number {
  let score = 0;

  for (const term of terms) {
    if (!term) {
      continue;
    }

    if (blob.startsWith(term)) {
      score += 10;
      continue;
    }

    if (blob.includes(` ${term}`)) {
      score += 6;
      continue;
    }

    if (blob.includes(term)) {
      score += 2;
    }
  }

  return score;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const t = useTranslations('search');
  const common = useTranslations('common');
  const tCategories = useTranslations('categories');
  const locale = useLocale() as Locale;
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(normalizeQuery(query), 300);

  useScrollLock(open);

  React.useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }

    const timer = window.setTimeout(() => inputRef.current?.focus(), 10);
    return () => window.clearTimeout(timer);
  }, [open]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      const modal = modalRef.current;
      if (modal && target && !modal.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, [onClose, open]);

  const results = React.useMemo(() => {
    if (!debouncedQuery) {
      return [];
    }

    if (debouncedQuery === 'товар' || debouncedQuery === 'товары' || debouncedQuery === 'product' || debouncedQuery === 'products') {
      return products.slice(0, 6).map((product) => ({ product, score: 1 }));
    }

    const terms = expandTerms(tokenize(debouncedQuery));

    return products
      .map((product) => {
        const blob = buildSearchBlob(product, locale);
        return { product, score: scoreBlob(blob, terms) };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [debouncedQuery, locale]);

  const categoryIntent = React.useMemo(() => {
    if (!debouncedQuery) {
      return undefined;
    }

    const terms = new Set(expandTerms(tokenize(debouncedQuery)));
    for (const intent of CATEGORY_INTENTS) {
      for (const term of intent.terms) {
        const normalizedTerm = normalizeQuery(term);
        if ([...terms].some((item) => normalizedTerm.startsWith(item) || item.startsWith(normalizedTerm))) {
          return intent.category;
        }
      }
    }

    return undefined;
  }, [debouncedQuery]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50" role="presentation">
      <div className="relative z-10 flex min-h-full items-start justify-center p-3 pt-16 sm:p-4 sm:pt-20">
        <div
          ref={modalRef}
          className="w-full max-w-2xl rounded-[var(--radius-card)] border border-border-color bg-background-secondary shadow-xl"
          role="dialog"
          aria-modal="true"
          aria-label={common('search')}
        >
          <div className="border-b border-border-color p-4">
            <Input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('placeholder')}
              aria-label={common('search')}
              startIcon={<Search className="h-4 w-4" />}
              className="h-11"
            />
            <p className="hidden pt-2 text-xs text-foreground-secondary sm:block">{t('hint')}</p>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {!debouncedQuery ? (
              <p className="px-3 py-6 text-sm text-foreground-secondary">{t('emptyQuery')}</p>
            ) : results.length === 0 ? (
              <p className="px-3 py-6 text-sm text-foreground-secondary">{t('noResults')}</p>
            ) : (
              <ul className="space-y-1">
                {results.map(({ product }) => (
                  <li key={product.id}>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 rounded-[var(--radius-button)] px-3 py-2 transition-colors',
                        'hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
                      )}
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-md bg-background">
                        <Image
                          src={product.images[0]}
                          alt={product.name[locale]}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{product.name[locale]}</p>
                        <p className="text-xs text-foreground-secondary">{product.brand}</p>
                      </div>
                      <span className="text-sm font-medium text-foreground">{formatPrice(product.price, locale)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {categoryIntent ? (
              <div className="border-t border-border-color px-2 pt-2">
                <Link
                  href={{ pathname: '/catalog', query: { category: categoryIntent } }}
                  onClick={onClose}
                  className="block rounded-[var(--radius-button)] px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {t('viewAllCategory', { category: tCategories(categoryIntent) })}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
