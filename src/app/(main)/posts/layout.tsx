import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { TEXTS } from '@/lib/constants/texts';

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">게시글 관리</h2>
        <Button as={Link} href="/posts/new">
          {TEXTS.buttons.create}
        </Button>
      </div>
      {children}
    </div>
  );
}
