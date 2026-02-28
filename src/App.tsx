import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import LecturerDashboard from './pages/LecturerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AssessmentsPage from './pages/AssessmentsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import GradebookPage from './pages/GradebookPage';
import ForumPage from './pages/ForumPage';
import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) return <LoginPage />;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        if (user?.role === 'lecturer') return <LecturerDashboard onNavigate={setCurrentPage} />;
        if (user?.role === 'admin') return <AdminDashboard onNavigate={setCurrentPage} />;
        return <StudentDashboard onNavigate={setCurrentPage} />;
      case 'courses':
        return <CoursesPage onNavigate={setCurrentPage} />;
      case 'courseDetail':
        return <CourseDetailPage onNavigate={setCurrentPage} />;
      case 'assessments':
        return <AssessmentsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'gradebook':
        return <GradebookPage />;
      case 'forum':
        return <ForumPage />;
      case 'profile':
        return <ProfilePage />;
      case 'users':
        return <UsersManagement />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <StudentDashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function UsersManagement() {
  const users = [
    { id: 'STU001', name: 'Chidera Okafor', email: 'chidera.okafor@adun.edu.ng', role: 'student', level: 400, status: 'active' },
    { id: 'STU002', name: 'Amina Bello', email: 'amina.bello@adun.edu.ng', role: 'student', level: 400, status: 'active' },
    { id: 'STU003', name: 'Emeka Nwosu', email: 'emeka.nwosu@adun.edu.ng', role: 'student', level: 400, status: 'active' },
    { id: 'STU004', name: 'Fatima Abdullahi', email: 'fatima.abdullahi@adun.edu.ng', role: 'student', level: 300, status: 'active' },
    { id: 'STU005', name: 'Tunde Adeyemi', email: 'tunde.adeyemi@adun.edu.ng', role: 'student', level: 300, status: 'inactive' },
    { id: 'LEC001', name: 'Dr. Ngozi Eze', email: 'ngozi.eze@adun.edu.ng', role: 'lecturer', status: 'active' },
    { id: 'LEC002', name: 'Prof. Ibrahim Musa', email: 'ibrahim.musa@adun.edu.ng', role: 'lecturer', status: 'active' },
    { id: 'ADM001', name: 'Dr. Oluwaseun Adeyinka', email: 'admin@adun.edu.ng', role: 'admin', status: 'active' },
  ];
  const [search, setSearch] = useState('');
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-500 text-sm">{users.length} total users</p>
        </div>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">+ Add User</button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${u.role === 'student' ? 'bg-emerald-500' : u.role === 'lecturer' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                        {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${u.role === 'student' ? 'bg-emerald-50 text-emerald-700' : u.role === 'lecturer' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>{u.role}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{u.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium mr-3">Edit</button>
                    <button className="text-xs text-red-600 hover:text-red-800 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">System Settings</h1>
      <div className="space-y-4">
        {[
          { title: 'General Settings', desc: 'Platform name, logo, and branding', items: ['Platform Name: ADUN E-Learn', 'Department: Software Engineering', 'University: Admiralty University of Nigeria'] },
          { title: 'Academic Settings', desc: 'Semester, grading system, and enrollment', items: ['Current Session: 2024/2025', 'Active Semester: Second Semester', 'Grading System: 5.0 Scale'] },
          { title: 'Security Settings', desc: 'Authentication, access control, and data protection', items: ['2FA: Disabled', 'Session Timeout: 30 minutes', 'Password Policy: Strong'] },
          { title: 'Email & Notifications', desc: 'SMTP settings and notification preferences', items: ['SMTP Server: Configured', 'Email Notifications: Enabled', 'Push Notifications: Disabled'] },
        ].map((section, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold">{section.title}</h3>
            <p className="text-xs text-gray-500 mb-3">{section.desc}</p>
            <div className="space-y-2">
              {section.items.map((item, j) => (
                <div key={j} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                  <span className="text-gray-600">{item.split(':')[0]}</span>
                  <span className="font-medium">{item.split(':')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
