import type { Locale, Review } from '@/lib/types';
import { Rating, Badge } from '@/components/ui';

interface ProductReviewsProps {
  title: string;
  verifiedLabel: string;
  reviews: Review[];
  locale: Locale;
}

export function ProductReviews({
  title,
  verifiedLabel,
  reviews,
  locale,
}: ProductReviewsProps) {
  if (reviews.length === 0) return null;

  return (
    <section className="space-y-4 rounded-[var(--radius-card)] border border-border-color bg-background-secondary p-5">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <article key={review.id} className="space-y-2 rounded-[var(--radius-button)] border border-border-color p-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-medium">{review.author}</p>
              <Rating value={review.rating} />
              {review.verified ? <Badge variant="outline">{verifiedLabel}</Badge> : null}
            </div>
            <p className="text-sm text-foreground-secondary">
              {new Date(review.date).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US')}
            </p>
            <p>{review.text[locale]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
