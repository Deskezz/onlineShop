import type { Category } from '@/lib/types';

export const categories: Category[] = [
  {
    slug: 'smartphones',
    name: { ru: 'Смартфоны', en: 'Smartphones' },
    description: {
      ru: 'Флагманские и доступные модели на каждый день.',
      en: 'Flagship and value smartphones for daily use.',
    },
    image: '/assets/products/IPhone-17-Pro.jpg',
    productCount: 12,
  },
  {
    slug: 'tablets',
    name: { ru: 'Планшеты', en: 'Tablets' },
    description: {
      ru: 'Устройства для творчества, работы и развлечений.',
      en: 'Devices for creativity, work, and entertainment.',
    },
    image: '/assets/products/ipad-pro.png',
    productCount: 5,
  },
  {
    slug: 'laptops',
    name: { ru: 'Ноутбуки', en: 'Laptops' },
    description: {
      ru: 'Мощные портативные компьютеры для любых задач.',
      en: 'Portable performance laptops for every workload.',
    },
    image: '/assets/products/macbook-neo.jpg',
    productCount: 1,
  },
  {
    slug: 'watches',
    name: { ru: 'Смарт-часы', en: 'Smartwatches' },
    description: {
      ru: 'Умные часы для спорта, здоровья и уведомлений.',
      en: 'Smartwatches for fitness, wellness, and notifications.',
    },
    image: '/assets/products/apple-watch-ultra-3.png',
    productCount: 2,
  },
  {
    slug: 'accessories',
    name: { ru: 'Аксессуары', en: 'Accessories' },
    description: {
      ru: 'Клавиатуры, зарядки и полезные дополнения.',
      en: 'Keyboards, chargers, and essential add-ons.',
    },
    image: '/assets/products/cuktech-140w-gan-charger-4-ports.jpg',
    productCount: 8,
  },
  {
    slug: 'desktops',
    name: { ru: 'Настольные ПК', en: 'Desktops' },
    description: {
      ru: 'Компактные и производительные desktop-решения.',
      en: 'Compact and powerful desktop solutions.',
    },
    image: '/assets/products/mac-mini.jpg',
    productCount: 2,
  },
];
