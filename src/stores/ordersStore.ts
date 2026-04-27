'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialOrders } from '@/data/orders';
import type { Order } from '@/lib/types';

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrders: () => void;
}

function mergeOrders(staticOrders: Order[], persistedOrders: Order[]): Order[] {
  const map = new Map<string, Order>();

  staticOrders.forEach((order) => {
    map.set(order.id, order);
  });

  persistedOrders.forEach((order) => {
    map.set(order.id, order);
  });

  return [...map.values()].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: initialOrders,
      addOrder: (order) =>
        set((state) => ({
          orders: mergeOrders([], [order, ...state.orders]),
        })),
      clearOrders: () => set(() => ({ orders: initialOrders })),
    }),
    {
      name: 'orders-storage',
      merge: (persistedState, currentState) => {
        const parsedPersisted =
          persistedState && typeof persistedState === 'object' && 'orders' in persistedState
            ? (persistedState.orders as Order[])
            : [];

        return {
          ...currentState,
          orders: mergeOrders(initialOrders, parsedPersisted),
        };
      },
    }
  )
);
