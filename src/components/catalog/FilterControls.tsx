import type { ReactNode } from 'react';

export function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-2">
      <legend className="mb-1 text-sm font-semibold text-foreground">{title}</legend>
      {children}
    </fieldset>
  );
}

export function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground-secondary">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-border-color"
      />
      <span>{label}</span>
    </label>
  );
}

export function PriceInput({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={(event) => onChange(Number(event.target.value))}
      className="h-10 rounded-[var(--radius-button)] border border-border-color bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    />
  );
}
