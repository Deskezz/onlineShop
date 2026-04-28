import type {
  Badge as BadgeType,
  Category,
  CategorySlug,
  Locale,
  Product,
} from '@/lib/types';

export interface CatalogLabels {
  title: string;
  showing: string;
  noResults: string;
  prev: string;
  next: string;
  filters: {
    title: string;
    category: string;
    brand: string;
    price: string;
    rating: string;
    clear: string;
    apply: string;
    close: string;
    sort: string;
    sortOptions: {
      featured: string;
      priceAsc: string;
      priceDesc: string;
      rating: string;
      newest: string;
    };
  };
  product: {
    inStock: string;
    outOfStock: string;
    addToCart: string;
  };
}

export interface CatalogPageClientProps {
  locale: Locale;
  products: Product[];
  categories: Category[];
  initialCategory?: CategorySlug;
  labels: CatalogLabels;
  badgeLabels: Record<BadgeType, string>;
}
