import { Instructor } from '@/src/features/instructor/types/type';
import { getAvatarUrl } from '../utils/util';

export const instructors: Instructor[] = [
  {
    id: 1,
    name: '홍길동',
    bio: '프론트엔드 개발 전문가입니다.',
    profileImage: getAvatarUrl('길동'),
    specialties: ['React', 'TypeScript', 'Next.js'],
  },
  {
    id: 2,
    name: '김철수',
    bio: '백엔드 및 클라우드 아키텍처 전문가입니다.',
    profileImage: getAvatarUrl('철수'),
    specialties: ['Node.js', 'AWS', 'Docker'],
  },
  {
    id: 3,
    name: '이영희',
    bio: '데이터 분석과 머신러닝 강의를 진행합니다.',
    profileImage: getAvatarUrl('영희'),
    specialties: ['Python', 'Pandas', 'Machine Learning'],
  },
  {
    id: 4,
    name: '박민수',
    bio: '모바일 앱 개발 경험이 풍부합니다.',
    profileImage: getAvatarUrl('민수'),
    specialties: ['React Native', 'Flutter', 'iOS'],
  },
  {
    id: 5,
    name: '최지훈',
    bio: 'DevOps 및 인프라 자동화 전문가입니다.',
    profileImage: getAvatarUrl('지훈'),
    specialties: ['Kubernetes', 'CI/CD', 'Terraform'],
  },
  {
    id: 6,
    name: '정수빈',
    bio: 'UI/UX 디자인과 협업을 전문으로 합니다.',
    profileImage: getAvatarUrl('수빈'),
    specialties: ['Figma', 'UX Research', 'Design System'],
  },
  {
    id: 7,
    name: '한도윤',
    bio: '알고리즘과 자료구조를 쉽게 설명합니다.',
    profileImage: getAvatarUrl('도윤'),
    specialties: ['Algorithm', 'Data Structure', 'Problem Solving'],
  },
  {
    id: 8,
    name: '윤서연',
    bio: '보안 및 인증 시스템 전문가입니다.',
    profileImage: getAvatarUrl('서연'),
    specialties: ['Security', 'OAuth', 'JWT'],
  },
  {
    id: 9,
    name: '강태현',
    bio: '풀스택 개발과 스타트업 경험이 풍부합니다.',
    profileImage: getAvatarUrl('태현'),
    specialties: ['Next.js', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 10,
    name: '오지은',
    bio: '테스트 자동화 및 품질 관리 전문가입니다.',
    profileImage: getAvatarUrl('지은'),
    specialties: ['Vitest', 'Testing Library', 'MSW'],
  },
];
