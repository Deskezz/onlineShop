import { PAGINATION } from '@/lib/constants';
import type { FilterState, Product, SortOption } from '@/lib/types';

export function getDefaultPriceRange(products: Product[]): [number, number] {
  if (products.length === 0) {
    return [0, 0];
  }

  const prices = products.map((product) => product.price);
  return [Math.min(...prices), Math.max(...prices)];
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    const categoryOk =
      filters.categories.length === 0 || filters.categories.includes(product.category);
    const brandOk = filters.brands.length === 0 || filters.brands.includes(product.brand);
    const priceOk =
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const ratingOk = product.rating >= filters.minRating;

    return categoryOk && brandOk && priceOk && ratingOk;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  if (sort === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
    return sorted;
  }

  if (sort === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }

  if (sort === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }

  if (sort === 'newest') {
    sorted.sort((a, b) => {
      const aScore = a.badges?.includes('new') ? 1 : 0;
      const bScore = b.badges?.includes('new') ? 1 : 0;
      return bScore - aScore;
    });
    return sorted;
  }

  return sorted;
}

export function paginateProducts(products: Product[], page: number): Product[] {
  const start = (page - 1) * PAGINATION.productsPerPage;
  const end = start + PAGINATION.productsPerPage;
  return products.slice(start, end);
}

export function getTotalPages(totalItems: number): number {
  return Math.max(1, Math.ceil(totalItems / PAGINATION.productsPerPage));
}
