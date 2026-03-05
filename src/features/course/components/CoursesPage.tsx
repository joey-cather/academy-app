import CourseFilter from './CourseFilter';
import CoursesList from './CoursesList';

export default function CoursesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
        강좌 목록
      </h1>

      <CourseFilter />
      <CoursesList />
    </div>
  );
}
