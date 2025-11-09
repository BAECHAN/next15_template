import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  message: string;
  children?: ReactNode;
  className?: string;
}

export function ErrorDisplay({ message, children, className }: ErrorDisplayProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      <p className="text-lg font-medium text-destructive mb-2">{message}</p>
      {children}
    </div>
  );
}
