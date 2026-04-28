'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeImages = images.length > 0 ? images : ['/assets/products/iphone-16.jpg'];

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-border-color bg-background-secondary">
        <div className="relative aspect-square">
          <Image
            src={safeImages[activeIndex]}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {safeImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-2">
          {safeImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={cn(
                'relative overflow-hidden rounded-[var(--radius-button)] border',
                {
                  'border-accent': activeIndex === index,
                  'border-border-color': activeIndex !== index,
                }
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`${alt} ${index + 1}`}
            >
              <div className="relative aspect-square">
                <Image src={image} alt={`${alt} ${index + 1}`} fill className="object-cover" />
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
