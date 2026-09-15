import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number;
  className?: string;
  barClassName?: string;
}

export function ProgressBar({ value, className, barClassName }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={clsx('h-2 w-full overflow-hidden rounded-full bg-slate-100', className)}>
      <div
        className={clsx('h-full rounded-full bg-indigo-600 transition-all', barClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
