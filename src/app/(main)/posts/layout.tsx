import Link from 'next/link';
import { Button } from '@/components/atoms/button/Button';
import { TEXTS } from '@/lib/constants/texts';

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            게시글 관리
          </h2>
        </div>
        <Button
          as={Link}
          href="/posts/new"
          className="shadow-md hover:shadow-lg flex-shrink-0 mr-4"
        >
          {TEXTS.buttons.create}
        </Button>
      </div>
      {children}
    </div>
  );
}
