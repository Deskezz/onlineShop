import { Link } from '@/i18n/navigation';
import { Button, Input } from '@/components/ui';
import { formatPrice } from '@/lib/utils';
import type { Locale } from '@/lib/types';

interface CartSummaryProps {
  locale: Locale;
  subtotal: number;
  discount: number;
  total: number;
  appliedPromoCode?: string;
  promoCode: string;
  onPromoCodeChange: (value: string) => void;
  onApplyPromo: () => void;
  onRemovePromo: () => void;
  labels: {
    subtotal: string;
    discount: string;
    total: string;
    promoCode: string;
    applyPromo: string;
    promoActive: string;
    promoRemove: string;
    checkout: string;
  };
}

export function CartSummary({
  locale,
  subtotal,
  discount,
  total,
  appliedPromoCode,
  promoCode,
  onPromoCodeChange,
  onApplyPromo,
  onRemovePromo,
  labels,
}: CartSummaryProps) {
  return (
    <aside className="top-20 space-y-4 rounded-[var(--radius-card)] border border-border-color bg-background-secondary p-5 md:sticky">
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-foreground-secondary">{labels.subtotal}</span>
          <span>{formatPrice(subtotal, locale)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-foreground-secondary">{labels.discount}</span>
          <span>{discount > 0 ? `- ${formatPrice(discount, locale)}` : formatPrice(0, locale)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border-color pt-2 text-base font-semibold">
          <span>{labels.total}</span>
          <span>{formatPrice(total, locale)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          value={promoCode}
          onChange={(event) => onPromoCodeChange(event.target.value)}
          placeholder={labels.promoCode}
        />
        <Button onClick={onApplyPromo}>{labels.applyPromo}</Button>
      </div>

      {appliedPromoCode ? (
        <div className="flex items-center justify-between rounded-[var(--radius-button)] border border-border-color bg-background px-3 py-2 text-sm">
          <span>{labels.promoActive.replace('{code}', appliedPromoCode)}</span>
          <Button variant="ghost" size="sm" onClick={onRemovePromo}>
            {labels.promoRemove}
          </Button>
        </div>
      ) : null}

      <Link href="/checkout" className="block">
        <Button className="w-full">{labels.checkout}</Button>
      </Link>
    </aside>
  );
}
