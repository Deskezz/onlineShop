import { Minus, Plus } from 'lucide-react';
import type { ReactNode } from 'react';

interface ProductQuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  label: string;
}

export function ProductQuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
  label,
}: ProductQuantitySelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex w-fit items-center gap-2 rounded-[var(--radius-button)] border border-border-color p-1">
        <IconButton onClick={onDecrease} ariaLabel="Decrease quantity">
          <Minus className="h-4 w-4" />
        </IconButton>
        <span className="w-8 text-center font-medium">{quantity}</span>
        <IconButton onClick={onIncrease} ariaLabel="Increase quantity">
          <Plus className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  );
}

function IconButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="rounded-[var(--radius-button)] p-2 transition-colors hover:bg-background-secondary"
    >
      {children}
    </button>
  );
}
