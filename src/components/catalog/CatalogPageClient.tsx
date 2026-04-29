'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui';
import { FilterSidebar } from './FilterSidebar';
import { ActiveFilters } from './ActiveFilters';
import { SortSelect } from './SortSelect';
import { CurrencySelect } from './CurrencySelect';
import { ProductsGrid } from './ProductsGrid';
import { Pagination } from './Pagination';
import { MobileFiltersDrawer } from './MobileFiltersDrawer';
import { useCatalogState } from './useCatalogState';
import type { CatalogPageClientProps } from './catalog-types';

export function CatalogPageClient({
  locale,
  products,
  categories,
  initialCategory,
  labels,
  badgeLabels,
}: CatalogPageClientProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const state = useCatalogState(products, initialCategory);

  const showingLabel = labels.showing
    .replace('{count}', String(state.paginatedProducts.length))
    .replace('{total}', String(state.sortedProducts.length));

  const sidebar = (
    <FilterSidebar
      locale={locale}
      categories={categories}
      brands={state.brands}
      filters={state.filters}
      priceBounds={state.defaultPriceRange}
      labels={labels.filters}
      onToggleCategory={(category) =>
        state.updateFilters({
          categories: state.filters.categories.includes(category)
            ? state.filters.categories.filter((item) => item !== category)
            : [...state.filters.categories, category],
        })
      }
      onToggleBrand={(brand) =>
        state.updateFilters({
          brands: state.filters.brands.includes(brand)
            ? state.filters.brands.filter((item) => item !== brand)
            : [...state.filters.brands, brand],
        })
      }
      onPriceChange={(priceRange) => state.updateFilters({ priceRange })}
      onRatingChange={(minRating) => state.updateFilters({ minRating })}
      onClear={state.resetAllFilters}
      onApply={isDesktop ? undefined : () => setMobileFiltersOpen(false)}
    />
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <div className="mb-6 space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{labels.title}</h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr] sm:items-center md:flex md:justify-end">
          <Button
            variant="outline"
            className="w-full md:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {labels.filters.title}
          </Button>
          <CurrencySelect locale={locale} id="catalog-currency-mobile" />
          <SortSelect
            id="catalog-sort-mobile"
            value={state.sort}
            onChange={state.setSort}
            label={labels.filters.sort}
            options={labels.filters.sortOptions}
          />
        </div>
      </div>

      <p className="mb-4 text-sm text-foreground-secondary">{showingLabel}</p>
      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <aside className="hidden md:block">{sidebar}</aside>
        <section>
          <ActiveFilters
            locale={locale}
            categories={categories}
            selectedCategories={state.filters.categories}
            selectedBrands={state.filters.brands}
            minRating={state.filters.minRating}
            minPrice={state.filters.priceRange[0]}
            maxPrice={state.filters.priceRange[1]}
            defaultMinPrice={state.defaultPriceRange[0]}
            defaultMaxPrice={state.defaultPriceRange[1]}
            clearLabel={labels.filters.clear}
            ratingLabel={labels.filters.rating}
            onRemoveCategory={(category) =>
              state.updateFilters({
                categories: state.filters.categories.filter((item) => item !== category),
              })
            }
            onRemoveBrand={(brand) =>
              state.updateFilters({
                brands: state.filters.brands.filter((item) => item !== brand),
              })
            }
            onRemoveRating={() => state.updateFilters({ minRating: 0 })}
            onResetPrice={() => state.updateFilters({ priceRange: state.defaultPriceRange })}
            onClearAll={state.resetAllFilters}
          />
          <ProductsGrid products={state.paginatedProducts} locale={locale} emptyLabel={labels.noResults} labels={labels.product} badgeLabels={badgeLabels} />
          <Pagination page={state.page} totalPages={state.totalPages} prevLabel={labels.prev} nextLabel={labels.next} onPageChange={state.setPage} />
        </section>
      </div>

      <MobileFiltersDrawer open={isMobileFiltersOpen} title={labels.filters.title} closeLabel={labels.filters.close} onClose={() => setMobileFiltersOpen(false)}>
        {sidebar}
      </MobileFiltersDrawer>
    </div>
  );
}
