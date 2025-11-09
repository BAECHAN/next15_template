import { Counter } from './Counter';

export function CounterDemo() {
  return (
    <section className="my-8 p-8 bg-white rounded-lg border border-gray-200">
      <h2 className="mb-2 text-2xl font-bold text-gray-900">카운터 예제</h2>
      <p className="mb-6 text-sm text-gray-600">카운터 컴포넌트를 사용하는 데모 예제입니다.</p>
      <Counter />
    </section>
  );
}
