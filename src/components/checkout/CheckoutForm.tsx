'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from '@/i18n/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { useCartStore, useOrdersStore } from '@/stores';
import { Button, Input, useToast } from '@/components/ui';
import type { Product } from '@/lib/types';
import { calculateCartTotals, createOrder } from './checkout-utils';

interface CheckoutFormProps {
  products: Product[];
  defaults: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  labels: {
    title: string;
    step1: string;
    step2: string;
    step3: string;
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
    cardNumber: string;
    cardHolder: string;
    cashOnDelivery: string;
    payByCard: string;
    next: string;
    prev: string;
    placeOrder: string;
    orderPlaced: string;
    demoNotice: string;
    empty: string;
    continueShopping: string;
  };
}

const fullSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  address: z.string().min(4),
  city: z.string().min(2),
  zipCode: z.string().min(3),
  country: z.string().min(2),
  paymentType: z.enum(['card', 'cash']),
  cardNumber: z.string().optional(),
  cardHolder: z.string().optional(),
});
const shippingSchema = fullSchema.pick({
  fullName: true,
  phone: true,
  email: true,
  address: true,
  city: true,
  zipCode: true,
  country: true,
});
const paymentSchema = fullSchema
  .pick({ paymentType: true, cardNumber: true, cardHolder: true })
  .superRefine((data, ctx) => {
    if (data.paymentType === 'card') {
      if (!data.cardNumber || data.cardNumber.replace(/\s+/g, '').length < 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardNumber'],
          message: 'Invalid card number',
        });
      }
      if (!data.cardHolder || data.cardHolder.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardHolder'],
          message: 'Invalid card holder',
        });
      }
    }
  });

type FormData = z.infer<typeof fullSchema>;

export function CheckoutForm({ products, defaults, labels }: CheckoutFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const items = useHydratedStore(useCartStore, (state) => state.items) ?? [];
  const promoCode = useHydratedStore(useCartStore, (state) => state.promoCode);
  const clearCart = useHydratedStore(useCartStore, (state) => state.clearCart);
  const addOrder = useHydratedStore(useOrdersStore, (state) => state.addOrder);

  const totals = useMemo(
    () => calculateCartTotals(items, products, promoCode),
    [items, products, promoCode]
  );

  const form = useForm<FormData>({
    defaultValues: {
      ...defaults,
      paymentType: 'card',
      cardNumber: '4242 4242 4242 4242',
      cardHolder: defaults.fullName.toUpperCase(),
    },
  });

  if (!clearCart || !addOrder) return null;

  if (items.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] border border-border-color bg-background-secondary p-6 text-center">
        <p className="mb-4">{labels.empty}</p>
        <Button onClick={() => router.push('/catalog')}>{labels.continueShopping}</Button>
      </div>
    );
  }

  const paymentType = form.watch('paymentType');

  const goNext = async () => {
    const values = form.getValues();
    const result =
      step === 1 ? shippingSchema.safeParse(values) : paymentSchema.safeParse(values);
    const ok = result.success;
    if (ok) setStep((s) => Math.min(3, s + 1));
  };

  const onPlaceOrder = form.handleSubmit((data) => {
    const finalCheck = fullSchema.safeParse(data);
    if (!finalCheck.success) {
      return;
    }
    const order = createOrder({
      items,
      total: totals.total,
      discount: totals.discount,
      promoCode,
      shippingAddress: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        country: data.country,
      },
      paymentMethod:
        data.paymentType === 'cash'
          ? { type: 'cash' }
          : { type: 'card', cardNumber: maskCard(data.cardNumber ?? ''), cardHolder: data.cardHolder },
    });

    addOrder(order);
    clearCart();
    toast({ type: 'success', title: labels.orderPlaced });
    router.push({
      pathname: '/checkout-success',
      query: { orderNumber: order.orderNumber },
    });
  });

  return (
    <form className="space-y-6" onSubmit={onPlaceOrder}>
      <Steps current={step} labels={[labels.step1, labels.step2, labels.step3]} />
      <div className="rounded-[var(--radius-card)] border border-border-color bg-background-secondary p-5">
        {step === 1 ? (
          <ShippingFields form={form} labels={labels} />
        ) : step === 2 ? (
          <PaymentFields form={form} labels={labels} paymentType={paymentType} />
        ) : (
          <ConfirmBlock data={form.getValues()} totals={totals.total} />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
            {labels.prev}
          </Button>
        ) : null}
        {step < 3 ? (
          <Button type="button" onClick={goNext}>
            {labels.next}
          </Button>
        ) : (
          <Button type="submit">{labels.placeOrder}</Button>
        )}
      </div>

      <div className="flex items-start gap-2 rounded-[var(--radius-button)] border border-warning/30 bg-warning/10 p-3 text-sm">
        <AlertCircle className="mt-0.5 h-4 w-4 text-warning" />
        <p>{labels.demoNotice}</p>
      </div>
    </form>
  );
}

function ShippingFields({ form, labels }: { form: ReturnType<typeof useForm<FormData>>; labels: CheckoutFormProps['labels'] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label={labels.fullName}>
        <Input placeholder={labels.fullName} {...form.register('fullName')} />
      </Field>
      <Field label={labels.phone}>
        <Input placeholder={labels.phone} {...form.register('phone')} />
      </Field>
      <Field label={labels.email}>
        <Input placeholder={labels.email} {...form.register('email')} />
      </Field>
      <Field label={labels.city}>
        <Input placeholder={labels.city} {...form.register('city')} />
      </Field>
      <Field label={labels.address} className="sm:col-span-2">
        <Input placeholder={labels.address} className="sm:col-span-2" {...form.register('address')} />
      </Field>
      <Field label={labels.zipCode}>
        <Input placeholder={labels.zipCode} {...form.register('zipCode')} />
      </Field>
      <Field label={labels.country}>
        <Input placeholder={labels.country} {...form.register('country')} />
      </Field>
    </div>
  );
}

function PaymentFields({
  form,
  labels,
  paymentType,
}: {
  form: ReturnType<typeof useForm<FormData>>;
  labels: CheckoutFormProps['labels'];
  paymentType: FormData['paymentType'];
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant={paymentType === 'card' ? 'default' : 'outline'} onClick={() => form.setValue('paymentType', 'card')}>
          {labels.payByCard}
        </Button>
        <Button type="button" variant={paymentType === 'cash' ? 'default' : 'outline'} onClick={() => form.setValue('paymentType', 'cash')}>
          {labels.cashOnDelivery}
        </Button>
      </div>
      {paymentType === 'card' ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={labels.cardNumber} className="sm:col-span-2">
            <Input placeholder={labels.cardNumber} className="sm:col-span-2" {...form.register('cardNumber')} />
          </Field>
          <Field label={labels.cardHolder} className="sm:col-span-2">
            <Input placeholder={labels.cardHolder} className="sm:col-span-2" {...form.register('cardHolder')} />
          </Field>
        </div>
      ) : null}
    </div>
  );
}

function ConfirmBlock({ data, totals }: { data: FormData; totals: number }) {
  return (
    <div className="space-y-3 text-sm">
      <p className="font-medium">{data.fullName}</p>
      <p>{data.address}</p>
      <p>{data.city}</p>
      <p>{data.phone}</p>
      <div className="border-t border-border-color pt-2 font-semibold">
        <CheckCircle2 className="mr-2 inline h-4 w-4 text-success" />
        {totals}
      </div>
    </div>
  );
}

function Steps({ current, labels }: { current: number; labels: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {labels.map((label, index) => {
        const step = index + 1;
        return (
          <div
            key={label}
            className={`min-w-0 rounded-[var(--radius-button)] border px-2 py-2 text-center text-xs leading-tight sm:px-3 sm:text-sm ${
              current === step
                ? 'border-accent bg-background-secondary font-medium'
                : 'border-border-color text-foreground-secondary'
            }`}
          >
            <span className="block break-words">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-1 block text-xs font-medium text-foreground-secondary">{label}</span>
      {children}
    </label>
  );
}

function maskCard(card: string): string {
  const digits = card.replace(/\s+/g, '');
  const last4 = digits.slice(-4);
  return `**** **** **** ${last4 || '0000'}`;
}
