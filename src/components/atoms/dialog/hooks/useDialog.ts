'use client';

import { useState, useCallback } from 'react';

/**
 * Dialog 상태를 관리하는 커스텀 훅
 *
 * @example
 * ```tsx
 * const { isOpen, open, close, toggle } = useDialog();
 *
 * return (
 *   <>
 *     <Button onClick={open}>다이얼로그 열기</Button>
 *     <Dialog open={isOpen} onOpenChange={toggle}>
 *       ...
 *     </Dialog>
 *   </>
 * );
 * ```
 */
export function useDialog(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

