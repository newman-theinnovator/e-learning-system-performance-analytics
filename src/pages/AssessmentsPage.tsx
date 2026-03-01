import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { assessments, submissions } from '../data/mockData';
import { ClipboardList, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AssessmentsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<string>('all');
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const filtered = filter === 'all' ? assessments : assessments.filter(a => a.status === filter);
  const activeQuiz = assessments.find(a => a.id === selectedQuiz);

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  if (selectedQuiz && activeQuiz?.questions) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold dark:text-white">{activeQuiz.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{activeQuiz.courseCode} • {activeQuiz.totalPoints} points • {activeQuiz.duration} minutes</p>
            </div>
            <button onClick={() => { setSelectedQuiz(null); setQuizSubmitted(false); setQuizAnswers({}); }} className="text-sm text-blue-600 dark:text-blue-400 font-medium">← Back</button>
          </div>

          {quizSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">Quiz Submitted!</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Your answers have been recorded. Results will be available after grading.</p>
              <div className="mt-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 inline-block">
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Answered: {Object.keys(quizAnswers).length}/{activeQuiz.questions.length} questions</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {activeQuiz.questions.map((q, idx) => (
                <div key={q.id} className="border border-gray-100 dark:border-gray-700 rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-7 h-7 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">{idx + 1}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm dark:text-white">{q.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{q.points} points • {q.type.replace('_', '/')}</p>
                    </div>
                  </div>
                  {q.type === 'mcq' || q.type === 'true_false' ? (
                    <div className="ml-10 space-y-2">
                      {q.options?.map((opt, oi) => (
                        <label key={oi} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${quizAnswers[q.id] === oi ? 'border-blue-300 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20' : 'border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}>
                          <input type="radio" name={q.id} checked={quizAnswers[q.id] === oi} onChange={() => setQuizAnswers({ ...quizAnswers, [q.id]: oi })} className="accent-blue-600" />
                          <span className="text-sm dark:text-gray-200">{opt}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="ml-10">
                      <textarea
                        value={(quizAnswers[q.id] as string) || ''}
                        onChange={e => setQuizAnswers({ ...quizAnswers, [q.id]: e.target.value })}
                        className="w-full p-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Type your answer here..."
                      />
                    </div>
                  )}
                </div>
              ))}
              <button onClick={handleQuizSubmit} className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors">
                Submit Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Assessments</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{assessments.length} total assessments</p>
        </div>
        {user?.role === 'lecturer' && (
          <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 flex items-center gap-2">
            <ClipboardList className="w-4 h-4" /> Create Assessment
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'active', 'upcoming', 'graded', 'closed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === f ? 'bg-blue-900 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Assessment List */}
      <div className="space-y-3">
        {filtered.map(a => {
          const sub = submissions.find(s => s.assessmentId === a.id && s.studentId === user?.id);
          return (
            <div key={a.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 hover:border-blue-200 dark:hover:border-blue-500/50 transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${a.type === 'quiz' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : a.type === 'assignment' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold dark:text-white">{a.title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${a.status === 'graded' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        a.status === 'active' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          a.status === 'upcoming' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                      }`}>{a.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{a.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-medium dark:text-gray-300">{a.courseCode}</span>
                    <span className="capitalize">{a.type}</span>
                    <span>{a.totalPoints} points</span>
                    {a.duration && <span><Clock className="w-3 h-3 inline" /> {a.duration} min</span>}
                    <span><Clock className="w-3 h-3 inline" /> Due: {new Date(a.dueDate).toLocaleDateString('en-NG')}</span>
                  </div>
                  {sub && (
                    <div className={`mt-3 p-2 rounded-lg text-xs ${sub.status === 'graded' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
                      {sub.status === 'graded' ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">✅ Graded: {sub.score}/{sub.totalPoints} ({Math.round((sub.score! / sub.totalPoints) * 100)}%)</span>
                      ) : (
                        <span className="text-blue-700 dark:text-blue-400 font-medium">📝 Submitted on {new Date(sub.submittedAt).toLocaleDateString('en-NG')}</span>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  {a.type === 'quiz' && a.status === 'active' && a.questions && user?.role === 'student' && (
                    <button onClick={() => setSelectedQuiz(a.id)} className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 flex items-center gap-1">
                      Start <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  {a.type === 'assignment' && a.status === 'active' && user?.role === 'student' && (
                    <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
