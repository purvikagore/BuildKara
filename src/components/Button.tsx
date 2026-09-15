import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-indigo-600',
  secondary:
    'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus-visible:outline-slate-400',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-400',
  danger: 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 focus-visible:outline-rose-500',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
