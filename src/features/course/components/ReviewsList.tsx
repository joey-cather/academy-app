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
  );
};

export default ReviewsList;
