import { X } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import type { Category, CategorySlug, Locale } from '@/lib/types';

interface ActiveFiltersProps {
  locale: Locale;
  categories: Category[];
  selectedCategories: CategorySlug[];
  selectedBrands: string[];
  minRating: number;
  minPrice: number;
  maxPrice: number;
  defaultMinPrice: number;
  defaultMaxPrice: number;
  clearLabel: string;
  ratingLabel: string;
  onRemoveCategory: (slug: CategorySlug) => void;
  onRemoveBrand: (brand: string) => void;
  onRemoveRating: () => void;
  onResetPrice: () => void;
  onClearAll: () => void;
}

export function ActiveFilters(props: ActiveFiltersProps) {
  const {
    locale,
    categories,
    selectedCategories,
    selectedBrands,
    minRating,
    minPrice,
    maxPrice,
    defaultMinPrice,
    defaultMaxPrice,
    clearLabel,
    ratingLabel,
    onRemoveCategory,
    onRemoveBrand,
    onRemoveRating,
    onResetPrice,
    onClearAll,
  } = props;

  const hasPriceChange = minPrice !== defaultMinPrice || maxPrice !== defaultMaxPrice;
  const hasFilters =
    selectedCategories.length > 0 || selectedBrands.length > 0 || minRating > 0 || hasPriceChange;

  if (!hasFilters) {
    return null;
  }

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      {selectedCategories.map((slug) => {
        const category = categories.find((item) => item.slug === slug);
        return (
          <FilterChip
            key={slug}
            label={category ? category.name[locale] : slug}
            onRemove={() => onRemoveCategory(slug)}
          />
        );
      })}

      {selectedBrands.map((brand) => (
        <FilterChip key={brand} label={brand} onRemove={() => onRemoveBrand(brand)} />
      ))}

      {minRating > 0 ? (
        <FilterChip
          label={`${ratingLabel}: ${minRating}+`}
          onRemove={onRemoveRating}
        />
      ) : null}

      {hasPriceChange ? (
        <FilterChip label={`${minPrice} - ${maxPrice}`} onRemove={onResetPrice} />
      ) : null}

      <Button variant="ghost" size="sm" onClick={onClearAll}>
        {clearLabel}
      </Button>
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <Badge variant="outline" className="gap-1.5 pr-1">
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={label}
        className="rounded-full p-0.5 hover:bg-background-secondary"
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}
