import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { TEXTS } from '@/lib/constants/texts';
import { DateFormatDemo } from '@/components/demos/DateFormatDemo';
import { AssetsDemo } from '@/components/demos/AssetsDemo';
import { UIComponentsDemo } from '@/components/demos/UIComponentsDemo';
import { CounterDemo } from '@/components/demos/CounterDemo';
import { cn } from '@/lib/utils';

export default function HomePage() {
  return (
    <div className={cn('max-w-[1200px] mx-auto p-8')}>
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">JSONPlaceholder API 예제</h1>
        <p className="text-base text-gray-600">게시글과 사용자 관리 예제</p>
      </header>
      <main className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">{TEXTS.ui.postManagement}</h2>
            <p className="text-muted-foreground">{TEXTS.ui.postManagementDescription}</p>
            <Button as={Link} href="/posts">
              {TEXTS.buttons.postList}
            </Button>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">{TEXTS.ui.userManagement}</h2>
            <p className="text-muted-foreground">{TEXTS.ui.userManagementDescription}</p>
            <Button as={Link} href="/users">
              {TEXTS.buttons.userList}
            </Button>
          </section>

          <div className="col-span-1 md:col-span-2">
            <UIComponentsDemo />
          </div>

          <div className="col-span-1 md:col-span-2">
            <CounterDemo />
          </div>

          <div className="col-span-1 md:col-span-2">
            <DateFormatDemo />
          </div>

          <div className="col-span-1 md:col-span-2">
            <AssetsDemo />
          </div>
        </div>
      </main>
    </div>
  );
}
