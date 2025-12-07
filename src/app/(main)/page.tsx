import Link from 'next/link';
import { Button } from '@/components/atoms/button/Button';
import { TEXTS } from '@/lib/constants/texts';
import { DateFormatDemo } from '@/components/demos/DateFormatDemo';
import { AssetsDemo } from '@/components/demos/AssetsDemo';
import { UIComponentsDemo } from '@/components/demos/UIComponentsDemo';
import { CounterDemo } from '@/components/demos/CounterDemo';
import { cn } from '@/lib/utils';

export default function HomePage() {
  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30')}>
      <div className={cn('max-w-[1200px] mx-auto px-4 py-8 sm:px-6 lg:px-8')}>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-10 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full"></div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-700 bg-clip-text text-transparent">
                JSONPlaceholder API 예제
              </h1>
              <p className="text-base text-gray-600 mt-2">게시글과 사용자 관리 예제</p>
            </div>
          </div>
        </header>
        <main className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <section className="group p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-200/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{TEXTS.ui.postManagement}</h2>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {TEXTS.ui.postManagementDescription}
              </p>
              <Button
                as={Link}
                href="/posts"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
              >
                {TEXTS.buttons.postList}
              </Button>
            </section>

            <section className="group p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-200/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{TEXTS.ui.userManagement}</h2>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {TEXTS.ui.userManagementDescription}
              </p>
              <Button
                as={Link}
                href="/users"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md hover:shadow-lg transition-all duration-200"
              >
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
    </div>
  );
}
