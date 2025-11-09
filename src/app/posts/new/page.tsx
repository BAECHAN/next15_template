import { Header } from '@/components/layout/Header';
import { PageLayout } from '@/components/layout/PageLayout';

// TODO: CreatePostForm 컴포넌트 구현 필요
function CreatePostForm() {
  return (
    <div className="p-8 bg-white rounded-lg border border-gray-200">
      <p className="text-gray-600">게시글 작성 폼 컴포넌트를 구현해주세요.</p>
    </div>
  );
}

export default function CreatePostPage() {
  return (
    <>
      <Header />
      <PageLayout title="게시글 작성" description="새 게시글을 작성합니다">
        <CreatePostForm />
      </PageLayout>
    </>
  );
}
