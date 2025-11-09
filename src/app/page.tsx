import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/atoms/button';
import { ROUTES_PATHS, TEXTS } from '@/lib/config';
import { DateFormatDemo } from '@/components/demos/DateFormatDemo';
import { AssetsDemo } from '@/components/demos/AssetsDemo';
import { UIComponentsDemo } from '@/components/demos/UIComponentsDemo';
import { CounterDemo } from '@/components/demos/CounterDemo';

export default function HomePage() {
  return (
    <>
      <Header />
      <PageLayout title="JSONPlaceholder API 예제" description="게시글과 사용자 관리 예제">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">{TEXTS.ui.postManagement}</h2>
            <p className="text-muted-foreground">{TEXTS.ui.postManagementDescription}</p>
            <Button as={Link} href={ROUTES_PATHS.POSTS.LIST}>
              {TEXTS.buttons.postList}
            </Button>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">{TEXTS.ui.userManagement}</h2>
            <p className="text-muted-foreground">{TEXTS.ui.userManagementDescription}</p>
            <Button as={Link} href={ROUTES_PATHS.USERS.LIST}>
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
      </PageLayout>
    </>
  );
}
