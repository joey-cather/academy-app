export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  progress: number;
  status: 'active' | 'completed' | 'cancelled';
  enrolledAt: string;
  completedAt?: string;
}
