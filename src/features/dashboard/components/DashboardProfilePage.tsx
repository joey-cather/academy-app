'use client';

import { useAuthStore } from '@/src/shared/hooks/useAuthStore';
import { useNotification } from '@/src/shared/layouts/NotificationProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import useProfileForm from '../hooks/useProfileForm';
import { useMeQuery } from '../../auth/api/useMeQuery';
import { useDashboardQuery } from '../api/useDashboardQuery';

const DashboardProfilePage = () => {
  const { accessToken } = useAuthStore();

  const router = useRouter();

  const { notify } = useNotification();

  useEffect(() => {
    if (!accessToken) {
      notify({
        type: 'alert',
        message: '먼저 로그인해 주세요.',
        onConfirm: () => {
          router.push('/login');
        },
      });
    }
  }, [accessToken]);

  const { data: me } = useMeQuery();

  if (!me) return <div>로그인이 필요합니다.</div>;

  const { data, isLoading } = useDashboardQuery(me.id);

  if (isLoading) return <div>대시보드 로딩중...</div>;

  if (!data) return null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useProfileForm(me.id);

  useEffect(() => {
    if (me) {
      setValue('name', me.name);
      setValue('email', me.email);
    }
  }, [me, setValue]);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="dashboard-content flex flex-col lg:flex-row gap-8">
          <section className="profile-section flex-[2] bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">개인정보 변경</h2>
            <section className="bg-zinc-100 dark:bg-zinc-700 p-6 shadow-xl rounded-2xl max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6">
                내 프로필
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100 dark:focus:border-gray-100 dark:focus:ring-gray-100"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    이메일
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                    readOnly={!!me}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100 dark:focus:border-gray-100 dark:focus:ring-gray-100 pointer-events-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    autoComplete="new-password"
                    {...register('password')}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100 dark:focus:border-gray-100 dark:focus:ring-gray-100"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    autoComplete="new-password"
                    {...register('confirmPassword')}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100 dark:focus:border-gray-100 dark:focus:ring-gray-100"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-60 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  수정
                </button>
              </form>
            </section>
          </section>

          <section className="courses-section flex-[3] bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">수강 이력</h2>
            <ul className="space-y-5">
              {data.length > 0 ? (
                data.map((e) => (
                  <li
                    key={e.id}
                    className="bg-zinc-100 dark:bg-zinc-700 p-5 rounded-2xl shadow-md"
                  >
                    <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {e.status === 'completed'
                        ? `✅ 수강 완료 - ${e.course.title}`
                        : `📘 수강 시작 - ${e.course.title}`}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
                      {e.enrolledAt}
                    </span>
                  </li>
                ))
              ) : (
                <div className="flex items-center justify-center min-h-[400px] bg-zinc-100 dark:bg-zinc-900 rounded-2xl shadow-inner">
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    최근 활동 내역이 없습니다.
                  </p>
                </div>
              )}
            </ul>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProfilePage;
