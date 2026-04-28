'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui';

interface CheckoutSuccessProps {
  orderNumber: string;
  labels: {
    title: string;
    description: string;
    orderNumber: string;
    viewOrders: string;
    backToShop: string;
  };
}

export function CheckoutSuccess({ orderNumber, labels }: CheckoutSuccessProps) {
  return (
    <div className="mx-auto max-w-xl rounded-[var(--radius-card)] border border-border-color bg-background-secondary p-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="mb-4 inline-flex rounded-full bg-success/10 p-3"
      >
        <CheckCircle2 className="h-10 w-10 text-success" />
      </motion.div>
      <h1 className="text-3xl font-semibold tracking-tight">{labels.title}</h1>
      <p className="mt-2 text-foreground-secondary">{labels.description}</p>
      <p className="mt-4 text-sm text-foreground-secondary">
        {labels.orderNumber}: <span className="font-semibold text-foreground">{orderNumber}</span>
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href="/profile">
          <Button>{labels.viewOrders}</Button>
        </Link>
        <Link href="/catalog">
          <Button variant="outline">{labels.backToShop}</Button>
        </Link>
      </div>
    </div>
  );
}
