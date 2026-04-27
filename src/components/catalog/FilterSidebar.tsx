import type { Category, CategorySlug, FilterState, Locale } from '@/lib/types';
import { Button, Card, CardContent } from '@/components/ui';
import { CheckboxRow, FilterGroup, PriceInput } from './FilterControls';

interface FilterSidebarProps {
  locale: Locale;
  categories: Category[];
  brands: string[];
  filters: FilterState;
  priceBounds: [number, number];
  labels: {
    title: string;
    category: string;
    brand: string;
    price: string;
    rating: string;
    clear: string;
    apply: string;
  };
  onToggleCategory: (category: CategorySlug) => void;
  onToggleBrand: (brand: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onRatingChange: (rating: number) => void;
  onClear: () => void;
  onApply?: () => void;
}

export function FilterSidebar({
  locale,
  categories,
  brands,
  filters,
  priceBounds,
  labels,
  onToggleCategory,
  onToggleBrand,
  onPriceChange,
  onRatingChange,
  onClear,
  onApply,
}: FilterSidebarProps) {
  return (
    <Card className="border-border-color bg-background-secondary">
      <CardContent className="space-y-6 p-5 pt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{labels.title}</h2>
          <Button variant="ghost" size="sm" onClick={onClear}>
            {labels.clear}
          </Button>
        </div>

        <FilterGroup title={labels.category}>
          {categories.map((category) => (
            <CheckboxRow
              key={category.slug}
              label={category.name[locale]}
              checked={filters.categories.includes(category.slug)}
              onChange={() => onToggleCategory(category.slug)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title={labels.brand}>
          {brands.map((brand) => (
            <CheckboxRow
              key={brand}
              label={brand}
              checked={filters.brands.includes(brand)}
              onChange={() => onToggleBrand(brand)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title={labels.price}>
          <div className="grid grid-cols-2 gap-2">
            <PriceInput
              value={filters.priceRange[0]}
              min={priceBounds[0]}
              max={filters.priceRange[1]}
              onChange={(value) => onPriceChange([value, filters.priceRange[1]])}
            />
            <PriceInput
              value={filters.priceRange[1]}
              min={filters.priceRange[0]}
              max={priceBounds[1]}
              onChange={(value) => onPriceChange([filters.priceRange[0], value])}
            />
          </div>
        </FilterGroup>

        <FilterGroup title={labels.rating}>
          {[4, 3, 2, 1].map((rating) => (
            <CheckboxRow
              key={rating}
              label={`${rating}+`}
              checked={filters.minRating === rating}
              onChange={() => onRatingChange(filters.minRating === rating ? 0 : rating)}
            />
          ))}
        </FilterGroup>

        {onApply ? (
          <Button className="w-full" onClick={onApply}>
            {labels.apply}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
