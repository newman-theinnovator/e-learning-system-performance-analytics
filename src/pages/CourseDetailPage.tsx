import { useState } from 'react';
import { courses, assessments, forumPosts } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Video, FileText, Link2, Type, ChevronDown, ChevronRight, CheckCircle2, Circle, Clock, Users, ClipboardList, MessageSquare, Download, Play } from 'lucide-react';

interface Props { onNavigate: (page: string) => void; }

export default function CourseDetailPage(_props: Props) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'content' | 'assessments' | 'discussion' | 'info'>('content');
  const [expandedModule, setExpandedModule] = useState<string | null>('M001');

  const course = courses[0]; // SWE 401
  const courseAssessments = assessments.filter(a => a.courseId === course.id);
  const courseForums = forumPosts.filter(f => f.courseId === course.id);

  const completedModules = course.modules.filter(m => m.isCompleted).length;
  const progress = Math.round((completedModules / (course.modules.length || 1)) * 100);

  const contentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-red-500" />;
      case 'pdf': return <FileText className="w-4 h-4 text-red-600" />;
      case 'document': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'link': return <Link2 className="w-4 h-4 text-green-600" />;
      case 'text': return <Type className="w-4 h-4 text-gray-600" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'content' as const, label: 'Course Content', icon: BookOpen },
    { id: 'assessments' as const, label: 'Assessments', icon: ClipboardList },
    { id: 'discussion' as const, label: 'Discussion', icon: MessageSquare },
    { id: 'info' as const, label: 'Course Info', icon: FileText },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Course Header */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full -translate-y-1/4 translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded">{course.code}</span>
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded">{course.semester} Semester</span>
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded">{course.level} Level</span>
          </div>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-blue-200 text-sm mt-2 max-w-2xl">{course.description}</p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-blue-200">
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.enrolledStudents} students</span>
            <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {course.modules.length} modules</span>
            <span>Lecturer: <strong className="text-white">{course.lecturerName}</strong></span>
          </div>
          {user?.role === 'student' && (
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-blue-200">Your Progress</span>
                <span className="font-bold">{progress}%</span>
              </div>
              <div className="w-full max-w-sm bg-white/20 rounded-full h-2.5">
                <div className="bg-amber-400 h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-3">
              {course.modules.map(mod => (
                <div key={mod.id} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {mod.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                      <div className="text-left">
                        <p className="font-semibold text-sm">Module {mod.order}: {mod.title}</p>
                        <p className="text-xs text-gray-500">{mod.description} • {mod.contents.length} items</p>
                      </div>
                    </div>
                    {expandedModule === mod.id ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                  </button>
                  {expandedModule === mod.id && mod.contents.length > 0 && (
                    <div className="border-t border-gray-100 bg-gray-50/50 p-3 space-y-2">
                      {mod.contents.map(content => (
                        <div key={content.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
                          <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                            {contentIcon(content.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{content.title}</p>
                            <p className="text-xs text-gray-500 capitalize">{content.type} {content.duration ? `• ${content.duration}` : ''} {content.size ? `• ${content.size}` : ''}</p>
                          </div>
                          {content.type === 'video' ? (
                            <Play className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Download className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <div className="space-y-3">
              {courseAssessments.map(a => (
                <div key={a.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${a.type === 'quiz' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{a.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{a.description}</p>
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span className="capitalize bg-gray-100 px-2 py-0.5 rounded">{a.type}</span>
                      <span>{a.totalPoints} points</span>
                      {a.duration && <span>{a.duration} min</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      a.status === 'graded' ? 'bg-emerald-50 text-emerald-700' :
                      a.status === 'active' ? 'bg-blue-50 text-blue-700' :
                      a.status === 'upcoming' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'
                    }`}>{a.status}</span>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      Due: {new Date(a.dueDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Discussion Tab */}
          {activeTab === 'discussion' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
                  + New Post
                </button>
              </div>
              {courseForums.map(post => (
                <div key={post.id} className={`border rounded-xl p-4 ${post.isPinned ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${post.authorRole === 'lecturer' ? 'bg-blue-500' : 'bg-emerald-500'}`}>
                      {post.authorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{post.authorName}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${post.authorRole === 'lecturer' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>{post.authorRole}</span>
                        {post.isPinned && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">📌 Pinned</span>}
                      </div>
                      <h4 className="font-semibold text-sm mt-1">{post.title}</h4>
                      <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">{post.content}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.replies.length} replies</span>
                        <span>{new Date(post.createdAt).toLocaleDateString('en-NG')}</span>
                      </div>
                      {post.replies.length > 0 && (
                        <div className="mt-3 space-y-2 pl-4 border-l-2 border-gray-200">
                          {post.replies.map(r => (
                            <div key={r.id} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-xs">{r.authorName}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${r.authorRole === 'lecturer' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>{r.authorRole}</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{r.content}</p>
                              <span className="text-[10px] text-gray-400 mt-1 block">❤️ {r.likes} • {new Date(r.createdAt).toLocaleDateString('en-NG')}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Course Description</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-sm mb-3">Course Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Course Code</span><span className="font-medium">{course.code}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Level</span><span className="font-medium">{course.level} Level</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Semester</span><span className="font-medium">{course.semester}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Category</span><span className="font-medium">{course.category}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-medium capitalize">{course.status}</span></div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-sm mb-3">Enrollment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Enrolled</span><span className="font-medium">{course.enrolledStudents}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Max Capacity</span><span className="font-medium">{course.maxStudents}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Lecturer</span><span className="font-medium">{course.lecturerName}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Modules</span><span className="font-medium">{course.modules.length}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Assessments</span><span className="font-medium">{courseAssessments.length}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
