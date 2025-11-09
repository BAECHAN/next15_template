import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FormGroup({ children, className, ...props }: FormGroupProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      {children}
    </div>
  );
}
