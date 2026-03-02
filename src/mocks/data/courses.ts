import {
  Course,
  courseCategories,
  courseLevels,
} from '@/src/features/course/types/type';
import { randomDate, randomPrice, randomThumbnail } from '../utils/util';

export const courses: Course[] = Array.from({ length: 50 }, (_, i) => {
  const category = courseCategories[i % courseCategories.length];
  const level = courseLevels[i % courseLevels.length];
  const id = i + 1;

  return {
    id,
    title: `${category.toUpperCase()} ${level} Course #${id}`,
    description: `This is a sample description for ${category} ${level} course #${id}.`,
    category,
    level,
    price: randomPrice(),
    thumbnail: randomThumbnail(id),
    instructorId: Math.floor(Math.random() * 10) + 1, // 강사 ID 1~10
    createdAt: randomDate(),
    updatedAt: randomDate(),
  };
});
