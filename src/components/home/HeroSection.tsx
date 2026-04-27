import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
}

export function HeroSection({ title, subtitle, ctaLabel }: HeroSectionProps) {
  return (
    <section className="container mx-auto px-4 pt-8 md:pt-12">
      <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-border-color bg-background-secondary md:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 md:p-10 lg:p-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="max-w-xl text-base text-foreground-secondary sm:text-lg">{subtitle}</p>
          <div>
            <Link href="/catalog">
              <Button size="lg">{ctaLabel}</Button>
            </Link>
          </div>
        </div>

        <div className="relative min-h-[280px] md:min-h-[440px]">
          <Image
            src="/assets/products/IPhone-17-Pro.jpg"
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
