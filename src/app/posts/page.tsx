import { Header } from '@/components/layout/Header';
import { PageLayout } from '@/components/layout/PageLayout';
import { AsyncBoundary } from '@/components/elements/async-boundary';

// TODO: PostList 컴포넌트 구현 필요
function PostList() {
  return (
    <div className="p-8 bg-white rounded-lg border border-gray-200">
      <p className="text-gray-600">게시글 목록 컴포넌트를 구현해주세요.</p>
    </div>
  );
}

export default function PostListPage() {
  return (
    <>
      <Header />
      <PageLayout title="게시글 목록" description="게시글을 조회하고 관리합니다">
        <AsyncBoundary>
          <PostList />
        </AsyncBoundary>
      </PageLayout>
    </>
  );
}
