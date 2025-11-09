'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface RainbowBlinkingTextProps {
  children: React.ReactNode;
  blinkDuration?: number;
}

export function RainbowBlinkingText({ children, blinkDuration = 3000 }: RainbowBlinkingTextProps) {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlinking(false);
    }, blinkDuration);

    return () => clearTimeout(timer);
  }, [blinkDuration]);

  return (
    <h2
      className={cn(
        'font-semibold bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 via-purple-500 to-red-500 bg-[length:200%_100%] bg-clip-text text-transparent',
        isBlinking
          ? 'animate-[blink_0.5s_ease-in-out_infinite,rainbow_3s_linear_infinite]'
          : 'animate-[rainbow_3s_linear_infinite]'
      )}
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </h2>
  );
}
