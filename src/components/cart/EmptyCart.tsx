import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui';

interface EmptyCartProps {
  title: string;
  description: string;
  actionLabel: string;
}

export function EmptyCart({ title, description, actionLabel }: EmptyCartProps) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border-color bg-background-secondary px-6 py-14 text-center">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-foreground-secondary">{description}</p>
      <Link href="/catalog" className="mt-6 inline-block">
        <Button>{actionLabel}</Button>
      </Link>
    </div>
  );
}
