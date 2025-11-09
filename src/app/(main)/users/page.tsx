import { AsyncBoundary } from '@/components/elements/async-boundary/AsyncBoundary';
import { UserList } from './_UserList/ui/UserList';
import { cn } from '@/lib/utils';

export default function UserListPage() {
  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30')}>
      <div className={cn('max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8')}>
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                사용자 목록
              </h1>
              <p className="text-base text-gray-600 mt-1">사용자를 조회하고 관리합니다</p>
            </div>
          </div>
        </header>
        <main className="w-full">
          <AsyncBoundary>
            <UserList />
          </AsyncBoundary>
        </main>
      </div>
    </div>
  );
}
