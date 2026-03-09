'use client';

import { useParams } from 'next/navigation';
import { useCourseQuery } from '../api/useCourseDetailquery';
import Image from 'next/image';

const CourseInformation = () => {
  const params = useParams();
  const id = params.id;

  if (typeof id !== 'string') {
    return <div>Invalid course ID</div>;
  }

  const { data: courseDetail } = useCourseQuery(id);

  if (!courseDetail) {
    return (
      <p className="text-center mt-8 text-gray-600">
        데이터가 없습니다. 다시 시도해 주세요.
      </p>
    );
  }

  return (
    <div className="lg:col-span-3">
      {/* 강좌 썸네일 */}
      {courseDetail.thumbnail && (
        <div className="relative h-60 rounded-xl mb-8 overflow-hidden">
          <Image
            src={courseDetail.thumbnail}
            alt={courseDetail.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
      )}

      {/* 강좌 설명 */}
      <section className="course-description mb-8">
        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
          {courseDetail.description}
        </p>
      </section>

      {/* 강좌 정보 */}
      <section className="course-info bg-zinc-50 dark:bg-zinc-800 p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          강좌 정보
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              카테고리
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {courseDetail.category}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              난이도
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {courseDetail.level}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              가격
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {courseDetail.price} 원
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              강사
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              강사 ID: {courseDetail.instructorId}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              생성일
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date(courseDetail.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              수정일
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date(courseDetail.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseInformation;
