'use client';

import { useUsers } from '@/app/(main)/users/_common/users.queries';

export function UserList() {
  const { data: users } = useUsers();

  if (!users || users.length === 0) {
    return (
      <div className="p-8 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-600">사용자가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-gray-600 mt-1">@{user.username}</p>
          <p className="text-gray-600 mt-1">{user.email}</p>
        </div>
      ))}
    </div>
  );
}
