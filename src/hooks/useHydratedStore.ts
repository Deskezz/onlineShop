'use client';

import { useState, useEffect } from 'react';
import type { StoreApi, UseBoundStore } from 'zustand';

export function useHydratedStore<T, R>(
  useStore: UseBoundStore<StoreApi<T>>,
  selector: (state: T) => R
): R | undefined {
  const [hydrated, setHydrated] = useState(false);
  const storeValue = useStore(selector);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return undefined;
  }

  return storeValue;
}
