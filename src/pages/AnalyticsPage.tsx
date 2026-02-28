import { useAuth } from '../context/AuthContext';
import { studentAnalytics, classAnalytics, adminAnalytics } from '../data/mockData';
import { TrendingUp, Target, Brain, Activity, Download } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';

export default function AnalyticsPage() {
  const { user } = useAuth();
  if (!user) return null;
  const analytics = studentAnalytics;
  const ca = classAnalytics;
  const aa = adminAnalytics;
  const COLORS = ['#10B981', '#3B82F6', '#6366F1', '#F59E0B', '#EF4444'];

  if (user.role === 'student') {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Performance Analytics</h1>
            <p className="text-gray-500 text-sm">Track your academic progress and get personalized insights</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800"><Download className="w-4 h-4" /> Export Report</button>
        </div>

        {/* Prediction Card */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-800 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3"><Brain className="w-5 h-5 text-purple-300" /><h3 className="font-semibold">AI Grade Prediction</h3></div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <p className="text-xs text-purple-200">Current Average</p>
              <p className="text-3xl font-bold mt-1">{analytics.predictedGrade.current}%</p>
              <p className="text-xs text-purple-300 mt-1">Based on all assessments</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <p className="text-xs text-purple-200">Predicted Final Grade</p>
              <p className="text-3xl font-bold mt-1 text-amber-400">{analytics.predictedGrade.predicted}%</p>
              <p className="text-xs text-purple-300 mt-1">Using trend analysis</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <p className="text-xs text-purple-200">Model Confidence</p>
              <p className="text-3xl font-bold mt-1 text-emerald-400">{analytics.predictedGrade.confidence}%</p>
              <p className="text-xs text-purple-300 mt-1">Based on data completeness</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* GPA Trend */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-blue-600" /> GPA Progression</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.gpaHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="semester" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="gpa" stroke="#1e3a5f" fill="#1e3a5f" fillOpacity={0.1} strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-purple-600" /> Course Performance Radar</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={analytics.coursePerformance}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="course" tick={{ fontSize: 11 }} />
                  <Radar name="Score" dataKey="score" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Activity */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-600" /> Weekly Study Hours</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Engagement Over Time */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold mb-4">Engagement Metrics</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="logins" stroke="#3B82F6" strokeWidth={2} name="Logins" />
                  <Line type="monotone" dataKey="timeSpent" stroke="#10B981" strokeWidth={2} name="Hours Spent" />
                  <Line type="monotone" dataKey="submissions" stroke="#F59E0B" strokeWidth={2} name="Submissions" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Grade Distribution + Strengths/Weaknesses */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold mb-4">Grade Distribution</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={analytics.gradeDistribution} dataKey="count" nameKey="grade" cx="50%" cy="50%" outerRadius={75} label={({ name, value }: any) => `${name}: ${value}`}>
                    {analytics.gradeDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold mb-4 text-emerald-700">💪 Strengths</h3>
            <div className="space-y-2">
              {analytics.strengths.map((s, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg">
                  <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-bold text-emerald-700">{i + 1}</span>
                  <span className="text-sm text-emerald-800">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold mb-4 text-amber-700">⚠️ Areas to Improve</h3>
            <div className="space-y-2">
              {analytics.weaknesses.map((w, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                  <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-bold text-amber-700">{i + 1}</span>
                  <span className="text-sm text-amber-800">{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold mb-4">🤖 Personalized Recommendations</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {analytics.recommendations.map((rec, i) => (
              <div key={i} className={`p-4 rounded-xl border ${i === 0 ? 'bg-red-50 border-red-100' : i < 3 ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'}`}>
                <p className="text-sm text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Lecturer Analytics
  if (user.role === 'lecturer') {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Class Analytics</h1>
            <p className="text-gray-500 text-sm">{ca.courseCode} - {ca.totalStudents} students enrolled</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800"><Download className="w-4 h-4" /> Export</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Class Average', value: `${ca.averageScore}%`, color: 'bg-blue-50 text-blue-600' },
            { label: 'Pass Rate', value: `${ca.passRate}%`, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Highest Score', value: `${ca.highestScore}%`, color: 'bg-purple-50 text-purple-600' },
            { label: 'Submission Rate', value: `${ca.submissionRate}%`, color: 'bg-amber-50 text-amber-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold mb-4">Score Distribution</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ca.scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {ca.scoreDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold mb-4">Performance Trend</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ca.performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="assessment" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="classAvg" stroke="#3B82F6" strokeWidth={2} name="Class Avg" />
                  <Line type="monotone" dataKey="topQuartile" stroke="#10B981" strokeWidth={2} name="Top 25%" />
                  <Line type="monotone" dataKey="bottomQuartile" stroke="#EF4444" strokeWidth={2} name="Bottom 25%" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold mb-4">Engagement Heatmap</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ca.weeklyEngagement}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="avgLogins" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} name="Avg Logins" />
                  <Area type="monotone" dataKey="avgTimeSpent" stroke="#10B981" fill="#10B981" fillOpacity={0.1} name="Avg Hours" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold mb-4">Top Performers</h3>
            <div className="space-y-3">
              {ca.topStudents.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <span className="text-lg">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                  <div className="flex-1"><p className="font-medium text-sm">{s.name}</p></div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">{s.score}%</p>
                    <span className="text-[10px] text-gray-500">📈 {s.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Analytics
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Department Analytics</h1>
          <p className="text-gray-500 text-sm">Software Engineering Department Overview</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800"><Download className="w-4 h-4" /> Export PDF</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: aa.totalStudents },
          { label: 'Active Courses', value: aa.activeCourses },
          { label: 'Avg GPA', value: aa.avgGPA },
          { label: 'Pass Rate', value: `${aa.passRate}%` },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold mb-4">Enrollment Trends</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aa.monthlyEnrollments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#1e3a5f" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold mb-4">Students by Level</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={aa.departmentPerformance} dataKey="students" nameKey="level" cx="50%" cy="50%" outerRadius={75} label={({ name, value }: any) => `${name}: ${value}`}>
                  {aa.departmentPerformance.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

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
              </tr>
            </thead>
            <tbody>
              {aa.departmentPerformance.map((dp, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{dp.level}</td>
                  <td className="py-3 px-4">{dp.students}</td>
                  <td className="py-3 px-4 font-semibold">{dp.avgGPA}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-100 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${dp.passRate}%` }} /></div>
                      <span className="text-xs">{dp.passRate}%</span>
                    </div>
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
