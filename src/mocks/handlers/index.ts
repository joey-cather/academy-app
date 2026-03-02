import { authHandlers } from './authHandlers';
import { courseHandlers } from './courseHandlers';
import { inquiryHandlers } from './inquiryHandlers';
import { instructorHandlers } from './instructorHandlers';

export const handlers = [
  ...authHandlers,
  ...inquiryHandlers,
  ...instructorHandlers,
  ...courseHandlers,
];
