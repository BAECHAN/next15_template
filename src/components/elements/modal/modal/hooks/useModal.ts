'use client';

import { useState, useCallback } from 'react';

/**
 * Modal 상태를 관리하는 커스텀 훅
 *
 * @example
 * ```tsx
 * const { isOpen, open, close, toggle } = useModal();
 *
 * return (
 *   <>
 *     <Button onClick={open}>모달 열기</Button>
 *     <Modal open={isOpen} onOpenChange={toggle}>
 *       ...
 *     </Modal>
 *   </>
 * );
 * ```
 */
export function useModal(initialState = false) {
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
