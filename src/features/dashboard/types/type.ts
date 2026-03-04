import { Course } from '../../course/types/type';

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  progress: number;
  status: 'active' | 'completed' | 'cancelled';
  enrolledAt: string;
  completedAt?: string;
}

export interface DashboardEnrollment extends Enrollment {
  course: Course;
}

export interface DashboardUpdateUserRequest {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface DashboardUpdateUserResponse {
  userId: number;
  message?: string;
}
