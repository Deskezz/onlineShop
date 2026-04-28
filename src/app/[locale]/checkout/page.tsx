import { getTranslations, setRequestLocale } from 'next-intl/server';
import { demoUser, products } from '@/data';
import { CheckoutForm } from '@/components/checkout';

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('checkout');
  const tCart = await getTranslations('cart');

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">{t('title')}</h1>
      <CheckoutForm
        products={products}
        defaults={{
          fullName: demoUser.name,
          phone: '+7 (999) 555-44-33',
          email: demoUser.email,
          address: 'ул. Тверская, 12',
          city: 'Москва',
          zipCode: '125009',
          country: 'Россия',
        }}
        labels={{
          title: t('title'),
          step1: t('step1'),
          step2: t('step2'),
          step3: t('step3'),
          fullName: t('fullName'),
          phone: t('phone'),
          email: t('email'),
          address: t('address'),
          city: t('city'),
          zipCode: t('zipCode'),
          country: t('country'),
          cardNumber: t('cardNumber'),
          cardHolder: t('cardHolder'),
          cashOnDelivery: t('cashOnDelivery'),
          payByCard: t('payByCard'),
          next: t('next'),
          prev: t('prev'),
          placeOrder: t('placeOrder'),
          orderPlaced: t('orderPlaced'),
          demoNotice: t('demoNotice'),
          empty: tCart('empty'),
          continueShopping: tCart('continueShopping'),
        }}
      />
    </div>
  );
}
