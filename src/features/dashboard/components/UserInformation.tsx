'use client';

import { useEffect } from 'react';
import useProfileForm from '../hooks/useProfileForm';
import { useMeQuery } from '../../auth/api/useMeQuery';

const UserInformation = () => {
  const { data: me } = useMeQuery();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useProfileForm(me?.id);

  useEffect(() => {
    if (me) {
      setValue('name', me.name);
      setValue('email', me.email);
    }
  }, [me, setValue]);

  return (
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
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
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
  );
};

export default UserInformation;
