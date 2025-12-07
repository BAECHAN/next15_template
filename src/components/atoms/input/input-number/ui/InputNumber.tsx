'use client';

import * as React from 'react';
import { Input, type InputProps } from '@/components/atoms/input/Input';
import { useInputNumber } from '@/components/atoms/input/input-number/hooks/useInputNumber';

export interface NumberInputProps extends Omit<InputProps, 'type' | 'onChange' | 'value'> {
  value?: number | string;
  onChange?: (value: number | '') => void;
  defaultValue?: number | string;
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
      value: controlledValue,
      onChange,
      defaultValue,
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
    // Controlled vs Uncontrolled
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<number | string>(defaultValue ?? '');

    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = React.useCallback(
      (newValue: number | '') => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );

    const { handleChange: hookHandleChange, handleKeyDown: hookHandleKeyDown } = useInputNumber({
      min,
      max,
      allowDecimals,
      allowNegative,
      onChange: handleChange,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      hookHandleChange(e);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      hookHandleKeyDown(e);
      onKeyDown?.(e);
    };

    const displayValue =
      currentValue === '' || currentValue === undefined || currentValue === null
        ? ''
        : String(currentValue);

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className={className}
        {...props}
      />
    );
  }
);

InputNumber.displayName = 'InputNumber';

export { InputNumber };
export type { NumberInputProps as InputNumberProps };
