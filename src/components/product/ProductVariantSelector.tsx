import type { Locale, ProductVariant } from '@/lib/types';
import { Button } from '@/components/ui';

interface ProductVariantSelectorProps {
  variants: ProductVariant[] | undefined;
  locale: Locale;
  selectedByType: Record<'color' | 'storage', string | undefined>;
  onSelect: (type: 'color' | 'storage', key: string) => void;
}

export function ProductVariantSelector({
  variants,
  locale,
  selectedByType,
  onSelect,
}: ProductVariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-3">
      {(['color', 'storage'] as const).map((group) => {
        const groupVariants = variants.filter((variant) => variant.type === group);
        if (groupVariants.length === 0) return null;
        return (
          <div key={group} className="space-y-2">
            <p className="text-sm font-medium">{groupVariants[0].label[locale]}</p>
            <div className="flex flex-wrap gap-2">
              {groupVariants.map((variant) => (
                <Button
                  key={variant.key}
                  size="sm"
                  variant={selectedByType[group] === variant.key ? 'default' : 'outline'}
                  onClick={() => onSelect(group, variant.key)}
                >
                  {variant.value}
                </Button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
