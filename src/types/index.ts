export type UserRole = 'student' | 'lecturer' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  department: string;
  matricNo?: string;
  staffId?: string;
  level?: number;
  avatar?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  semester: 'First' | 'Second';
  level: number;
  lecturerId: string;
  lecturerName: string;
  enrolledStudents: number;
  maxStudents: number;
  modules: Module[];
  image?: string;
  category: string;
  status: 'active' | 'archived' | 'draft';
  createdAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  contents: ContentItem[];
  isCompleted?: boolean;
}

export interface ContentItem {
  id: string;
  type: 'video' | 'pdf' | 'document' | 'link' | 'text';
  title: string;
  url?: string;
  content?: string;
  duration?: string;
  size?: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  courseCode: string;
  title: string;
  type: 'quiz' | 'assignment' | 'exam';
  description: string;
  questions?: Question[];
  dueDate: string;
  totalPoints: number;
  duration?: number;
  status: 'upcoming' | 'active' | 'closed' | 'graded';
  submissions?: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string | number;
  points: number;
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  assessmentId: string;
  answers: Record<string, string | number>;
  score?: number;
  totalPoints: number;
  feedback?: string;
  submittedAt: string;
  status: 'submitted' | 'graded' | 'late';
}

export interface Grade {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  quizAvg: number;
  assignmentAvg: number;
  examScore: number;
  totalScore: number;
  grade: string;
  gradePoint: number;
}

export interface ForumPost {
  id: string;
  courseId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  title: string;
  content: string;
  replies: ForumReply[];
  likes: number;
  createdAt: string;
  isPinned?: boolean;
}

export interface ForumReply {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  likes: number;
  createdAt: string;
}

export interface Announcement {
  id: string;
  courseId?: string;
  title: string;
  content: string;
  authorName: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface AnalyticsData {
  gpaHistory: { semester: string; gpa: number }[];
  coursePerformance: { course: string; score: number; fullMark: number }[];
  weeklyActivity: { day: string; hours: number }[];
  gradeDistribution: { grade: string; count: number; color: string }[];
  engagementData: { week: string; logins: number; timeSpent: number; submissions: number }[];
  predictedGrade: { current: number; predicted: number; confidence: number };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'assignment';
  read: boolean;
  createdAt: string;
}
