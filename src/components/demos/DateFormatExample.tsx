'use client';

import { useEffect, useState } from 'react';
import { DateUtil } from '@/lib/utils/date.util';

export function DateFormatExample() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const examples = [
    { label: '기본 포맷', value: DateUtil.formatDefault(now), description: 'YYYY-MM-DD' },
    { label: '한국어 날짜', value: DateUtil.formatKorean(now), description: 'YYYY년 M월 D일' },
    {
      label: '한국어 날짜 + 요일',
      value: DateUtil.formatKoreanWithDay(now),
      description: 'YYYY년 M월 D일 dddd',
    },
    {
      label: '오전/오후 시간',
      value: DateUtil.formatKoreanTime(now),
      description: '오전/오후 H시 mm분',
    },
    {
      label: '날짜 + 오전/오후 시간',
      value: DateUtil.formatKoreanDateTime(now),
      description: 'YYYY년 M월 D일 오전/오후 H시 mm분',
    },
    {
      label: '날짜 + 요일 + 시간',
      value: DateUtil.formatKoreanDateTimeWithDay(now),
      description: 'YYYY년 M월 D일 dddd 오전/오후 H시 mm분',
    },
    { label: '시간 (HH:mm)', value: DateUtil.formatTime(now), description: 'HH:mm' },
    {
      label: '오전/오후 시간 (간단)',
      value: DateUtil.formatTimeWithPeriod(now),
      description: '오전/오후 h:mm',
    },
    { label: '월일만', value: DateUtil.formatMonthDay(now), description: 'M월 D일' },
    { label: '년월만', value: DateUtil.formatYearMonth(now), description: 'YYYY년 M월' },
  ];

  const relativeExamples = [
    { date: new Date(now.getTime() - 30 * 1000), label: '30초 전' },
    { date: new Date(now.getTime() - 5 * 60 * 1000), label: '5분 전' },
    { date: new Date(now.getTime() - 3 * 60 * 60 * 1000), label: '3시간 전' },
    { date: new Date(now.getTime() - 24 * 60 * 60 * 1000), label: '어제' },
    { date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), label: '3일 전' },
    { date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), label: '10일 전' },
  ];

  const boardExamples = [
    { date: now, label: '오늘' },
    { date: new Date(now.getTime() - 24 * 60 * 60 * 1000), label: '어제' },
    { date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), label: '3일 전 (요일)' },
    { date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), label: '10일 전 (월일)' },
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-4">
      <div className="p-6 border border-gray-300 rounded-lg bg-white">
        <h3 className="mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-200 pb-2">
          기본 포맷 예제
        </h3>
        {examples.map((example) => (
          <div key={example.label} className="mb-3">
            <div className="text-base font-medium text-gray-900 font-['Pretendard',system-ui,sans-serif]">
              {example.value}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {example.label} ({example.description})
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border border-gray-300 rounded-lg bg-white">
        <h3 className="mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-200 pb-2">
          상대 시간 예제
        </h3>
        {relativeExamples.map((example) => (
          <div key={example.label} className="mb-3">
            <div className="text-base font-medium text-gray-900 font-['Pretendard',system-ui,sans-serif]">
              {DateUtil.formatRelative(example.date)}
            </div>
            <div className="text-sm text-gray-600 mt-1">{example.label}</div>
          </div>
        ))}
      </div>

      <div className="p-6 border border-gray-300 rounded-lg bg-white">
        <h3 className="mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-200 pb-2">
          게시판 스타일 예제
        </h3>
        {boardExamples.map((example) => (
          <div key={example.label} className="mb-3">
            <div className="text-base font-medium text-gray-900 font-['Pretendard',system-ui,sans-serif]">
              {DateUtil.formatBoard(example.date)}
            </div>
            <div className="text-sm text-gray-600 mt-1">{example.label}</div>
          </div>
        ))}
      </div>

      <div className="p-6 border border-gray-300 rounded-lg bg-white">
        <h3 className="mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-200 pb-2">
          날짜 범위 예제
        </h3>
        <div className="mb-3">
          <div className="text-base font-medium text-gray-900 font-['Pretendard',system-ui,sans-serif]">
            {DateUtil.formatDateRange(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now)}
          </div>
          <div className="text-sm text-gray-600 mt-1">시작일 ~ 종료일</div>
        </div>
      </div>
    </div>
  );
}
