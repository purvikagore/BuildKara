import { clsx } from 'clsx';
import type { User } from '../types';

interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
};

export function Avatar({ user, size = 'md' }: AvatarProps) {
  return (
    <div
      className={clsx(
        'flex shrink-0 items-center justify-center rounded-full font-semibold',
        sizes[size],
        user.colorClass,
      )}
      title={user.name}
    >
      {user.initials}
    </div>
  );
}
