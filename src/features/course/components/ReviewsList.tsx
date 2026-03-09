'use client';

import { useParams } from 'next/navigation';
import { useReviewsQuery } from '../api/useCourseDetailquery';
import { useState } from 'react';

const ReviewsList = () => {
  const params = useParams();
  const id = params.id;

  if (typeof id !== 'string') {
    return <div>Invalid course ID</div>;
  }

  const { data: reviews } = useReviewsQuery(id);

  const [showReviewsAll, setShowReviewsAll] = useState(false);

  const safeReviews = reviews || [];
  const visibleReviews = showReviewsAll ? safeReviews : safeReviews.slice(0, 2);

  return (
    <section className="reviews bg-zinc-50 dark:bg-zinc-800 p-6 shadow-lg rounded-xl">
      <h2 className="mb-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
        수강 후기
      </h2>
      <ul className="space-y-6">
        {safeReviews.length !== 0 ? (
          visibleReviews.map((review) => (
            <li
              key={review.id}
              className="rounded-lg bg-zinc-50 p-4 shadow-sm transition-shadow hover:shadow-lg dark:bg-zinc-700"
            >
              <p className="text-lg text-zinc-700 dark:text-zinc-200">
                {review.content}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {review.author}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  Rating: {review.rating}
                </span>
              </div>
              <span className="mt-2 block text-sm text-zinc-500 dark:text-zinc-400">
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

export default ReviewsList;
