'use client';

import { useEffect, useCallback, useRef } from 'react';

/**
 * ESC 키 스택 관리 훅
 *
 * 여러 레이어의 다이얼로그를 ESC 키로 순차적으로 닫을 수 있도록 관리합니다.
 * 스택의 최상단(마지막에 열린 것)부터 닫힙니다.
 *
 * @example
 * ```tsx
 * const { push, pop, clear } = useDialogStack();
 *
 * // Dialog 열기
 * push(() => setDialogOpen(false));
 *
 * // 또 다른 Dialog 열기
 * push(() => setAnotherDialogOpen(false));
 *
 * // ESC 키를 누르면 마지막 Dialog가 먼저 닫히고, 다시 ESC를 누르면 이전 Dialog가 닫힙니다.
 * ```
 */
export function useDialogStack() {
  const stackRef = useRef<Array<() => void>>([]);

  const push = useCallback((closeHandler: () => void) => {
    stackRef.current.push(closeHandler);
  }, []);

  const pop = useCallback(() => {
    const handler = stackRef.current.pop();
    if (handler) {
      handler();
    }
  }, []);

  const clear = useCallback(() => {
    stackRef.current = [];
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && stackRef.current.length > 0) {
        event.preventDefault();
        event.stopPropagation();
        pop();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [pop]);

  return { push, pop, clear };
}

