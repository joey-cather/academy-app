'use client';

import Link from 'next/link';
import { Course } from '../types/type';

interface Props {
  course: Course;
}

const CourseCard = ({ course }: Props) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800 hover:shadow-md transition">
      <Link href={`/courses/${course.id}`}>
        {course.thumbnail && (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}

        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          {course.title}
        </h2>

        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-3 line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
            {course.category}
          </span>

          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
            ₩ {course.price.toLocaleString()}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
