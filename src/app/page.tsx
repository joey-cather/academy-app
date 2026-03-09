'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useMajorCoursesQuery } from '../features/course/api/useCoursesQuery';
import { useRecentInstructorsQuery } from '../features/instructor/api/useInstructorsQuery';
import Image from 'next/image';

export default function Home() {
  const {
    data: coursesData,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useMajorCoursesQuery();

  const {
    data: instructorsData,
    isLoading: isInstructorsLoading,
    isError: isInstructorsError,
  } = useRecentInstructorsQuery();

  const isLoading = isCoursesLoading || isInstructorsLoading;
  const isError = isCoursesError || isInstructorsError;

  if (isLoading) return <p className="text-center mt-8">로딩 중...</p>;
  if (isError)
    return (
      <p className="text-center mt-8 text-red-600">
        강좌 정보를 불러올 수 없습니다.
      </p>
    );

  const majorCourses = coursesData ?? [];
  const majorInstructors = instructorsData ?? [];

  return (
    <>
      <Head>
        <title>학원 관리 시스템 | 홈</title>
        <meta
          name="description"
          content="강좌, 강사 관리와 대시보드 확인까지 가능한 학원 관리 시스템."
        />
        <meta name="keywords" content="강좌 관리, 강사 관리, 대시보드" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://academy-app-deploy.vercel.app/" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '학원 관리 시스템',
              url: 'https://academy-app-deploy.vercel.app',
              description:
                '강좌, 강사 관리와 대시보드 확인까지 가능한 학원 관리 시스템.',
            }),
          }}
        />
      </Head>

      <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center bg-zinc-50 dark:bg-black px-4 py-12 transition-colors duration-200">
        {/* 상단 타이틀 */}
        <div className="max-w-3xl text-center space-y-4 mb-12">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            학원 관리 시스템
          </p>
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            학원 운영을 더 쉽고 간편하게
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-300">
            강좌 관리, 강사 관리, 대시보드 확인까지. 필요한 기능을 한 곳에서
            빠르게 접근하세요.
          </p>
        </div>

        {/* 기능 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-center mb-16">
          {/* 강좌 목록 */}
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-xl transition-shadow duration-200 text-left">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              강좌 목록
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">
              등록된 강좌를 한눈에 확인하고, 강좌 세부 정보를 쉽게 조회할 수
              있습니다.
            </p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
              <li>강좌 이름, 일정, 강사 정보 확인</li>
              <li>강좌 세부 페이지로 바로 이동 가능</li>
            </ul>
          </div>

          {/* 강사 목록 */}
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-xl transition-shadow duration-200 text-left">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              강사 목록
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">
              학원에 등록된 강사를 관리하고, 담당 강좌를 쉽게 확인할 수
              있습니다.
            </p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
              <li>강사 정보 조회</li>
              <li>강사가 담당하는 강좌 확인</li>
            </ul>
          </div>

          {/* 대시보드 */}
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-xl transition-shadow duration-200 text-left">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              대시보드
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">
              수강 내역을 조회하고, 개인 정보를 수정할 수 있습니다.
            </p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
              <li>최근 수강 활동 확인</li>
              <li>개인 정보 수정</li>
            </ul>
          </div>
        </div>

        <div className="max-w-5xl w-full mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              주요 강좌
            </h2>
            <div className="flex justify-end mb-6">
              <Link
                href="/courses"
                className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-zinc-700 rounded-lg px-4 py-2 inline-flex items-center transition-all duration-300 ease-in-out"
              >
                전체 보기 &rarr;
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {majorCourses.map((course) => (
              <div
                key={course.id}
                className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow text-center hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                  강사: {course.instructor.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {new Date(course.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              강사진
            </h2>
            <div className="flex justify-end mb-6">
              <Link
                href="/instructors"
                className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-zinc-700 rounded-lg px-4 py-2 inline-flex items-center transition-all duration-300 ease-in-out"
              >
                전체 보기 &rarr;
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {majorInstructors.map((instructor) => (
              <div
                key={instructor.id}
                className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow text-center hover:shadow-lg transition"
              >
                {instructor.profileImage && (
                  <div className="relative w-16 h-16 mx-auto rounded-full mb-3 overflow-hidden">
                    <Image
                      src={instructor.profileImage}
                      alt={instructor.name}
                      fill
                      className=""
                      unoptimized={true} // SVG 안전하게 렌더링
                    />
                  </div>
                )}
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                  {instructor.name}
                </h3>
                <p className="text-xs text-zinc-500">{instructor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
