import { CourseWithInstructor } from '../../course/types/type';

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
  course: CourseWithInstructor;
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

export interface DashboardCreateEnrollmentRequest {
  userId: number;
  courseId: number;
}

export interface DashboardCreateEnrollmentResponse {
  enrollmentId: number;
  message?: string;
}

export interface DashboardDeleteEnrollmentRequest {
  id: number;
}

export interface DashboardDeleteEnrollmentResponse {
  message?: string;
}
