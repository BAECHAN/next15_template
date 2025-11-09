import { AsyncBoundary } from '@/components/elements/async-boundary/AsyncBoundary';
import { UserList } from './_UserList/ui/UserList';
import { cn } from '@/lib/utils';

export default function UserListPage() {
  return (
    <div className={cn('max-w-[1200px] mx-auto p-8')}>
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">사용자 목록</h1>
        <p className="text-base text-gray-600">사용자를 조회하고 관리합니다</p>
      </header>
      <main className="w-full">
        <AsyncBoundary>
          <UserList />
        </AsyncBoundary>
      </main>
    </div>
  );
}
