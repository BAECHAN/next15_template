import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ElementType, ComponentPropsWithoutRef, createElement } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonOwnProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  as?: ElementType;
  fullWidth?: boolean;
}

type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps> & {
    as?: T;
  };

function Button<T extends ElementType = 'button'>({
  className,
  variant,
  size,
  asChild = false,
  as,
  fullWidth,
  children,
  ...props
}: ButtonProps<T>) {
  // 기존 API 호환성: variant="primary" → variant="default"
  const mappedVariant = variant === 'primary' ? 'default' : variant;
  // 기존 API 호환성: variant="danger" → variant="destructive"
  const finalVariant = mappedVariant === 'danger' ? 'destructive' : mappedVariant;
  // 기존 API 호환성: size="md" → size="default"
  const finalSize = size === 'md' ? 'default' : size;

  const Comp = asChild ? Slot : as || 'button';

  return createElement(
    Comp,
    {
      className: cn(
        buttonVariants({ variant: finalVariant, size: finalSize }),
        fullWidth && 'w-full',
        className
      ),
      ...props,
    } as any,
    children
  );
}
Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
