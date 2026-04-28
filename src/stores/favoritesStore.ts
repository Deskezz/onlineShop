'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FavoriteItem } from '@/lib/types';

interface FavoritesState {
  items: FavoriteItem[];
  toggleFavorite: (productId: string, variantKey?: string) => void;
  removeFavorite: (productId: string, variantKey?: string) => void;
  clearFavorites: () => void;
  isFavorite: (productId: string, variantKey?: string) => boolean;
}

function isSameFavorite(
  item: FavoriteItem,
  productId: string,
  _variantKey: string | undefined
): boolean {
  return item.productId === productId;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleFavorite: (productId, variantKey) =>
        set((state) => {
          const exists = state.items.some((item) =>
            isSameFavorite(item, productId, variantKey)
          );

          if (exists) {
            return {
              ...state,
              items: state.items.filter(
                (item) => !isSameFavorite(item, productId, variantKey)
              ),
            };
          }

          return {
            ...state,
            items: [...state.items, { productId, variantKey }],
          };
        }),
      removeFavorite: (productId, variantKey) =>
        set((state) => ({
          ...state,
          items: state.items.filter(
            (item) => !isSameFavorite(item, productId, variantKey)
          ),
        })),
      clearFavorites: () => set(() => ({ items: [] })),
      isFavorite: (productId, variantKey) =>
        get().items.some((item) => isSameFavorite(item, productId, variantKey)),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
