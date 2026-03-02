import { GetCoursesParams } from '../types/type';

export const courseQueryKeys = {
  all: ['courses'] as const,
  list: (params: GetCoursesParams) =>
    [...courseQueryKeys.all, 'list', params] as const,
};
