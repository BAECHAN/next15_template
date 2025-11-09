'use client';

import Link from 'next/link';
import { Button } from '@/components/atoms/button/Button';
import { usePosts } from '@/app/(main)/posts/_common/posts.queries';
import { usePostList } from '@/app/(main)/posts/_PostList/hooks/usePostList';
import { TEXTS } from '@/lib/constants/texts';

export function PostList() {
  const { data: posts } = usePosts(true); // Suspense 모드 사용
  const { handleDelete, deletingId, isDeleting } = usePostList();

  if (!posts || posts.length === 0) {
    return (
      <div className="p-12 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-lg text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">게시글이 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="group block p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-200/50"
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 break-words group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mt-2 break-words whitespace-pre-wrap leading-relaxed line-clamp-3">
                    {post.body}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      User ID: {post.userId}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="danger"
                size="sm"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(post.id);
                }}
                disabled={deletingId === post.id || isDeleting}
                className="shadow-sm hover:shadow-md transition-all duration-200"
              >
                {deletingId === post.id ? TEXTS.buttons.deleteLoading : TEXTS.buttons.delete}
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
