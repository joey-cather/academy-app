import { authHandlers } from './authHandlers';
import { inquiryHandlers } from './inquiryHandlers';

export const handlers = [...authHandlers, ...inquiryHandlers];
