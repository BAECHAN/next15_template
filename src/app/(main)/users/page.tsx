import { AsyncBoundary } from '@/components/elements/async-boundary/AsyncBoundary';
import { UserList } from './_UserList/ui/UserList';

export default function UserListPage() {
  return (
    <AsyncBoundary>
      <UserList />
    </AsyncBoundary>
  );
}
