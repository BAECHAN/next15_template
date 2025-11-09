'use client';

import * as React from 'react';
import { Input, type InputProps } from './Input';

export interface NumberInputProps extends Omit<InputProps, 'type' | 'onChange' | 'value'> {
  value?: number | string;
  onChange?: (value: number | '') => void;
  min?: number;
  max?: number;
  step?: number;
  allowDecimals?: boolean;
  allowNegative?: boolean;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // 빈 값 허용
      if (inputValue === '') {
        onChange?.('');
        return;
      }

      // 숫자만 허용 (소수점 및 음수 처리)
      let numericValue = inputValue;
      if (!allowDecimals) {
        numericValue = numericValue.replace(/\./g, '');
      }
      if (!allowNegative) {
        numericValue = numericValue.replace(/-/g, '');
      }

      // 숫자만 추출
      const numberPattern = allowDecimals
        ? allowNegative
          ? /^-?\d*\.?\d*$/
          : /^\d*\.?\d*$/
        : allowNegative
          ? /^-?\d*$/
          : /^\d*$/;

      if (!numberPattern.test(numericValue)) {
        return; // 유효하지 않은 입력 무시
      }

      const numValue = numericValue === '' || numericValue === '-' ? '' : Number(numericValue);

      // min/max 검증
      if (numValue !== '' && typeof numValue === 'number') {
        if (min !== undefined && numValue < min) {
          return;
        }
        if (max !== undefined && numValue > max) {
          return;
        }
      }

      onChange?.(numValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // 숫자, 백스페이스, Delete, 화살표 키, Tab, Enter 등은 허용
      if (
        /[0-9]/.test(e.key) ||
        [
          'Backspace',
          'Delete',
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Tab',
          'Enter',
        ].includes(e.key)
      ) {
        onKeyDown?.(e);
        return;
      }

      // 소수점 허용
      if (allowDecimals && e.key === '.') {
        const currentValue = (e.currentTarget.value || '').toString();
        if (!currentValue.includes('.')) {
          onKeyDown?.(e);
          return;
        }
      }

      // 음수 허용
      if (allowNegative && e.key === '-') {
        const currentValue = (e.currentTarget.value || '').toString();
        if (
          !currentValue.includes('-') &&
          (e.currentTarget.selectionStart === 0 || !currentValue)
        ) {
          onKeyDown?.(e);
          return;
        }
      }

      // Ctrl/Cmd + A, C, V, X 허용
      if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
        onKeyDown?.(e);
        return;
      }

      // 그 외 키는 차단
      e.preventDefault();
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

NumberInput.displayName = 'NumberInput';

export { NumberInput };
