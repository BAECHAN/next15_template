import { cn } from '@/lib/utils';
import { CreatePostForm } from '@/app/(main)/posts/_CreatePostForm/ui/CreatePostForm';

export default function CreatePostPage() {
  return (
    <div className={cn('max-w-[1200px] mx-auto p-8')}>
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">게시글 작성</h1>
        <p className="text-base text-gray-600">새 게시글을 작성합니다</p>
      </header>
      <main className="w-full">
        <div className="p-8 bg-white rounded-lg border border-gray-200">
          <CreatePostForm />
        </div>
      </main>
    </div>
  );
}
