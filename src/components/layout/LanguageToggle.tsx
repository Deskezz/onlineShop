'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui';

export function LanguageToggle() {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'ru' ? 'en' : 'ru';
    // router.replace will change the locale in the URL without pushing a new history entry
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9 font-semibold uppercase text-sm rounded-full"
      onClick={toggleLanguage}
      aria-label={t('language')}
    >
      {locale === 'ru' ? 'en' : 'ru'}
    </Button>
  );
}
