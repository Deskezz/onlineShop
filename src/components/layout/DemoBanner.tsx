import { useTranslations } from 'next-intl';

export function DemoBanner() {
  const t = useTranslations('common');

  return (
    <div className="bg-accent text-background text-xs sm:text-sm font-medium py-1.5 px-4 text-center">
      {t('demo')}
    </div>
  );
}
