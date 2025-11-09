'use client';

import { useState, useCallback, ChangeEvent } from 'react';

interface UseInputNumberOptions {
  initialValue?: number | string;
  min?: number;
  max?: number;
  allowDecimals?: boolean;
  allowNegative?: boolean;
  onChange?: (value: number | '') => void;
}

/**
 * 숫자 입력을 관리하는 커스텀 훅
 *
 * @example
 * ```tsx
 * const { value, setValue, handleChange, handleKeyDown } = useInputNumber({
 *   min: 0,
 *   max: 100,
 *   allowDecimals: false,
 * });
 *
 * return (
 *   <Input
 *     value={value}
 *     onChange={handleChange}
 *     onKeyDown={handleKeyDown}
 *   />
 * );
 * ```
 */
export function useInputNumber({
  initialValue = '',
  min,
  max,
  allowDecimals = false,
  allowNegative = false,
  onChange,
}: UseInputNumberOptions = {}) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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
    },
    [min, max, allowDecimals, allowNegative, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        return;
      }

      // 소수점 허용
      if (allowDecimals && e.key === '.') {
        const currentValue = (e.currentTarget.value || '').toString();
        if (!currentValue.includes('.')) {
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
          return;
        }
      }

      // Ctrl/Cmd + A, C, V, X 허용
      if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
        return;
      }

      // 그 외 키는 차단
      e.preventDefault();
    },
    [allowDecimals, allowNegative]
  );

  return {
    handleChange,
    handleKeyDown,
  };
}

export type { UseInputNumberOptions };
