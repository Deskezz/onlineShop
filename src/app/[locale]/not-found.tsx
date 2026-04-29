import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const tCommon = await getTranslations('common');

  return (
    <section className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <p className="mb-3 rounded-full border border-border-color px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{tCommon('error')}</h1>
      <p className="mt-3 max-w-md text-sm text-foreground-secondary">{tCommon('noResults')}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-[var(--radius-button)] bg-accent px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {tCommon('home')}
        </Link>
        <Link
          href="/catalog"
          className="rounded-[var(--radius-button)] border border-border-color px-4 py-2 text-sm font-medium transition-colors hover:bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {tCommon('catalog')}
        </Link>
      </div>
    </section>
  );
}
