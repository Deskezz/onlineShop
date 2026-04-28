import { ChevronDown } from 'lucide-react';
import type { Locale, ProductSpec } from '@/lib/types';

interface ProductSpecsProps {
  title: string;
  specs: ProductSpec[];
  locale: Locale;
}

export function ProductSpecs({ title, specs, locale }: ProductSpecsProps) {
  if (specs.length === 0) return null;

  return (
    <section className="rounded-[var(--radius-card)] border border-border-color bg-background-secondary p-5">
      <details className="md:hidden">
        <summary className="group flex cursor-pointer list-none items-center justify-between text-2xl font-semibold tracking-tight">
          <span>{title}</span>
          <ChevronDown className="h-5 w-5 text-foreground-secondary transition-transform group-open:rotate-180" />
        </summary>
        <SpecsList specs={specs} locale={locale} />
      </details>

      <div className="hidden md:block">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <SpecsList specs={specs} locale={locale} />
      </div>
    </section>
  );
}

function SpecsList({ specs, locale }: { specs: ProductSpec[]; locale: Locale }) {
  return (
    <dl className="mt-4 divide-y divide-border-color">
      {specs.map((spec, index) => (
        <div key={`${spec.label.en}-${index}`} className="grid gap-1 py-3 sm:grid-cols-2">
          <dt className="text-sm text-foreground-secondary">{spec.label[locale]}</dt>
          <dd className="font-medium">{spec.value[locale]}</dd>
        </div>
      ))}
    </dl>
  );
}
