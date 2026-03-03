export const courseCategories = [
  'english',
  'math',
  'science',
  'coding',
] as const;

export type CourseCategory = (typeof courseCategories)[number];

export const isCourseCategory = (value: string): value is CourseCategory => {
  return courseCategories.includes(value as CourseCategory);
};

export const courseLevels = ['beginner', 'intermediate', 'advanced'] as const;

export type CourseLevel = (typeof courseLevels)[number];

export const isCourseLevel = (value: string): value is CourseLevel => {
  return courseLevels.includes(value as CourseLevel);
};

export interface Course {
  id: number;
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  price: number;
  thumbnail?: string;
  instructorId: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetCoursesParams {
  page: number; // 현재 페이지
  pageSize: number; // 한 페이지의 item 수
  category?: CourseCategory;
}

export interface CurriculumItem {
  id: number;
  courseId: number;
  title: string;
  description: string;
  duration: string;
}

export interface Review {
  id: number;
  courseId: number;
  author: string;
  rating: number;
  content: string;
  createdAt: string;
}
