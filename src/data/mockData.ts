import { User, Course, Assessment, Grade, ForumPost, Announcement, AnalyticsData, Notification, Submission } from '../types';

export const users: User[] = [
  { id: 'STU001', firstName: 'Chidera', lastName: 'Okafor', email: 'chidera.okafor@adun.edu.ng', role: 'student', department: 'Software Engineering', matricNo: 'ADUN/SWE/20/001', level: 400, createdAt: '2020-09-01' },
  { id: 'STU002', firstName: 'Amina', lastName: 'Bello', email: 'amina.bello@adun.edu.ng', role: 'student', department: 'Software Engineering', matricNo: 'ADUN/SWE/20/002', level: 400, createdAt: '2020-09-01' },
  { id: 'STU003', firstName: 'Emeka', lastName: 'Nwosu', email: 'emeka.nwosu@adun.edu.ng', role: 'student', department: 'Software Engineering', matricNo: 'ADUN/SWE/20/003', level: 400, createdAt: '2020-09-01' },
  { id: 'STU004', firstName: 'Fatima', lastName: 'Abdullahi', email: 'fatima.abdullahi@adun.edu.ng', role: 'student', department: 'Software Engineering', matricNo: 'ADUN/SWE/21/004', level: 300, createdAt: '2021-09-01' },
  { id: 'STU005', firstName: 'Tunde', lastName: 'Adeyemi', email: 'tunde.adeyemi@adun.edu.ng', role: 'student', department: 'Software Engineering', matricNo: 'ADUN/SWE/21/005', level: 300, createdAt: '2021-09-01' },
  { id: 'LEC001', firstName: 'Dr. Ngozi', lastName: 'Eze', email: 'ngozi.eze@adun.edu.ng', role: 'lecturer', department: 'Software Engineering', staffId: 'ADUN/STAFF/015', createdAt: '2018-01-15' },
  { id: 'LEC002', firstName: 'Prof. Ibrahim', lastName: 'Musa', email: 'ibrahim.musa@adun.edu.ng', role: 'lecturer', department: 'Software Engineering', staffId: 'ADUN/STAFF/008', createdAt: '2015-08-20' },
  { id: 'ADM001', firstName: 'Dr. Oluwaseun', lastName: 'Adeyinka', email: 'admin@adun.edu.ng', role: 'admin', department: 'Software Engineering', staffId: 'ADUN/STAFF/001', createdAt: '2014-03-10' },
];

export const courses: Course[] = [
  {
    id: 'CRS001', code: 'SWE 401', title: 'Software Design & Architecture', description: 'Advanced study of software design patterns, architectural styles (MVC, microservices, event-driven), SOLID principles, and design for scalability. Students will design and document a complete system architecture.', semester: 'First', level: 400, lecturerId: 'LEC001', lecturerName: 'Dr. Ngozi Eze', enrolledStudents: 45, maxStudents: 60, category: 'Core', status: 'active', createdAt: '2024-09-01',
    modules: [
      { id: 'M001', title: 'Introduction to Software Architecture', description: 'Overview of architectural concepts', order: 1, isCompleted: true, contents: [
        { id: 'C001', type: 'video', title: 'What is Software Architecture?', duration: '45 min' },
        { id: 'C002', type: 'pdf', title: 'Architecture Styles Overview', size: '2.4 MB' },
        { id: 'C003', type: 'text', title: 'Key Terminology', content: 'Comprehensive glossary...' },
      ]},
      { id: 'M002', title: 'Design Patterns', description: 'GoF and modern patterns', order: 2, isCompleted: true, contents: [
        { id: 'C004', type: 'video', title: 'Creational Patterns Deep Dive', duration: '60 min' },
        { id: 'C005', type: 'pdf', title: 'Pattern Catalog', size: '5.1 MB' },
      ]},
      { id: 'M003', title: 'SOLID Principles', description: 'Writing maintainable code', order: 3, isCompleted: false, contents: [
        { id: 'C006', type: 'video', title: 'SOLID in Practice', duration: '55 min' },
        { id: 'C007', type: 'document', title: 'SOLID Exercises', size: '1.2 MB' },
      ]},
      { id: 'M004', title: 'Microservices Architecture', description: 'Distributed systems design', order: 4, isCompleted: false, contents: [
        { id: 'C008', type: 'video', title: 'Building Microservices', duration: '70 min' },
        { id: 'C009', type: 'link', title: 'Martin Fowler - Microservices', url: 'https://martinfowler.com/microservices/' },
      ]},
    ]
  },
  {
    id: 'CRS002', code: 'SWE 403', title: 'Artificial Intelligence & Machine Learning', description: 'Fundamentals of AI/ML including supervised/unsupervised learning, neural networks, NLP basics, and practical implementation with Python/TensorFlow. Focus on real-world Nigerian industry applications.', semester: 'First', level: 400, lecturerId: 'LEC002', lecturerName: 'Prof. Ibrahim Musa', enrolledStudents: 52, maxStudents: 60, category: 'Core', status: 'active', createdAt: '2024-09-01',
    modules: [
      { id: 'M005', title: 'Introduction to AI', description: 'History and fundamentals', order: 1, isCompleted: true, contents: [
        { id: 'C010', type: 'video', title: 'AI: Past, Present, Future', duration: '50 min' },
        { id: 'C011', type: 'pdf', title: 'AI Overview Notes', size: '3.2 MB' },
      ]},
      { id: 'M006', title: 'Machine Learning Basics', description: 'Supervised & unsupervised learning', order: 2, isCompleted: false, contents: [
        { id: 'C012', type: 'video', title: 'ML Algorithms Explained', duration: '65 min' },
        { id: 'C013', type: 'pdf', title: 'ML Lab Manual', size: '4.5 MB' },
      ]},
    ]
  },
  {
    id: 'CRS003', code: 'SWE 305', title: 'Database Systems & Design', description: 'Relational database design, SQL, normalization, indexing, transactions, NoSQL databases, and ORM tools. Practical projects using PostgreSQL and MongoDB.', semester: 'First', level: 300, lecturerId: 'LEC001', lecturerName: 'Dr. Ngozi Eze', enrolledStudents: 58, maxStudents: 65, category: 'Core', status: 'active', createdAt: '2024-09-01',
    modules: [
      { id: 'M007', title: 'Relational Model', description: 'Tables, keys, relationships', order: 1, isCompleted: true, contents: [
        { id: 'C014', type: 'video', title: 'ER Diagrams Masterclass', duration: '40 min' },
        { id: 'C015', type: 'pdf', title: 'Database Design Guide', size: '2.8 MB' },
      ]},
    ]
  },
  {
    id: 'CRS004', code: 'SWE 307', title: 'Web Technologies & Frameworks', description: 'Modern web development with HTML5, CSS3, JavaScript/TypeScript, React, Node.js, RESTful APIs, and deployment. Build production-ready web applications.', semester: 'Second', level: 300, lecturerId: 'LEC002', lecturerName: 'Prof. Ibrahim Musa', enrolledStudents: 61, maxStudents: 65, category: 'Core', status: 'active', createdAt: '2024-09-01',
    modules: [
      { id: 'M008', title: 'Modern JavaScript', description: 'ES6+ features and TypeScript', order: 1, isCompleted: true, contents: [] },
      { id: 'M009', title: 'React Fundamentals', description: 'Components, hooks, state management', order: 2, isCompleted: false, contents: [] },
    ]
  },
  {
    id: 'CRS005', code: 'SWE 405', title: 'Software Project Management', description: 'Agile/Scrum methodologies, project planning, risk management, team dynamics, and software estimation techniques. Real project experience with industry tools.', semester: 'Second', level: 400, lecturerId: 'LEC001', lecturerName: 'Dr. Ngozi Eze', enrolledStudents: 40, maxStudents: 60, category: 'Elective', status: 'active', createdAt: '2024-09-01',
    modules: []
  },
  {
    id: 'CRS006', code: 'SWE 407', title: 'Cybersecurity Fundamentals', description: 'Network security, cryptography, ethical hacking, secure coding practices, OWASP Top 10, and security auditing. Hands-on labs with Kali Linux.', semester: 'First', level: 400, lecturerId: 'LEC002', lecturerName: 'Prof. Ibrahim Musa', enrolledStudents: 38, maxStudents: 50, category: 'Elective', status: 'active', createdAt: '2024-09-01',
    modules: []
  },
];

export const assessments: Assessment[] = [
  { id: 'ASS001', courseId: 'CRS001', courseCode: 'SWE 401', title: 'Design Patterns Quiz', type: 'quiz', description: 'Test your knowledge of GoF design patterns', dueDate: '2025-02-15', totalPoints: 20, duration: 30, status: 'graded', submissions: 42,
    questions: [
      { id: 'Q001', text: 'Which pattern provides a way to access elements of an aggregate object sequentially?', type: 'mcq', options: ['Observer', 'Iterator', 'Strategy', 'Factory'], correctAnswer: 1, points: 4 },
      { id: 'Q002', text: 'The Singleton pattern ensures a class has only one instance.', type: 'true_false', options: ['True', 'False'], correctAnswer: 0, points: 4 },
      { id: 'Q003', text: 'Name the three categories of GoF design patterns.', type: 'short_answer', correctAnswer: 'Creational, Structural, Behavioral', points: 4 },
      { id: 'Q004', text: 'Which principle states that classes should be open for extension but closed for modification?', type: 'mcq', options: ['SRP', 'OCP', 'LSP', 'DIP'], correctAnswer: 1, points: 4 },
      { id: 'Q005', text: 'The Factory Method pattern uses inheritance to decide the object to be instantiated.', type: 'true_false', options: ['True', 'False'], correctAnswer: 0, points: 4 },
    ]
  },
  { id: 'ASS002', courseId: 'CRS001', courseCode: 'SWE 401', title: 'Architecture Documentation Assignment', type: 'assignment', description: 'Document the architecture of a given system using C4 model and UML diagrams', dueDate: '2025-02-28', totalPoints: 30, status: 'active', submissions: 28 },
  { id: 'ASS003', courseId: 'CRS002', courseCode: 'SWE 403', title: 'ML Basics Quiz', type: 'quiz', description: 'Quiz on supervised vs unsupervised learning', dueDate: '2025-02-20', totalPoints: 25, duration: 45, status: 'active', submissions: 35,
    questions: [
      { id: 'Q006', text: 'Which of the following is a supervised learning algorithm?', type: 'mcq', options: ['K-Means', 'Linear Regression', 'PCA', 'DBSCAN'], correctAnswer: 1, points: 5 },
      { id: 'Q007', text: 'K-Means is a supervised learning algorithm.', type: 'true_false', options: ['True', 'False'], correctAnswer: 1, points: 5 },
      { id: 'Q008', text: 'What is overfitting in machine learning?', type: 'short_answer', correctAnswer: 'When a model learns training data too well and fails to generalize', points: 5 },
      { id: 'Q009', text: 'Which metric is commonly used for regression problems?', type: 'mcq', options: ['Accuracy', 'F1 Score', 'RMSE', 'AUC-ROC'], correctAnswer: 2, points: 5 },
      { id: 'Q010', text: 'Neural networks are inspired by biological neurons.', type: 'true_false', options: ['True', 'False'], correctAnswer: 0, points: 5 },
    ]
  },
  { id: 'ASS004', courseId: 'CRS003', courseCode: 'SWE 305', title: 'Database Normalization Quiz', type: 'quiz', description: 'Test on 1NF, 2NF, 3NF, and BCNF', dueDate: '2025-03-01', totalPoints: 20, duration: 25, status: 'upcoming', submissions: 0 },
  { id: 'ASS005', courseId: 'CRS002', courseCode: 'SWE 403', title: 'AI Ethics Research Paper', type: 'assignment', description: 'Write a 2000-word research paper on ethical considerations in AI deployment in Nigeria', dueDate: '2025-03-10', totalPoints: 40, status: 'active', submissions: 12 },
  { id: 'ASS006', courseId: 'CRS004', courseCode: 'SWE 307', title: 'React Project Submission', type: 'assignment', description: 'Build a complete CRUD application using React and a REST API', dueDate: '2025-03-15', totalPoints: 50, status: 'upcoming', submissions: 0 },
];

export const submissions: Submission[] = [
  { id: 'SUB001', studentId: 'STU001', studentName: 'Chidera Okafor', assessmentId: 'ASS001', answers: { Q001: 1, Q002: 0, Q003: 'Creational, Structural, Behavioral', Q004: 1, Q005: 0 }, score: 18, totalPoints: 20, feedback: 'Excellent work! Minor error on Q3 formatting.', submittedAt: '2025-02-14T10:30:00', status: 'graded' },
  { id: 'SUB002', studentId: 'STU002', studentName: 'Amina Bello', assessmentId: 'ASS001', answers: { Q001: 1, Q002: 0, Q003: 'Creational, Behavioral', Q004: 0, Q005: 0 }, score: 12, totalPoints: 20, feedback: 'Good attempt. Review SOLID principles and pattern categories.', submittedAt: '2025-02-14T14:20:00', status: 'graded' },
  { id: 'SUB003', studentId: 'STU003', studentName: 'Emeka Nwosu', assessmentId: 'ASS001', answers: { Q001: 1, Q002: 0, Q003: 'Creational, Structural, Behavioral', Q004: 1, Q005: 1 }, score: 16, totalPoints: 20, feedback: 'Very good! Review Factory Method pattern.', submittedAt: '2025-02-15T09:00:00', status: 'graded' },
  { id: 'SUB004', studentId: 'STU001', studentName: 'Chidera Okafor', assessmentId: 'ASS002', answers: {}, score: undefined, totalPoints: 30, submittedAt: '2025-02-26T16:45:00', status: 'submitted' },
];

export const grades: Grade[] = [
  { courseId: 'CRS001', courseCode: 'SWE 401', courseTitle: 'Software Design & Architecture', quizAvg: 85, assignmentAvg: 78, examScore: 72, totalScore: 78, grade: 'B+', gradePoint: 4.0 },
  { courseId: 'CRS002', courseCode: 'SWE 403', courseTitle: 'AI & Machine Learning', quizAvg: 92, assignmentAvg: 88, examScore: 85, totalScore: 88, grade: 'A', gradePoint: 5.0 },
  { courseId: 'CRS003', courseCode: 'SWE 305', courseTitle: 'Database Systems & Design', quizAvg: 70, assignmentAvg: 75, examScore: 68, totalScore: 71, grade: 'B', gradePoint: 3.5 },
  { courseId: 'CRS004', courseCode: 'SWE 307', courseTitle: 'Web Technologies & Frameworks', quizAvg: 95, assignmentAvg: 92, examScore: 90, totalScore: 92, grade: 'A', gradePoint: 5.0 },
  { courseId: 'CRS006', courseCode: 'SWE 407', courseTitle: 'Cybersecurity Fundamentals', quizAvg: 65, assignmentAvg: 70, examScore: 60, totalScore: 65, grade: 'C+', gradePoint: 3.0 },
];

export const forumPosts: ForumPost[] = [
  { id: 'FP001', courseId: 'CRS001', authorId: 'STU001', authorName: 'Chidera Okafor', authorRole: 'student', title: 'Difference between Strategy and State Pattern?', content: 'I\'m confused about when to use Strategy vs State pattern. They seem similar in structure. Can someone explain the key differences with a practical example?', likes: 12, isPinned: false, createdAt: '2025-02-10T08:30:00',
    replies: [
      { id: 'R001', authorId: 'LEC001', authorName: 'Dr. Ngozi Eze', authorRole: 'lecturer', content: 'Great question! The key difference is intent. Strategy is about interchangeable algorithms (e.g., different sorting methods). State is about changing behavior when internal state changes (e.g., a TCP connection moving between states). The structure is similar, but the purpose differs.', likes: 8, createdAt: '2025-02-10T10:15:00' },
      { id: 'R002', authorId: 'STU003', authorName: 'Emeka Nwosu', authorRole: 'student', content: 'Think of it this way: in Strategy, the CLIENT decides which algorithm to use. In State, the CONTEXT (object) changes behavior automatically based on its current state.', likes: 5, createdAt: '2025-02-10T11:00:00' },
    ]
  },
  { id: 'FP002', courseId: 'CRS002', authorId: 'STU002', authorName: 'Amina Bello', authorRole: 'student', title: 'Python vs R for ML projects?', content: 'For our final project, should we use Python or R? I know Python is more popular but R has great statistical libraries.', likes: 7, isPinned: false, createdAt: '2025-02-12T14:00:00',
    replies: [
      { id: 'R003', authorId: 'LEC002', authorName: 'Prof. Ibrahim Musa', authorRole: 'lecturer', content: 'For this course, I recommend Python. It has a much larger ecosystem (TensorFlow, PyTorch, scikit-learn), better industry adoption in Nigeria, and integrates well with web applications. R is excellent for pure statistics, but Python is more versatile for your careers.', likes: 15, createdAt: '2025-02-12T16:30:00' },
    ]
  },
  { id: 'FP003', courseId: 'CRS001', authorId: 'LEC001', authorName: 'Dr. Ngozi Eze', authorRole: 'lecturer', title: '📌 Mid-Semester Project Guidelines', content: 'Please note the following for your architecture documentation project:\n\n1. Use C4 model (Context, Container, Component, Code)\n2. Include at least 3 UML diagrams\n3. Submit as PDF via the platform\n4. Deadline: Feb 28, 2025\n\nNo extensions will be granted.', likes: 23, isPinned: true, createdAt: '2025-02-08T09:00:00', replies: [] },
];

export const announcements: Announcement[] = [
  { id: 'ANN001', title: 'Welcome to Second Semester 2024/2025', content: 'Welcome back to all Software Engineering students. Lectures commence Monday, January 13th. Please check your course registrations.', authorName: 'Dr. Oluwaseun Adeyinka', priority: 'high', createdAt: '2025-01-10T08:00:00' },
  { id: 'ANN002', courseId: 'CRS001', title: 'SWE 401 - Class Rescheduled', content: 'Thursday\'s class has been moved to Friday 2:00 PM - 4:00 PM in LT3. Please take note.', authorName: 'Dr. Ngozi Eze', priority: 'medium', createdAt: '2025-02-05T12:00:00' },
  { id: 'ANN003', title: 'ADUN Hackathon 2025', content: 'The annual ADUN Software Engineering Hackathon is scheduled for March 15-16. Theme: "Tech Solutions for Nigerian Communities." Register at the department office.', authorName: 'Dr. Oluwaseun Adeyinka', priority: 'medium', createdAt: '2025-02-01T10:00:00' },
  { id: 'ANN004', courseId: 'CRS002', title: 'SWE 403 - Guest Lecture on AI in Healthcare', content: 'We will have a guest lecture by Dr. Amara from Google DeepMind on Feb 25th. Attendance is mandatory.', authorName: 'Prof. Ibrahim Musa', priority: 'high', createdAt: '2025-02-15T09:00:00' },
];

export const studentAnalytics: AnalyticsData = {
  gpaHistory: [
    { semester: '100L 1st', gpa: 3.2 },
    { semester: '100L 2nd', gpa: 3.5 },
    { semester: '200L 1st', gpa: 3.8 },
    { semester: '200L 2nd', gpa: 3.6 },
    { semester: '300L 1st', gpa: 4.0 },
    { semester: '300L 2nd', gpa: 4.2 },
    { semester: '400L 1st', gpa: 4.1 },
  ],
  coursePerformance: [
    { course: 'SWE 401', score: 78, fullMark: 100 },
    { course: 'SWE 403', score: 88, fullMark: 100 },
    { course: 'SWE 305', score: 71, fullMark: 100 },
    { course: 'SWE 307', score: 92, fullMark: 100 },
    { course: 'SWE 407', score: 65, fullMark: 100 },
  ],
  weeklyActivity: [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 2.8 },
    { day: 'Wed', hours: 4.2 },
    { day: 'Thu', hours: 1.5 },
    { day: 'Fri', hours: 3.0 },
    { day: 'Sat', hours: 5.5 },
    { day: 'Sun', hours: 2.0 },
  ],
  gradeDistribution: [
    { grade: 'A', count: 2, color: '#10B981' },
    { grade: 'B+', count: 1, color: '#3B82F6' },
    { grade: 'B', count: 1, color: '#6366F1' },
    { grade: 'C+', count: 1, color: '#F59E0B' },
  ],
  engagementData: [
    { week: 'Week 1', logins: 5, timeSpent: 12, submissions: 2 },
    { week: 'Week 2', logins: 7, timeSpent: 18, submissions: 3 },
    { week: 'Week 3', logins: 4, timeSpent: 10, submissions: 1 },
    { week: 'Week 4', logins: 8, timeSpent: 22, submissions: 4 },
    { week: 'Week 5', logins: 6, timeSpent: 15, submissions: 2 },
    { week: 'Week 6', logins: 9, timeSpent: 25, submissions: 5 },
    { week: 'Week 7', logins: 7, timeSpent: 20, submissions: 3 },
    { week: 'Week 8', logins: 10, timeSpent: 28, submissions: 4 },
  ],
  predictedGrade: { current: 78.8, predicted: 81.5, confidence: 85 },
  strengths: ['Web Development (SWE 307)', 'AI & Machine Learning (SWE 403)', 'Problem Solving', 'Consistent Submission'],
  weaknesses: ['Cybersecurity (SWE 407)', 'Database Optimization', 'Time Management on Thursdays'],
  recommendations: [
    'Focus more on SWE 407 - Cybersecurity. Your current score (65%) puts you at risk. Review OWASP Top 10 materials.',
    'Increase study time on Thursdays - your activity drops significantly mid-week.',
    'You excel at practical/coding courses. Consider joining the ADUN Hackathon to strengthen your portfolio.',
    'Your GPA trend is positive! Maintain current study habits for SWE 403 and SWE 307.',
    'Practice more SQL optimization exercises for Database Systems improvement.',
  ],
};

export const notifications: Notification[] = [
  { id: 'N001', title: 'Assignment Due Soon', message: 'SWE 401 Architecture Documentation is due in 2 days.', type: 'warning', read: false, createdAt: '2025-02-26T08:00:00' },
  { id: 'N002', title: 'Quiz Graded', message: 'Your SWE 401 Design Patterns Quiz has been graded. Score: 18/20', type: 'success', read: false, createdAt: '2025-02-16T10:00:00' },
  { id: 'N003', title: 'New Course Material', message: 'Prof. Ibrahim Musa uploaded new materials for SWE 403.', type: 'info', read: true, createdAt: '2025-02-14T09:00:00' },
  { id: 'N004', title: 'Forum Reply', message: 'Dr. Ngozi Eze replied to your post about Strategy vs State Pattern.', type: 'info', read: true, createdAt: '2025-02-10T10:15:00' },
  { id: 'N005', title: 'New Assignment', message: 'A new assignment has been posted for SWE 403: AI Ethics Research Paper.', type: 'assignment', read: false, createdAt: '2025-02-12T12:00:00' },
];

// Class-level analytics for lecturers
export const classAnalytics = {
  courseId: 'CRS001',
  courseCode: 'SWE 401',
  totalStudents: 45,
  averageScore: 72.5,
  highestScore: 95,
  lowestScore: 38,
  passRate: 82,
  submissionRate: 93,
  scoreDistribution: [
    { range: '0-39', count: 2, color: '#EF4444' },
    { range: '40-49', count: 4, color: '#F97316' },
    { range: '50-59', count: 6, color: '#F59E0B' },
    { range: '60-69', count: 10, color: '#EAB308' },
    { range: '70-79', count: 12, color: '#22C55E' },
    { range: '80-89', count: 7, color: '#3B82F6' },
    { range: '90-100', count: 4, color: '#6366F1' },
  ],
  weeklyEngagement: [
    { week: 'W1', avgLogins: 4.2, avgTimeSpent: 8.5 },
    { week: 'W2', avgLogins: 5.1, avgTimeSpent: 11.2 },
    { week: 'W3', avgLogins: 3.8, avgTimeSpent: 7.8 },
    { week: 'W4', avgLogins: 6.5, avgTimeSpent: 14.3 },
    { week: 'W5', avgLogins: 5.8, avgTimeSpent: 12.1 },
    { week: 'W6', avgLogins: 7.2, avgTimeSpent: 16.8 },
    { week: 'W7', avgLogins: 6.1, avgTimeSpent: 13.5 },
    { week: 'W8', avgLogins: 8.0, avgTimeSpent: 18.2 },
  ],
  atRiskStudents: [
    { id: 'STU010', name: 'Blessing Okoro', score: 38, attendance: 45, trend: 'declining' },
    { id: 'STU011', name: 'Yusuf Garba', score: 42, attendance: 55, trend: 'stable' },
    { id: 'STU012', name: 'Chiamaka Ubi', score: 48, attendance: 60, trend: 'declining' },
    { id: 'STU013', name: 'David Okonkwo', score: 44, attendance: 50, trend: 'declining' },
  ],
  topStudents: [
    { id: 'STU001', name: 'Chidera Okafor', score: 90, trend: 'rising' },
    { id: 'STU014', name: 'Zainab Ahmed', score: 95, trend: 'stable' },
    { id: 'STU003', name: 'Emeka Nwosu', score: 88, trend: 'rising' },
  ],
  performanceTrend: [
    { assessment: 'Quiz 1', classAvg: 68, topQuartile: 85, bottomQuartile: 45 },
    { assessment: 'Assignment 1', classAvg: 72, topQuartile: 88, bottomQuartile: 50 },
    { assessment: 'Quiz 2', classAvg: 70, topQuartile: 90, bottomQuartile: 42 },
    { assessment: 'Assignment 2', classAvg: 75, topQuartile: 92, bottomQuartile: 55 },
    { assessment: 'Mid-Term', classAvg: 71, topQuartile: 88, bottomQuartile: 48 },
  ],
};

// Admin-level analytics
export const adminAnalytics = {
  totalStudents: 245,
  totalLecturers: 12,
  totalCourses: 24,
  activeCourses: 18,
  avgGPA: 3.45,
  passRate: 85,
  departmentPerformance: [
    { level: '100 Level', students: 65, avgGPA: 3.2, passRate: 80 },
    { level: '200 Level', students: 58, avgGPA: 3.4, passRate: 83 },
    { level: '300 Level', students: 62, avgGPA: 3.5, passRate: 86 },
    { level: '400 Level', students: 60, avgGPA: 3.7, passRate: 90 },
  ],
  monthlyEnrollments: [
    { month: 'Sep', count: 120 },
    { month: 'Oct', count: 85 },
    { month: 'Nov', count: 25 },
    { month: 'Dec', count: 5 },
    { month: 'Jan', count: 110 },
    { month: 'Feb', count: 45 },
  ],
  coursePopularity: [
    { course: 'SWE 307', enrolled: 61 },
    { course: 'SWE 305', enrolled: 58 },
    { course: 'SWE 403', enrolled: 52 },
    { course: 'SWE 401', enrolled: 45 },
    { course: 'SWE 405', enrolled: 40 },
    { course: 'SWE 407', enrolled: 38 },
  ],
};
