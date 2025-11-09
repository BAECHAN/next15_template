'use client';

import Link from 'next/link';
import { TEXTS } from '@/lib/constants/texts';
import { RainbowBlinkingText } from '@/components/elements/RainbowBlinkingText';

export function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              React Template
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
              >
                {TEXTS.buttons.home}
              </Link>
            </nav>
          </div>

          <div className="flex items-center justify-center gap-6">
            <RainbowBlinkingText>{TEXTS.ui.demoDataNotice}</RainbowBlinkingText>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200/50 text-red-700 rounded-full text-sm font-medium shadow-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
