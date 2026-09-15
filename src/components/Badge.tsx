import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'muted';
  className?: string;
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-slate-100 text-slate-700',
  accent: 'bg-indigo-50 text-indigo-700',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-rose-50 text-rose-700',
  muted: 'bg-slate-50 text-slate-500',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
