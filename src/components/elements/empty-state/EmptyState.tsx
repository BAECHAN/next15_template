import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  children: ReactNode;
  className?: string;
}

export function EmptyState({ children, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center text-muted-foreground',
        className
      )}
    >
      {children}
    </div>
  );
}
