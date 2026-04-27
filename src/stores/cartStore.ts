'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CART_LIMITS } from '@/lib/constants';
import type { CartItem } from '@/lib/types';

interface AddCartItemPayload {
  productId: string;
  variantKey?: string;
  quantity?: number;
}

interface CartState {
  items: CartItem[];
  promoCode?: string;
  addItem: (payload: AddCartItemPayload) => void;
  updateItemQuantity: (
    productId: string,
    variantKey: string | undefined,
    quantity: number
  ) => void;
  removeItem: (productId: string, variantKey?: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => void;
  clearPromoCode: () => void;
}

function isSameItem(
  item: CartItem,
  productId: string,
  variantKey: string | undefined
): boolean {
  return item.productId === productId && item.variantKey === variantKey;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      promoCode: undefined,
      addItem: ({ productId, variantKey, quantity = 1 }) =>
        set((state) => {
          const safeQuantity = Math.max(1, Math.floor(quantity));
          const existingItem = state.items.find((item) =>
            isSameItem(item, productId, variantKey)
          );

          if (!existingItem && state.items.length >= CART_LIMITS.maxItemsInCart) {
            return state;
          }

          if (!existingItem) {
            return {
              ...state,
              items: [
                ...state.items,
                {
                  productId,
                  variantKey,
                  quantity: Math.min(safeQuantity, CART_LIMITS.maxQuantityPerItem),
                },
              ],
            };
          }

          return {
            ...state,
            items: state.items.map((item) => {
              if (!isSameItem(item, productId, variantKey)) {
                return item;
              }

              return {
                ...item,
                quantity: Math.min(
                  item.quantity + safeQuantity,
                  CART_LIMITS.maxQuantityPerItem
                ),
              };
            }),
          };
        }),
      updateItemQuantity: (productId, variantKey, quantity) =>
        set((state) => {
          const safeQuantity = Math.max(0, Math.floor(quantity));
          if (safeQuantity === 0) {
            return {
              ...state,
              items: state.items.filter(
                (item) => !isSameItem(item, productId, variantKey)
              ),
            };
          }

          return {
            ...state,
            items: state.items.map((item) => {
              if (!isSameItem(item, productId, variantKey)) {
                return item;
              }

              return {
                ...item,
                quantity: Math.min(safeQuantity, CART_LIMITS.maxQuantityPerItem),
              };
            }),
          };
        }),
      removeItem: (productId, variantKey) =>
        set((state) => ({
          ...state,
          items: state.items.filter((item) => !isSameItem(item, productId, variantKey)),
        })),
      clearCart: () => set(() => ({ items: [], promoCode: undefined })),
      applyPromoCode: (code) => set((state) => ({ ...state, promoCode: code.trim().toUpperCase() })),
      clearPromoCode: () => set((state) => ({ ...state, promoCode: undefined })),
    }),
    {
      name: 'cart-storage',
    }
  )
);
