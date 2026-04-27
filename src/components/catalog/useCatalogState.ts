'use client';

import { useMemo, useState } from 'react';
import type { CategorySlug, FilterState, Product, SortOption } from '@/lib/types';
import {
  filterProducts,
  getDefaultPriceRange,
  getTotalPages,
  paginateProducts,
  sortProducts,
} from './catalog-utils';

export function useCatalogState(products: Product[], initialCategory?: CategorySlug) {
  const defaultPriceRange = useMemo(() => getDefaultPriceRange(products), [products]);
  const [sort, setSort] = useState<SortOption>('featured');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    brands: [],
    priceRange: defaultPriceRange,
    minRating: 0,
  });

  const brands = useMemo(
    () => [...new Set(products.map((product) => product.brand))].sort(),
    [products]
  );
  const filteredProducts = useMemo(() => filterProducts(products, filters), [products, filters]);
  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sort),
    [filteredProducts, sort]
  );
  const totalPages = getTotalPages(sortedProducts.length);
  const safePage = Math.min(page, totalPages);
  const paginatedProducts = paginateProducts(sortedProducts, safePage);

  const updateFilters = (next: Partial<FilterState>) => {
    setFilters((current) => ({ ...current, ...next }));
    setPage(1);
  };

  const resetAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: defaultPriceRange,
      minRating: 0,
    });
    setPage(1);
  };

  return {
    sort,
    setSort,
    page: safePage,
    setPage,
    filters,
    updateFilters,
    resetAllFilters,
    defaultPriceRange,
    brands,
    sortedProducts,
    paginatedProducts,
    totalPages,
  };
}
