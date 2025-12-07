import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ElementType, ComponentPropsWithoutRef, createElement } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg',
        primary:
          'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg',
        destructive:
          'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg',
        danger:
          'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg',
        outline:
          'border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md',
        secondary:
          'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 shadow-sm hover:shadow-md',
        ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
        link: 'text-blue-600 underline-offset-4 hover:underline hover:text-blue-700',
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
