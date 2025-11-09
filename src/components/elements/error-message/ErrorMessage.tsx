import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function ErrorMessage({ children, className, ...props }: ErrorMessageProps) {
  if (!children) return null;
  return (
    <p className={cn('text-sm text-destructive mt-1', className)} {...props}>
      {children}
    </p>
  );
}
