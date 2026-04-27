'use client';

import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useScrollLock } from '@/hooks/useScrollLock';
import { Button } from '@/components/ui';

interface MobileFiltersDrawerProps {
  open: boolean;
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}

export function MobileFiltersDrawer({
  open,
  title,
  closeLabel,
  onClose,
  children,
}: MobileFiltersDrawerProps) {
  useScrollLock(open);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label={closeLabel}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto border-l border-border-color bg-background p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button size="icon" variant="ghost" aria-label={closeLabel} onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
