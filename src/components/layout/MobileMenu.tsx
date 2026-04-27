'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useScrollLock } from '@/hooks/useScrollLock';

const NAV_LINKS = [
  { href: '/', labelKey: 'home' },
  { href: '/catalog', labelKey: 'catalog' },
  { href: '/profile', labelKey: 'profile' },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = useTranslations('common');
  const pathname = usePathname();

  useScrollLock(isOpen);

  // Close menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full border-border-color bg-background-secondary md:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 flex h-dvh w-[82vw] max-w-[320px] flex-col border-r border-border-color bg-background-secondary shadow-xl md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border-color">
                <span className="font-heading font-bold text-xl tracking-tight">
                  {t('appName')}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label={t('close')}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'block rounded-[var(--radius-button)] border px-4 py-3 text-base font-medium transition-colors',
                        {
                          'border-foreground/20 bg-background text-foreground': isActive,
                          'border-transparent bg-transparent text-foreground hover:border-border-color hover:bg-background hover:text-foreground':
                            !isActive,
                        }
                      )}
                    >
                      {t(link.labelKey)}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border-color p-4">
                <div className="flex gap-2">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
