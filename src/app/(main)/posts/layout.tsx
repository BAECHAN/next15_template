import Link from 'next/link';
import { Button } from '@/components/atoms/button/Button';
import { TEXTS } from '@/lib/constants/texts';
import { cn } from '@/lib/utils';

export default function PostsLayout({
  children,
  dialog,
}: Readonly<{
  children: React.ReactNode;
  dialog?: React.ReactNode;
}>) {
  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30')}>
      <div className={cn('max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8')}>
        <header className="mb-8">
          <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  게시글 관리
                </h1>
                <p className="text-base text-gray-600 mt-1">게시글을 조회하고 관리합니다</p>
              </div>
            </div>
            <Button
              as={Link}
              href="/posts/new"
              className="shadow-md hover:shadow-lg flex-shrink-0"
            >
              {TEXTS.buttons.create}
            </Button>
          </div>
        </header>
        <main className="w-full">
          {children}
        </main>
        {dialog}
      </div>
    </div>
  );
}
