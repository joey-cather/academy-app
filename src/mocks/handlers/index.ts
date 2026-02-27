import { authHandlers } from './authHandlers';
import { inquiryHandlers } from './inquiryHandlers';
import { instructorHandlers } from './instructorHandlers';

export const handlers = [
  ...authHandlers,
  ...inquiryHandlers,
  ...instructorHandlers,
];
