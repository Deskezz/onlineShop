import * as React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
  showCount?: boolean;
  count?: number;
}

export function Rating({
  value,
  max = 5,
  size = 16,
  showCount = false,
  count = 0,
  className,
  ...props
}: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  return (
    <div className={cn('flex items-center gap-1.5', className)} {...props}>
      <div className="flex text-warning">
        {Array.from({ length: max }).map((_, i) => {
          if (i < fullStars) {
            return (
              <Star
                key={i}
                size={size}
                className="fill-current text-warning"
              />
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <StarHalf
                key={i}
                size={size}
                className="fill-current text-warning"
              />
            );
          } else {
            return (
              <Star
                key={i}
                size={size}
                className="text-border-color"
              />
            );
          }
        })}
      </div>
      {showCount && count > 0 && (
        <span className="text-xs text-foreground-secondary ml-1">
          ({count})
        </span>
      )}
    </div>
  );
}
