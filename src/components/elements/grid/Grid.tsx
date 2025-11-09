import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
  children: ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

export function Grid({
  children,
  columns,
  className,
  ...props
}: GridProps & React.HTMLAttributes<HTMLDivElement>) {
  const gridColsClass = cn(
    'grid gap-4',
    columns?.sm &&
      {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
      }[columns.sm],
    columns?.md &&
      {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
      }[columns.md],
    columns?.lg &&
      {
        1: 'lg:grid-cols-1',
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
      }[columns.lg],
    className
  );

  return (
    <div className={gridColsClass} {...props}>
      {children}
    </div>
  );
}
