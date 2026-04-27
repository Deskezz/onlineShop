import type { SortOption } from '@/lib/types';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  label: string;
  id?: string;
  options: {
    featured: string;
    priceAsc: string;
    priceDesc: string;
    rating: string;
    newest: string;
  };
}

export function SortSelect({
  value,
  onChange,
  label,
  id = 'catalog-sort',
  options,
}: SortSelectProps) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <label
        htmlFor={id}
        className="hidden text-sm font-medium text-foreground-secondary sm:block"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="h-10 min-w-0 w-full rounded-[var(--radius-button)] border border-border-color bg-background-secondary px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:min-w-[220px]"
      >
        <option value="featured">{options.featured}</option>
        <option value="price-asc">{options.priceAsc}</option>
        <option value="price-desc">{options.priceDesc}</option>
        <option value="rating">{options.rating}</option>
        <option value="newest">{options.newest}</option>
      </select>
    </div>
  );
}
