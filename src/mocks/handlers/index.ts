import { authHandlers } from './authHandlers';
import { courseHandlers } from './courseHandlers';
import { dashboardHandlers } from './dashboardHandlers';
import { inquiryHandlers } from './inquiryHandlers';
import { instructorHandlers } from './instructorHandlers';

export const handlers = [
  ...authHandlers,
  ...inquiryHandlers,
  ...instructorHandlers,
  ...courseHandlers,
  ...dashboardHandlers,
];
