'use client';

import { useParams } from 'next/navigation';
import {
  useCourseQuery,
  useCurriculumQuery,
  useReviewsQuery,
} from '../api/useCourseDetailquery';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const CourseDetailPage = () => {
  const params = useParams();
  const id = params.id;

  if (typeof id !== 'string') {
    return <div>Invalid course ID</div>;
  }

  const {
    data: courseDetail,
    isLoading: isCourseLoading,
    isError: isCourseError,
  } = useCourseQuery(id);
  const {
    data: curriculum,
    isLoading: isCurriculumLoading,
    isError: isCurriculumError,
  } = useCurriculumQuery(id);
  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useReviewsQuery(id);

  const [showCurriculumAll, setShowCurriculumAll] = useState(false);
  const [showReviewsAll, setShowReviewsAll] = useState(false);

  const safeCurriculum = curriculum || [];
  const safeReviews = reviews || [];
  const visibleCurriculum = showCurriculumAll
    ? safeCurriculum
    : safeCurriculum.slice(0, 2);
  const visibleReviews = showReviewsAll ? safeReviews : safeReviews.slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isLoading = isCourseLoading || isCurriculumLoading || isReviewsLoading;
  const isError = isCourseError || isCurriculumError || isReviewsError;

  if (isLoading) return <p className="text-center mt-8">로딩 중...</p>;
  if (isError)
    return (
      <p className="text-center mt-8 text-red-600">
        강좌 정보를 불러올 수 없습니다.
      </p>
    );

  if (!courseDetail) {
    return (
      <p className="text-center mt-8 text-gray-600">
        데이터가 없습니다. 다시 시도해 주세요.
      </p>
    );
  }

  return (
    <>
      {/* SEO 메타태그 추가 */}
      <Head>
        <title>{courseDetail.title} - 강좌 상세</title>
        <meta name="description" content={courseDetail.description} />

        {/* Open Graph */}
        <meta property="og:title" content={courseDetail.title} />
        <meta property="og:description" content={courseDetail.description} />
        {courseDetail.thumbnail && (
          <meta property="og:image" content={courseDetail.thumbnail} />
        )}
        <meta property="og:type" content="website" />

        {/* Twitter 카드 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={courseDetail.title} />
        <meta name="twitter:description" content={courseDetail.description} />
        {courseDetail.thumbnail && (
          <meta name="twitter:image" content={courseDetail.thumbnail} />
        )}
      </Head>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Course List로 돌아가기 버튼 */}
        <div className="mb-6">
          <Link
            href="/courses"
            className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-zinc-700 rounded-lg px-4 py-2 inline-flex items-center transition-all duration-300 ease-in-out"
          >
            &larr; 강좌 목록으로 돌아가기
          </Link>
        </div>

        {/* 강좌 제목 */}
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          {courseDetail.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            {/* 강좌 썸네일 */}
            {courseDetail.thumbnail && (
              <div className="text-center mb-8">
                <img
                  src={courseDetail.thumbnail}
                  alt={courseDetail.title}
                  className="w-full h-60 object-cover rounded-xl mb-4"
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

          <div className="lg:col-span-2">
            {/* 커리큘럼 */}
            <section className="curriculum bg-zinc-50 dark:bg-zinc-800 p-6 shadow-lg rounded-xl mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                커리큘럼
              </h2>
              <ul className="space-y-6">
                {safeCurriculum.length !== 0 ? (
                  visibleCurriculum.map((item) => (
                    <li
                      key={item.id}
                      className="bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg shadow-sm hover:shadow-lg transition"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
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
                      className="px-6 py-2 text-base bg-gray-900 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-700"
                    >
                      더 보기
                    </button>
                  </div>
                )}
              </ul>
            </section>

            {/* 수강 후기 */}
            <section className="reviews bg-zinc-50 dark:bg-zinc-800 p-6 shadow-lg rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                수강 후기
              </h2>
              <ul className="space-y-6">
                {safeReviews.length !== 0 ? (
                  visibleReviews.map((review) => (
                    <li
                      key={review.id}
                      className="bg-zinc-50 dark:bg-zinc-700 p-4 rounded-lg shadow-sm hover:shadow-lg transition"
                    >
                      <p className="text-lg text-gray-700 dark:text-gray-200">
                        {review.content}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {review.author}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          Rating: {review.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))
                ) : (
                  <p>수강 후기가 없습니다.</p>
                )}

                {safeReviews.length > 2 && !showReviewsAll && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setShowReviewsAll(true)}
                      className="px-6 py-2 text-base bg-gray-900 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-700"
                    >
                      더 보기
                    </button>
                  </div>
                )}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
