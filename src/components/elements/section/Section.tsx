import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function Section({ title, description, children, className, ...props }: SectionProps) {
  return (
    <section className={cn('space-y-4', className)} {...props}>
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      {description && <p className="text-muted-foreground">{description}</p>}
      {children}
    </section>
  );
}
