'use client';

import * as React from 'react';
import { Input, type InputProps } from './Input';
import { useInputNumber } from '@/components/atoms/Input/hooks/useInputNumber';

export interface NumberInputProps extends Omit<InputProps, 'type' | 'onChange' | 'value'> {
  value?: number | string;
  onChange?: (value: number | '') => void;
  min?: number;
  max?: number;
  step?: number;
  allowDecimals?: boolean;
  allowNegative?: boolean;
}

const InputNumber = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      value,
      onChange,
      min,
      max,
      step = 1,
      allowDecimals = false,
      allowNegative = false,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const { handleChange: hookHandleChange, handleKeyDown: hookHandleKeyDown } = useInputNumber({
      min,
      max,
      allowDecimals,
      allowNegative,
      onChange,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      hookHandleChange(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      hookHandleKeyDown(e);
      onKeyDown?.(e);
    };

    const displayValue = value === '' || value === undefined ? '' : String(value);

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={className}
        {...props}
      />
    );
  }
);

InputNumber.displayName = 'InputNumber';

export { InputNumber };
export type { NumberInputProps as InputNumberProps };
