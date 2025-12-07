import { CreatePostForm } from '@/app/(main)/posts/_features/create-post/ui/CreatePostForm';
import { cn } from '@/lib/utils';

export default function CreatePostPage() {
  return (
    <div className={cn('max-w-3xl mx-auto')}>
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              게시글 작성
            </h1>
            <p className="text-base text-gray-600 mt-1">새 게시글을 작성합니다</p>
          </div>
        </div>
      </header>
      <div className="p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
        <CreatePostForm />
      </div>
    </div>
  );
}
