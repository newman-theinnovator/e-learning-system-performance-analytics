import { useAuth } from '../context/AuthContext';
import { courses, assessments, announcements, studentAnalytics, grades } from '../data/mockData';
import { BookOpen, ClipboardList, TrendingUp, Trophy, Clock, ArrowRight, AlertTriangle, CheckCircle2, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

interface Props { onNavigate: (page: string) => void; }

export default function StudentDashboard({ onNavigate }: Props) {
  const { user } = useAuth();
  if (!user) return null;

  const enrolledCourses = courses.slice(0, 4);
  const pendingAssessments = assessments.filter(a => a.status === 'active' || a.status === 'upcoming');
  const analytics = studentAnalytics;
  const currentGPA = analytics.gpaHistory[analytics.gpaHistory.length - 1]?.gpa || 0;
  const avgScore = Math.round(grades.reduce((a, g) => a + g.totalScore, 0) / grades.length);

  const statCards = [
    { label: 'Enrolled Courses', value: enrolledCourses.length, icon: BookOpen, color: 'bg-blue-500', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    { label: 'Current CGPA', value: currentGPA.toFixed(2), icon: Trophy, color: 'bg-amber-500', bgColor: 'bg-amber-50', textColor: 'text-amber-700' },
    { label: 'Average Score', value: `${avgScore}%`, icon: Target, color: 'bg-emerald-500', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
    { label: 'Pending Tasks', value: pendingAssessments.length, icon: ClipboardList, color: 'bg-purple-500', bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20 isolate">
        {/* Animated Background Orbs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-amber-400/30 to-rose-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute -bottom-20 left-10 w-60 h-60 bg-gradient-to-tr from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 animate-fade-in-up">
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">Welcome back, {user.firstName}! 👋</h1>
          <p className="text-indigo-200 mt-1 sm:mt-2 font-medium text-xs sm:text-base">
            {user.matricNo} • <span className="text-white bg-white/10 px-2 py-0.5 rounded-md">{user.level} Level</span> • Dept. of {user.department}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 sm:mt-8">
            <div className="glass px-3 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl animate-fade-in-up delay-100 min-w-0 flex-1 sm:flex-none sm:min-w-36">
              <p className="text-[10px] sm:text-xs text-indigo-200 font-semibold mb-1 uppercase tracking-wider">Predicted Grade</p>
              <p className="text-xl sm:text-3xl font-black bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">{analytics.predictedGrade.predicted}%</p>
            </div>
            <div className="glass px-3 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl animate-fade-in-up delay-200 min-w-0 flex-1 sm:flex-none sm:min-w-36">
              <p className="text-[10px] sm:text-xs text-indigo-200 font-semibold mb-1 uppercase tracking-wider">Confidence</p>
              <p className="text-xl sm:text-3xl font-black bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">{analytics.predictedGrade.confidence}%</p>
            </div>
            <div className="glass px-3 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl animate-fade-in-up delay-300 min-w-0 flex-1 sm:flex-none sm:min-w-36">
              <p className="text-[10px] sm:text-xs text-indigo-200 font-semibold mb-1 uppercase tracking-wider">Current Avg</p>
              <p className="text-xl sm:text-3xl font-black text-white">{analytics.predictedGrade.current}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className={`glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group animate-fade-in-up delay-${(i % 4) * 100 + 100}`}>
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 sm:w-12 sm:h-12 ${stat.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                <stat.icon className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.textColor}`} />
              </div>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-xl sm:text-3xl font-black mt-2 sm:mt-4 dark:text-white">{stat.value}</p>
            <p className="text-[10px] sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        {/* GPA Trend */}
        <div className="md:col-span-2 glass-card rounded-2xl p-4 sm:p-6 transition-shadow hover:shadow-lg animate-fade-in-up delay-200">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">GPA Trend</h3>
            <button onClick={() => onNavigate('analytics')} className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold flex items-center gap-1 group">
              Analytics <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.gpaHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="semester" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 5]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="gpa" stroke="url(#colorUv)" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Radar */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 transition-shadow hover:shadow-lg animate-fade-in-up delay-300">
          <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4 sm:mb-6">Course Performance</h3>
          <div className="h-48 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={analytics.coursePerformance}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="course" tick={{ fontSize: 9 }} />
                <Radar name="Score" dataKey="score" stroke="#1e3a5f" fill="#1e3a5f" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        {/* Upcoming Assessments */}
        <div className="md:col-span-2 glass-card rounded-2xl p-4 sm:p-6 transition-shadow hover:shadow-lg animate-fade-in-up delay-400">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Upcoming Assessments</h3>
            <button onClick={() => onNavigate('assessments')} className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold flex items-center gap-1 group">
              View All <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {pendingAssessments.map((a, index) => (
              <div key={a.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm" style={{ animationDelay: `${index * 100 + 400}ms` }}>
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 ${a.type === 'quiz' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : a.type === 'assignment' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                    <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">{a.title}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">{a.courseCode} • {a.totalPoints} pts</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-0 pl-13 sm:pl-0">
                  <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider ${a.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                    {a.status}
                  </span>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 sm:mt-2 flex items-center gap-1 sm:gap-1.5 font-medium">
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
                    {new Date(a.dueDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 transition-shadow hover:shadow-lg animate-fade-in-up delay-400">
          <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4 sm:mb-6 flex items-center gap-2">
            <span className="text-xl sm:text-2xl animate-pulse">🤖</span> AI Insights
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {analytics.recommendations.slice(0, 3).map((rec, i) => (
              <div key={i} className={`p-3 sm:p-4 rounded-xl text-xs sm:text-sm transition-all hover:-translate-y-0.5 hover:shadow-sm ${i === 0 ? 'bg-rose-50/80 border border-rose-100 dark:bg-rose-900/10 dark:border-rose-900/30' : i === 1 ? 'bg-amber-50/80 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30' : 'bg-blue-50/80 border border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30'}`}>
                <div className="flex items-start gap-2 sm:gap-3">
                  {i === 0 ? <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 flex-shrink-0 mt-0.5" /> : <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{rec}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enrolled Courses & Announcements */}
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        <div className="md:col-span-2 glass-card rounded-2xl p-4 sm:p-6 transition-shadow hover:shadow-lg animate-fade-in-up delay-500">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">My Courses</h3>
            <button onClick={() => onNavigate('courses')} className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold flex items-center gap-1 group">
              View All <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {enrolledCourses.map(c => {
              const completed = c.modules.filter(m => m.isCompleted).length;
              const total = c.modules.length || 1;
              const progress = Math.round((completed / total) * 100);
              return (
                <div key={c.id} className="bg-white/40 dark:bg-gray-800/40 border border-white/60 dark:border-gray-700/60 rounded-xl p-4 sm:p-5 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group" onClick={() => onNavigate('courseDetail')}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md shadow-sm">{c.code}</span>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{c.semester} Sem</span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{c.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{c.lecturerName}</p>
                  <div className="mt-3 sm:mt-4">
                    <div className="flex justify-between text-[10px] sm:text-xs mb-1 sm:mb-1.5 font-semibold">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-blue-600 dark:text-blue-400">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 sm:h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-6 transition-shadow hover:shadow-lg animate-fade-in-up delay-500">
          <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4 sm:mb-6">📢 Announcements</h3>
          <div className="space-y-3 sm:space-y-4">
            {announcements.slice(0, 3).map(a => (
              <div key={a.id} className={`p-3 sm:p-4 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-sm ${a.priority === 'high' ? 'border-rose-200 bg-rose-50/80 dark:bg-rose-900/10 dark:border-rose-900/30' : 'border-gray-200 bg-white/50 dark:bg-gray-800/50 dark:border-gray-700'}`}>
                <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
                  {a.priority === 'high' && <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" />}
                  <p className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">{a.title}</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">{a.content}</p>
                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 mt-2 sm:mt-3 uppercase tracking-wider">{new Date(a.createdAt).toLocaleDateString('en-NG')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
