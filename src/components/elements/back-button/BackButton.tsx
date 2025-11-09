import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function BackButton({ onClick, children = '뒤로 가기', className }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors',
        className
      )}
    >
      <ChevronLeft className="w-4 h-4" />
      {children}
    </button>
  );
}
