import { Header } from '@/components/layout/Header';
import { PageLayout } from '@/components/layout/PageLayout';
import { AsyncBoundary } from '@/components/elements/async-boundary';

// TODO: UserList 컴포넌트 구현 필요
function UserList() {
  return (
    <div className="p-8 bg-white rounded-lg border border-gray-200">
      <p className="text-gray-600">사용자 목록 컴포넌트를 구현해주세요.</p>
    </div>
  );
}

export default function UserListPage() {
  return (
    <>
      <Header />
      <PageLayout title="사용자 목록" description="사용자를 조회하고 관리합니다">
        <AsyncBoundary>
          <UserList />
        </AsyncBoundary>
      </PageLayout>
    </>
  );
}
