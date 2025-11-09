'use client';

import { Button } from '@/components/atoms/button/Button';
import { useCounter } from '@/lib/hooks/useCounter';
import { TEXTS } from '@/lib/constants/texts';
import { cn } from '@/lib/utils';

export function Counter() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl border border-gray-200/50 shadow-md'
      )}
    >
      <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {count}
      </div>
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
