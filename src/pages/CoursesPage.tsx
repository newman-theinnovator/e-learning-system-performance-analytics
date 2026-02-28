import { useState } from 'react';
import { courses } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Search, Users, BookOpen, Clock } from 'lucide-react';

interface Props { onNavigate: (page: string) => void; }

export default function CoursesPage({ onNavigate }: Props) {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [semFilter, setSemFilter] = useState<string>('all');

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'all' || c.level === parseInt(levelFilter);
    const matchSem = semFilter === 'all' || c.semester === semFilter;
    return matchSearch && matchLevel && matchSem;
  });

  const courseColors = ['from-blue-500 to-blue-600', 'from-purple-500 to-purple-600', 'from-emerald-500 to-emerald-600', 'from-amber-500 to-amber-600', 'from-pink-500 to-pink-600', 'from-indigo-500 to-indigo-600'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{user?.role === 'student' ? 'My Courses' : 'Course Management'}</h1>
          <p className="text-gray-500 text-sm">{filtered.length} courses available</p>
        </div>
        {user?.role !== 'student' && (
          <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Create Course
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses by title or code..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
            <option value="all">All Levels</option>
            <option value="100">100 Level</option>
            <option value="200">200 Level</option>
            <option value="300">300 Level</option>
            <option value="400">400 Level</option>
          </select>
          <select value={semFilter} onChange={e => setSemFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
            <option value="all">All Semesters</option>
            <option value="First">First Semester</option>
            <option value="Second">Second Semester</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c, idx) => {
          const completed = c.modules.filter(m => m.isCompleted).length;
          const total = c.modules.length || 1;
          const progress = Math.round((completed / total) * 100);
          return (
            <div key={c.id} onClick={() => onNavigate('courseDetail')} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden group">
              <div className={`h-28 bg-gradient-to-br ${courseColors[idx % courseColors.length]} p-4 flex flex-col justify-between`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white/90 bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">{c.code}</span>
                  <span className="text-xs text-white/80 bg-white/10 px-2 py-0.5 rounded">{c.category}</span>
                </div>
                <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:underline">{c.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{c.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {c.enrolledStudents}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {c.modules.length} modules</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.level}L</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                      {c.lecturerName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-xs text-gray-600">{c.lecturerName}</span>
                  </div>
                  {user?.role === 'student' && (
                    <div className="text-right">
                      <span className="text-xs font-medium text-blue-600">{progress}%</span>
                    </div>
                  )}
                </div>
                {user?.role === 'student' && (
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-1.5 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
