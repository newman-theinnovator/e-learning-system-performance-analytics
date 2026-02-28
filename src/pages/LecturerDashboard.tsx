import { useAuth } from '../context/AuthContext';
import { courses, classAnalytics } from '../data/mockData';
import { BookOpen, Users, ClipboardList, AlertTriangle, ArrowRight, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

interface Props { onNavigate: (page: string) => void; }

export default function LecturerDashboard({ onNavigate }: Props) {
  const { user } = useAuth();
  if (!user) return null;

  const myCourses = courses.filter(c => c.lecturerId === user.id || true).slice(0, 4);
  const totalStudents = myCourses.reduce((a, c) => a + c.enrolledStudents, 0);
  const pendingGrading = 28;
  const ca = classAnalytics;

  const stats = [
    { label: 'My Courses', value: myCourses.length, icon: BookOpen, bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: 'Total Students', value: totalStudents, icon: Users, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { label: 'Pending Grading', value: pendingGrading, icon: ClipboardList, bg: 'bg-amber-50', color: 'text-amber-600' },
    { label: 'Class Pass Rate', value: `${ca.passRate}%`, icon: Award, bg: 'bg-purple-50', color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-800 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
        <p className="text-blue-200 text-sm mt-1">{user.staffId} • Department of {user.department}</p>
        <p className="text-blue-300 text-xs mt-2">You have {pendingGrading} submissions awaiting grading and {ca.atRiskStudents.length} at-risk students.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Score Distribution */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">SWE 401 - Score Distribution</h3>
            <button onClick={() => onNavigate('analytics')} className="text-xs text-blue-600 font-medium flex items-center gap-1">
              Full Analytics <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ca.scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {ca.scoreDistribution.map((entry, index) => (
                    <rect key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* At-Risk Students */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" /> At-Risk Students
          </h3>
          <div className="space-y-3">
            {ca.atRiskStudents.map((s, i) => (
              <div key={i} className="p-3 bg-red-50/50 rounded-lg border border-red-100">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{s.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${s.trend === 'declining' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {s.trend}
                  </span>
                </div>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span>Score: <strong className="text-red-600">{s.score}%</strong></span>
                  <span>Attendance: {s.attendance}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Trend */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-semibold mb-4">Class Performance Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ca.performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="assessment" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="classAvg" stroke="#3B82F6" strokeWidth={2} name="Class Average" />
              <Line type="monotone" dataKey="topQuartile" stroke="#10B981" strokeWidth={2} name="Top 25%" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="bottomQuartile" stroke="#EF4444" strokeWidth={2} name="Bottom 25%" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* My Courses */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">My Courses</h3>
          <button onClick={() => onNavigate('courses')} className="text-xs text-blue-600 font-medium flex items-center gap-1">
            Manage Courses <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {myCourses.map(c => (
            <div key={c.id} className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer" onClick={() => onNavigate('courseDetail')}>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{c.code}</span>
              <h4 className="font-semibold text-sm mt-2 line-clamp-2">{c.title}</h4>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <Users className="w-3 h-3" />
                <span>{c.enrolledStudents}/{c.maxStudents} students</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
