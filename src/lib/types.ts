export type Locale = 'ru' | 'en';

export type Theme = 'light' | 'dark';
export type CurrencyCode = 'RUB' | 'USD' | 'EUR';

export interface LocalizedString {
  ru: string;
  en: string;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  originalPrice?: number;
  category: CategorySlug;
  brand: string;
  rating: number;
  reviewCount: number;
  images: string[];
  variants?: ProductVariant[];
  badges?: Badge[];
  inStock: boolean;
}

export interface ProductVariant {
  key: string;
  type: 'color' | 'storage';
  label: LocalizedString;
  value: string;
  priceModifier?: number;
}

export type Badge = 'new' | 'sale' | 'bestseller' | 'limited';

export type CategorySlug =
  | 'smartphones'
  | 'tablets'
  | 'laptops'
  | 'watches'
  | 'keyboards'
  | 'accessories'
  | 'desktops';

export interface Category {
  slug: CategorySlug;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
  productCount: number;
}

export interface ProductSpec {
  label: LocalizedString;
  value: LocalizedString;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: LocalizedString;
  verified: boolean;
}

export interface CartItem {
  productId: string;
  variantKey?: string;
  quantity: number;
}

export interface FavoriteItem {
  productId: string;
  variantKey?: string;
}

export type OrderStatus =
  | 'processing'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderTimelineEntry {
  status: OrderStatus;
  date: string;
  description: LocalizedString;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  status: OrderStatus;
  timeline: OrderTimelineEntry[];
  totalAmount: number;
  discount: number;
  promoCode?: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  createdAt: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: 'card' | 'cash';
  cardNumber?: string;
  cardHolder?: string;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
}

export interface FilterState {
  categories: CategorySlug[];
  brands: string[];
  priceRange: [number, number];
  minRating: number;
}

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'newest';
