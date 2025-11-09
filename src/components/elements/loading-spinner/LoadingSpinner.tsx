'use client';

import { BeatLoader } from 'react-spinners';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LoadingSpinner({ size = 15, color = '#2563eb', className }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex items-center justify-center p-4', className)}>
      <BeatLoader color={color} size={size} />
    </div>
  );
}
