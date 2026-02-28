import { adminAnalytics, users } from '../data/mockData';
import { Users, BookOpen, TrendingUp, GraduationCap, ArrowRight, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Props { onNavigate: (page: string) => void; }

export default function AdminDashboard({ onNavigate }: Props) {
  const admin = adminAnalytics;

  const stats = [
    { label: 'Total Students', value: admin.totalStudents, icon: Users, bg: 'bg-blue-50', color: 'text-blue-600', change: '+12%' },
    { label: 'Total Lecturers', value: admin.totalLecturers, icon: GraduationCap, bg: 'bg-emerald-50', color: 'text-emerald-600', change: '+2' },
    { label: 'Active Courses', value: admin.activeCourses, icon: BookOpen, bg: 'bg-purple-50', color: 'text-purple-600', change: `/${admin.totalCourses}` },
    { label: 'Dept. Pass Rate', value: `${admin.passRate}%`, icon: TrendingUp, bg: 'bg-amber-50', color: 'text-amber-600', change: '+3%' },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#6366F1', '#F59E0B'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Department Overview</h1>
          <p className="text-gray-500 text-sm">Software Engineering Department, ADUN</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">{s.change}</span>
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enrollment Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold mb-4">Monthly Enrollment Trend</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admin.monthlyEnrollments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#1e3a5f" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Level Distribution */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold mb-4">Students by Level</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={admin.departmentPerformance} dataKey="students" nameKey="level" cx="50%" cy="50%" outerRadius={80} label={({ name, value }: any) => `${name}: ${value}`}>
                  {admin.departmentPerformance.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Level Performance Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-semibold mb-4">Performance by Level</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Students</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Avg GPA</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Pass Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {admin.departmentPerformance.map((dp, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{dp.level}</td>
                  <td className="py-3 px-4">{dp.students}</td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${dp.avgGPA >= 3.5 ? 'text-emerald-600' : dp.avgGPA >= 3.0 ? 'text-blue-600' : 'text-amber-600'}`}>{dp.avgGPA}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-100 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${dp.passRate}%` }} />
                      </div>
                      <span className="text-xs font-medium">{dp.passRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${dp.passRate >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {dp.passRate >= 85 ? 'Good' : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Popularity & User Management */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold mb-4">Most Popular Courses</h3>
          <div className="space-y-3">
            {admin.coursePopularity.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{c.course}</span>
                    <span className="text-xs text-gray-500">{c.enrolled} students</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full" style={{ width: `${(c.enrolled / 65) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Users</h3>
            <button onClick={() => onNavigate('users')} className="text-xs text-blue-600 font-medium flex items-center gap-1">
              Manage Users <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {users.slice(0, 5).map(u => (
              <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-xs ${u.role === 'student' ? 'bg-emerald-500' : u.role === 'lecturer' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                  {u.firstName[0]}{u.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{u.firstName} {u.lastName}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${u.role === 'student' ? 'bg-emerald-50 text-emerald-700' : u.role === 'lecturer' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
