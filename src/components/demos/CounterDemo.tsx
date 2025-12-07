import { Counter } from './Counter';

export function CounterDemo() {
  return (
    <section className="my-8 p-8 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full"></div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            카운터 예제
          </h2>
          <p className="text-sm text-gray-600 mt-1">카운터 컴포넌트를 사용하는 데모 예제입니다.</p>
        </div>
      </div>
      <Counter />
    </section>
  );
}
