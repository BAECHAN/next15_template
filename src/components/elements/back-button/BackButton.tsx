import { Button, type ButtonProps } from '@/components/atoms/button/Button';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps extends Omit<ButtonProps, 'children' | 'variant' | 'size'> {
  children?: React.ReactNode;
}

export function BackButton({
  onClick,
  children = '뒤로 가기',
  className,
  ...props
}: BackButtonProps) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick} className={className} {...props}>
      <ChevronLeft className="w-4 h-4" />
      {children}
    </Button>
  );
}
