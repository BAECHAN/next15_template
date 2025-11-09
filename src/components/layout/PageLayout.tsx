'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function PageLayout({ title, description, children, className }: PageLayoutProps) {
  return (
    <div className={cn('max-w-[1200px] mx-auto p-8', className)}>
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-base text-gray-600">{description}</p>}
      </header>
      <main className="w-full">{children}</main>
    </div>
  );
}
