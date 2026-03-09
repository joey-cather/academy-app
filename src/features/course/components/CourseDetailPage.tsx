'use client';

import { useParams } from 'next/navigation';
import {
  useCourseQuery,
  useCurriculumQuery,
  useReviewsQuery,
} from '../api/useCourseDetailquery';
import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import CourseInformation from './CourseInformation';
import CurriculumList from './CurriculumList';
import ReviewsList from './ReviewsList';
import { useCreateEnrollmentMutation } from '../api/useCourseMutation';
import { useNotification } from '@/src/shared/providers/NotificationProvider';
import { useMeQuery } from '../../auth/api/useMeQuery';

const CourseDetailPage = () => {
  const params = useParams();
  const id = params.id;

  if (typeof id !== 'string') {
    return <div>Invalid course ID</div>;
  }

  const { data: me } = useMeQuery();

  const {
    data: courseDetail,
    isLoading: isCourseLoading,
    isError: isCourseError,
  } = useCourseQuery(id);

  const { isLoading: isCurriculumLoading, isError: isCurriculumError } =
    useCurriculumQuery(id);

  const { isLoading: isReviewsLoading, isError: isReviewsError } =
    useReviewsQuery(id);

  const { notify } = useNotification();

  const { mutateAsync } = useCreateEnrollmentMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRegisterEnrollment = useCallback(
    (userId: number) => {
      notify({
        type: 'confirm',
        message: '수강을 신청하시겠습니까?',
        onConfirm: async () => {
          try {
            const response = await mutateAsync({
              userId,
              courseId: Number(id),
            });

            notify({
              type: 'alert',
              message: response.message ?? '',
            });
          } catch (error) {
            if (error instanceof Error) {
              notify({
                type: 'alert',
                message: error.message,
              });
            }
          }
        },
      });
    },
    [notify, mutateAsync]
  );

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
    <div className="w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/courses"
          className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-zinc-700 rounded-lg px-4 py-2 inline-flex items-center transition-all duration-300 ease-in-out"
        >
          &larr; 강좌 목록으로 돌아가기
        </Link>
      </div>

      {/* 강좌 제목 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          {courseDetail.title}
        </h1>
        {me && (
          <button
            onClick={() => handleRegisterEnrollment(me.id)}
            className="text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg px-5 py-2.5 transition-all duration-300 ease-in-out"
          >
            수강 신청
          </button>
        )}
      </div>

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
  );
};

export default CourseDetailPage;
