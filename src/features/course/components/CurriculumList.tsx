'use client';

import { useParams } from 'next/navigation';
import { useCurriculumQuery } from '../api/useCourseDetailquery';
import { useState } from 'react';

const CurriculumList = () => {
  const params = useParams();
  const id = params.id;

  if (typeof id !== 'string') {
    return <div>Invalid course ID</div>;
  }

  const { data: curriculum } = useCurriculumQuery(id);

  const [showCurriculumAll, setShowCurriculumAll] = useState(false);

  const safeCurriculum = curriculum || [];
  const visibleCurriculum = showCurriculumAll
    ? safeCurriculum
    : safeCurriculum.slice(0, 2);

  return (
    <section className="curriculum bg-zinc-50 dark:bg-zinc-800 p-6 shadow-lg rounded-xl mb-8">
      <h2 className="mb-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
        커리큘럼
      </h2>
      <ul className="space-y-6">
        {safeCurriculum.length !== 0 ? (
          visibleCurriculum.map((item) => (
            <li
              key={item.id}
              className="rounded-lg bg-zinc-100 p-4 shadow-sm transition-shadow hover:shadow-lg dark:bg-zinc-700"
            >
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                {item.title}
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300">
                {item.description}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {item.duration}
              </p>
            </li>
          ))
        ) : (
          <>커리큘럼이 없습니다.</>
        )}

        {safeCurriculum.length > 2 && !showCurriculumAll && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowCurriculumAll(true)}
              className="rounded-full bg-zinc-900 px-6 py-2 text-base text-white shadow-md transition-colors hover:bg-zinc-700"
            >
              더 보기
            </button>
          </div>
        )}
      </ul>
    </section>
  );
};

export default CurriculumList;
