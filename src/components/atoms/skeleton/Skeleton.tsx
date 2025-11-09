import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200/60 dark:bg-gray-800/60', className)}
      {...props}
    />
  );
}

export { Skeleton };

