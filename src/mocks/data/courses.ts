import {
  Course,
  courseCategories,
  courseLevels,
  CurriculumItem,
  Review,
} from '@/src/features/course/types/type';
import { randomDate, randomPrice, randomThumbnail } from '../utils/util';

export const courses: Course[] = Array.from({ length: 150 }, (_, i) => {
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

export const curriculum: CurriculumItem[] = [
  {
    id: 1,
    courseId: 1,
    title: 'Introduction to React',
    description: 'Learn about React basics.',
    duration: '1h',
  },
  {
    id: 2,
    courseId: 1,
    title: 'React State Management',
    description: 'Learn how to manage state in React.',
    duration: '1h 30m',
  },
  {
    id: 3,
    courseId: 1,
    title: 'Introduction to JavaScript',
    description: 'Learn about JavaScript basics.',
    duration: '2h',
  },
  {
    id: 4,
    courseId: 1,
    title: 'JavaScript Functions and Loops',
    description: 'Learn how to write functions and loops in JavaScript.',
    duration: '1h 15m',
  },
  {
    id: 5,
    courseId: 2,
    title: 'CSS Basics',
    description: 'Learn about CSS fundamentals.',
    duration: '1h',
  },
  {
    id: 6,
    courseId: 2,
    title: 'Responsive Design with CSS',
    description: 'Learn how to create responsive layouts using CSS.',
    duration: '1h 45m',
  },
  {
    id: 7,
    courseId: 2,
    title: 'Node.js Introduction',
    description: 'Get an introduction to server-side JavaScript with Node.js.',
    duration: '2h 30m',
  },
  {
    id: 8,
    courseId: 3,
    title: 'Building APIs with Node.js',
    description: 'Learn how to build RESTful APIs using Node.js.',
    duration: '3h',
  },
  {
    id: 9,
    courseId: 3,
    title: 'Version Control with Git',
    description: 'Learn the basics of Git and version control.',
    duration: '1h 20m',
  },
  {
    id: 10,
    courseId: 4,
    title: 'Collaboration with GitHub',
    description: 'Learn how to collaborate with others using GitHub.',
    duration: '1h 10m',
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    courseId: 1,
    author: 'John Doe',
    rating: 5,
    content: 'Great course!',
    createdAt: '2023-01-10T00:00:00Z',
  },
  {
    id: 2,
    courseId: 1,
    author: 'Jane Smith',
    rating: 4,
    content: 'Good course, but could use more examples.',
    createdAt: '2023-02-01T00:00:00Z',
  },
  {
    id: 3,
    courseId: 1,
    author: 'Mark Johnson',
    rating: 4,
    content: 'Very informative, but I had trouble with state management.',
    createdAt: '2023-03-05T00:00:00Z',
  },
  {
    id: 4,
    courseId: 1,
    author: 'Emily Davis',
    rating: 5,
    content: 'Clear explanations and great examples!',
    createdAt: '2023-03-15T00:00:00Z',
  },
  {
    id: 5,
    courseId: 2,
    author: 'Michael Brown',
    rating: 3,
    content: 'Basic concepts, but a bit too slow for my taste.',
    createdAt: '2023-04-02T00:00:00Z',
  },
  {
    id: 6,
    courseId: 2,
    author: 'Sara Wilson',
    rating: 5,
    content: 'Excellent intro to CSS! I feel more confident now.',
    createdAt: '2023-04-10T00:00:00Z',
  },
  {
    id: 7,
    courseId: 2,
    author: 'David Harris',
    rating: 4,
    content: 'Great introduction to Node.js, but a few concepts were rushed.',
    createdAt: '2023-05-02T00:00:00Z',
  },
  {
    id: 8,
    courseId: 3,
    author: 'Olivia Martinez',
    rating: 5,
    content: 'Fantastic course! Loved learning about APIs with Node.js.',
    createdAt: '2023-06-15T00:00:00Z',
  },
  {
    id: 9,
    courseId: 3,
    author: 'James Garcia',
    rating: 4,
    content:
      'A great start for beginners in Git, but a bit too basic for experienced users.',
    createdAt: '2023-07-20T00:00:00Z',
  },
  {
    id: 10,
    courseId: 4,
    author: 'Mia Taylor',
    rating: 5,
    content: 'Very helpful! GitHub section was super useful.',
    createdAt: '2023-08-05T00:00:00Z',
  },
];
