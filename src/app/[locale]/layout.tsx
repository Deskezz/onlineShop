import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { LOCALES } from '@/lib/constants';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ToastProvider } from '@/components/ui';
import { DemoBanner } from '@/components/layout/DemoBanner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter-tight',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://techhaven-demo.local'),
  title: {
    default: 'TechHaven',
    template: '%s | TechHaven',
  },
  description: 'TechHaven Electronics Store Demo',
  openGraph: {
    title: 'TechHaven',
    description: 'TechHaven Electronics Store Demo',
    type: 'website',
    images: ['/assets/products/IPhone-17-Pro.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechHaven',
    description: 'TechHaven Electronics Store Demo',
    images: ['/assets/products/IPhone-17-Pro.jpg'],
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${interTight.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ToastProvider>
              <DemoBanner />
              <Header />
              <main className="flex-grow flex flex-col">
                {children}
              </main>
              <Footer />
            </ToastProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
