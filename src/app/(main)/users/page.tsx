import { AsyncBoundary } from '@/components/elements/async-boundary/AsyncBoundary';
import { UserList } from '@/app/(main)/users/_features/user-list/ui/UserList';

export default function UserListPage() {
  return (
    <AsyncBoundary>
      <UserList />
    </AsyncBoundary>
  );
}
