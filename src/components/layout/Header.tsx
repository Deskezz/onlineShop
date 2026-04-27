'use client';

import * as React from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { MobileMenu } from './MobileMenu';

const NAV_LINKS = [
  { href: '/catalog', labelKey: 'catalog' },
];

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header if scrolling up or at the very top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } 
      // Hide header if scrolling down and passed 50px
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        'sticky top-0 z-30 w-full border-b border-border-color bg-background/80 backdrop-blur-md transition-transform duration-300',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileMenu />
          <Link href="/" className="font-heading font-bold text-xl tracking-tight hidden md:block">
            {t('appName')}
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-foreground',
                  isActive ? 'text-foreground' : 'text-foreground-secondary'
                )}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search Button (to trigger modal later) */}
          <Button variant="ghost" size="icon" aria-label={t('search')} className="hidden sm:flex rounded-full">
            <Search className="h-5 w-5" />
          </Button>

          <div className="hidden md:flex items-center gap-1 border-r border-border-color pr-2 mr-1">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          <Link href="/profile" tabIndex={-1}>
            <Button variant="ghost" size="icon" aria-label={t('profile')} className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/cart" tabIndex={-1}>
            <Button variant="ghost" size="icon" aria-label={t('cart')} className="relative rounded-full">
              <ShoppingBag className="h-5 w-5" />
              {/* Badge placeholder - will be connected to store later */}
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-accent"></span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
