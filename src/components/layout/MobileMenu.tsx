'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui';
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
        variant="ghost"
        size="icon"
        className="md:hidden w-10 h-10"
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
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-sm bg-background border-r border-border-color shadow-xl md:hidden flex flex-col"
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

              <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 rounded-md text-lg font-medium transition-colors ${
                        isActive
                          ? 'bg-background-secondary text-foreground'
                          : 'text-foreground-secondary hover:bg-background-secondary hover:text-foreground'
                      }`}
                    >
                      {t(link.labelKey)}
                    </Link>
                  );
                })}
              </div>

              <div className="p-4 border-t border-border-color flex items-center justify-between gap-4">
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
