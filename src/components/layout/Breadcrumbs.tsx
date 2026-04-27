'use client';

import * as React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations('common');

  const segments = pathname
    .split('/')
    .filter((segment) => segment !== '');

  if (segments.length === 0) {
    return null;
  }

  // To build cumulative paths
  let currentPath = '';

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm text-foreground-secondary overflow-x-auto whitespace-nowrap scrollbar-hide">
        <li>
          <Link
            href="/"
            className="flex items-center hover:text-foreground transition-colors"
            aria-label={t('home')}
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        
        {segments.map((segment, index) => {
          currentPath += `/${segment}`;
          const isLast = index === segments.length - 1;
          
          // Try to translate segment, fallback to capitalized segment name
          let label = segment;
          try {
            // Very naive translation approach for demo:
            // if segment is 'catalog', it translates. If it's a dynamic ID, it might fail.
            // We use a safe wrapper or assume English fallback if not found.
            // For a production app, you'd fetch the product name from an API.
            label = segment.charAt(0).toUpperCase() + segment.slice(1);
            if (segment === 'catalog') label = t('catalog');
            if (segment === 'profile') label = t('profile');
            if (segment === 'cart') label = t('cart');
          } catch (e) {
            // Ignore
          }

          return (
            <React.Fragment key={currentPath}>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 opacity-50" />
              </li>
              <li>
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={currentPath}
                    className="hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
