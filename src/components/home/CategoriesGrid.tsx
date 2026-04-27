import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Category, Locale } from '@/lib/types';
import { Card, CardContent } from '@/components/ui';

interface CategoriesGridProps {
  title: string;
  locale: Locale;
  categories: Category[];
}

export function CategoriesGrid({ title, locale, categories }: CategoriesGridProps) {
  return (
    <section className="container mx-auto px-4 py-14 md:py-16">
      <div className="mb-6 md:mb-8">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={{ pathname: '/catalog', query: { category: category.slug } }}>
            <Card className="group h-full overflow-hidden border-border-color bg-background-secondary transition-colors hover:border-foreground-secondary">
              <div className="relative aspect-[16/10]">
                <Image
                  src={category.image}
                  alt={category.name[locale]}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardContent className="space-y-2 p-5 pt-5">
                <h3 className="text-lg font-semibold tracking-tight">{category.name[locale]}</h3>
                <p className="text-sm text-foreground-secondary">{category.description[locale]}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
