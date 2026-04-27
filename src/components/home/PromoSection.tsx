import { Link } from '@/i18n/navigation';
import { Button, Card, CardContent } from '@/components/ui';

interface PromoSectionProps {
  title: string;
  description: string;
  code: string;
  ctaLabel: string;
}

export function PromoSection({ title, description, code, ctaLabel }: PromoSectionProps) {
  return (
    <section className="container mx-auto px-4 pb-16 md:pb-20">
      <Card className="overflow-hidden border-border-color bg-background-secondary">
        <CardContent className="grid gap-8 p-6 pt-6 md:grid-cols-[1fr_auto] md:items-center md:p-10 md:pt-10">
          <div className="space-y-3">
            <p className="inline-flex rounded-[var(--radius-badge)] bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-background">
              {code}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
            <p className="max-w-xl text-foreground-secondary">{description}</p>
          </div>
          <div>
            <Link href="/catalog">
              <Button size="lg">{ctaLabel}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
