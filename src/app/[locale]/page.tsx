import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('hero');

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
      <h1 className="text-4xl md:text-6xl font-heading mb-4">{t('title')}</h1>
      <p className="text-lg md:text-xl text-foreground-secondary mb-8">{t('subtitle')}</p>
      <button className="bg-accent text-background px-6 py-3 rounded-[var(--radius-button)] font-medium hover:opacity-90 transition-opacity">
        {t('cta')}
      </button>
    </main>
  );
}
