'use client';

import { Button } from '@/components/atoms/Button';
import { useCounter } from '@/lib/hooks/useCounter';
import { TEXTS } from '@/lib/constants/texts';
import { cn } from '@/lib/utils';

export function Counter() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-6 p-8 bg-white rounded-lg border border-gray-200'
      )}
    >
      <div className="text-5xl font-bold text-blue-600">{count}</div>
      <div className="flex gap-3">
        <Button onClick={decrement} variant="secondary">
          -1
        </Button>
        <Button onClick={reset} variant="ghost">
          {TEXTS.buttons.reset}
        </Button>
        <Button onClick={increment}>+1</Button>
      </div>
    </div>
  );
}
