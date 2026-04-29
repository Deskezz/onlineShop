'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useThemeStore } from '@/stores/themeStore';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { Button } from '@/components/ui';

export function ThemeToggle() {
  const t = useTranslations('common');
  const theme = useHydratedStore(useThemeStore, (state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  if (theme === undefined) {
    return <Button variant="ghost" size="icon" className="w-9 h-9" disabled />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9 rounded-full"
      onClick={toggleTheme}
      aria-label={t('theme')}
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
    </Button>
  );
}
