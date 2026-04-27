'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const toast = React.useCallback((options: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...options, id, type: options.type || 'info', duration: options.duration || 5000 };
    
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, newToast.duration);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-0 right-0 z-50 p-4 md:p-6 flex flex-col gap-2 max-w-[400px] w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={cn(
                'pointer-events-auto relative flex w-full items-start gap-3 rounded-[var(--radius-card)] border bg-background p-4 shadow-lg',
                t.type === 'success' && 'border-success/20',
                t.type === 'error' && 'border-error/20',
                t.type === 'info' && 'border-border-color'
              )}
            >
              {t.type === 'success' && <CheckCircle2 className="h-5 w-5 text-success shrink-0" />}
              {t.type === 'error' && <AlertCircle className="h-5 w-5 text-error shrink-0" />}
              {t.type === 'info' && <Info className="h-5 w-5 text-info shrink-0" />}
              
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-foreground">{t.title}</p>
                {t.description && (
                  <p className="text-sm text-foreground-secondary">{t.description}</p>
                )}
              </div>
              
              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 rounded-md p-1 opacity-50 hover:bg-background-secondary hover:opacity-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
