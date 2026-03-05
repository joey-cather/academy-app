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
import CourseInformation from './CourseInformation';
import CurriculumList from './CurriculumList';
import ReviewsList from './ReviewsList';

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

  const { isLoading: isCurriculumLoading, isError: isCurriculumError } =
    useCurriculumQuery(id);

  const { isLoading: isReviewsLoading, isError: isReviewsError } =
    useReviewsQuery(id);

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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <CourseInformation />

          <div className="lg:col-span-2">
            {/* 커리큘럼 */}
            <CurriculumList />

            {/* 수강 후기 */}
            <ReviewsList />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
