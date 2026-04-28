import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LOCALES } from '@/lib/constants';
import { productReviews, products, productSpecs } from '@/data';
import type { Badge, Locale } from '@/lib/types';
import {
  getProductReviews,
  getProductSpecs,
  getProductVariants,
} from '@/components/product/product-fallbacks';
import {
  ProductDetailsClient,
  ProductGallery,
  ProductReviews,
  ProductSpecs,
  RelatedProducts,
} from '@/components/product';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const resolvedLocale: Locale = LOCALES.includes(locale as Locale) ? (locale as Locale) : 'ru';
  const tCommon = await getTranslations('common');
  const tCart = await getTranslations('cart');
  const tProduct = await getTranslations('product');
  const tBadges = await getTranslations('badges');

  const productWithVariants = {
    ...product,
    variants: getProductVariants(product),
  };
  const specs = getProductSpecs(product, productSpecs[product.id] ?? []);
  const reviews = getProductReviews(product, productReviews[product.id] ?? []);
  const relatedProducts = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);

  const badgeLabels: Record<Badge, string> = {
    new: tBadges('new'),
    sale: tBadges('sale'),
    bestseller: tBadges('bestseller'),
    limited: tBadges('limited'),
  };

  return (
    <div className="container mx-auto space-y-8 px-4 py-8 md:space-y-10 md:py-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name[resolvedLocale]} />
        <ProductDetailsClient
          product={productWithVariants}
          locale={resolvedLocale}
          labels={{
            addToCart: tCommon('addToCart'),
            addToFavorites: tCommon('addToFavorites'),
            removeFromFavorites: tCommon('removeFromFavorites'),
            quantity: tProduct('quantity'),
            inStock: tCommon('inStock'),
            outOfStock: tCommon('outOfStock'),
            itemAdded: tCart('itemAdded'),
          }}
        />
      </div>

      <ProductSpecs title={tProduct('specifications')} specs={specs} locale={resolvedLocale} />
      <ProductReviews
        title={tProduct('reviews')}
        verifiedLabel={tProduct('verifiedPurchase')}
        reviews={reviews}
        locale={resolvedLocale}
      />
      <RelatedProducts
        title={tProduct('relatedProducts')}
        products={relatedProducts}
        locale={resolvedLocale}
        labels={{
          inStock: tCommon('inStock'),
          outOfStock: tCommon('outOfStock'),
          addToCart: tCommon('addToCart'),
        }}
        badgeLabels={badgeLabels}
      />
    </div>
  );
}
