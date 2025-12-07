import { DateFormatExample } from './DateFormatExample';

export function DateFormatDemo() {
  return (
    <section className="p-8 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full"></div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            날짜 포맷 유틸리티 예제
          </h2>
          <p className="text-gray-600 leading-relaxed mt-1">
            dayjs를 활용한 다양한 날짜 포맷 예제입니다. 여러 상황에 맞는 날짜 표시 형식을 확인할 수
            있습니다.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <DateFormatExample />
      </div>
    </section>
  );
}
