'use client';

import { ReactNode } from 'react';
import {
  Dialog as DialogPrimitive,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/atoms/dialog/Dialog';
import { Button } from '@/components/atoms/button/Button';
import { cn } from '@/lib/utils';

export { useDialog } from '@/components/atoms/dialog/hooks/useDialog';
export { useDialogStack } from '@/components/atoms/dialog/hooks/useDialogStack';

interface DialogWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
};

export function DialogWrapper({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  contentClassName,
  size = 'md',
}: DialogWrapperProps) {
  return (
    <DialogPrimitive open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('max-w-lg', sizeClasses[size], contentClassName)}>
        <DialogHeader className={className}>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 pt-4 border-t">{footer}</div>}
      </DialogContent>
    </DialogPrimitive>
  );
}

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'default' | 'danger';
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  variant = 'default',
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <DialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button variant={variant === 'danger' ? 'danger' : 'default'} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </>
      }
    >
      <></>
    </DialogWrapper>
  );
}

