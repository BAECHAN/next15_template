import { DateFormatExample } from './DateFormatExample';

export function DateFormatDemo() {
  return (
    <section className="p-8 border border-gray-300 rounded-lg bg-white">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">날짜 포맷 유틸리티 예제</h2>
      <p className="mb-6 text-gray-600 leading-relaxed">
        dayjs를 활용한 다양한 날짜 포맷 예제입니다. 여러 상황에 맞는 날짜 표시 형식을 확인할 수
        있습니다.
      </p>
      <div className="mt-4">
        <DateFormatExample />
      </div>
    </section>
  );
}
