import type { Order } from '@/lib/types';

export const initialOrders: Order[] = [
  {
    id: 'order-seed-1',
    orderNumber: 'OS-240912-1042',
    items: [
      { productId: 'iphone-17-pro', variantKey: 'storage-256', quantity: 1 },
      { productId: 'cuktech-140w-gan-charger', quantity: 1 },
    ],
    status: 'delivered',
    timeline: [
      {
        status: 'processing',
        date: '2024-09-12T10:42:00.000Z',
        description: {
          ru: 'Заказ оформлен и принят в обработку.',
          en: 'Order has been placed and accepted for processing.',
        },
      },
      {
        status: 'confirmed',
        date: '2024-09-12T11:30:00.000Z',
        description: {
          ru: 'Оплата подтверждена, заказ передан на сборку.',
          en: 'Payment confirmed, order moved to fulfillment.',
        },
      },
      {
        status: 'shipped',
        date: '2024-09-13T08:15:00.000Z',
        description: {
          ru: 'Заказ передан в службу доставки.',
          en: 'Order handed over to shipping provider.',
        },
      },
      {
        status: 'delivered',
        date: '2024-09-14T15:20:00.000Z',
        description: {
          ru: 'Заказ успешно доставлен.',
          en: 'Order delivered successfully.',
        },
      },
    ],
    totalAmount: 178980,
    discount: 0,
    shippingAddress: {
      fullName: 'Demo User',
      phone: '+7 (999) 555-44-33',
      email: 'demo@onlineshop.local',
      address: 'ул. Тверская, 12',
      city: 'Москва',
      zipCode: '125009',
      country: 'Россия',
    },
    paymentMethod: {
      type: 'card',
      cardNumber: '**** **** **** 4242',
      cardHolder: 'DEMO USER',
    },
    createdAt: '2024-09-12T10:42:00.000Z',
  },
  {
    id: 'order-seed-2',
    orderNumber: 'OS-250107-1849',
    items: [
      { productId: 'macbook-neo', variantKey: 'storage-1tb', quantity: 1 },
      { productId: 'apple-watch-ultra-3', quantity: 1 },
    ],
    status: 'shipped',
    timeline: [
      {
        status: 'processing',
        date: '2025-01-07T18:49:00.000Z',
        description: {
          ru: 'Заказ создан, ожидает подтверждения.',
          en: 'Order created and awaiting confirmation.',
        },
      },
      {
        status: 'confirmed',
        date: '2025-01-07T19:20:00.000Z',
        description: {
          ru: 'Подтвержден менеджером и отправлен в сборку.',
          en: 'Confirmed by manager and sent to fulfillment.',
        },
      },
      {
        status: 'shipped',
        date: '2025-01-08T09:05:00.000Z',
        description: {
          ru: 'Посылка передана курьерской службе.',
          en: 'Package has been dispatched to courier service.',
        },
      },
    ],
    totalAmount: 349980,
    discount: 19990,
    promoCode: 'DEMO',
    shippingAddress: {
      fullName: 'Demo User',
      phone: '+7 (999) 555-44-33',
      email: 'demo@onlineshop.local',
      address: 'Невский проспект, 18',
      city: 'Санкт-Петербург',
      zipCode: '191186',
      country: 'Россия',
    },
    paymentMethod: {
      type: 'card',
      cardNumber: '**** **** **** 4821',
      cardHolder: 'DEMO USER',
    },
    createdAt: '2025-01-07T18:49:00.000Z',
  },
];
