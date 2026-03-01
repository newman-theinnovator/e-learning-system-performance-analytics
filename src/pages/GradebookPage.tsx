import { grades } from '../data/mockData';
import { Award, TrendingUp } from 'lucide-react';

export default function GradebookPage() {
  const totalCredits = grades.length * 3;
  const totalGradePoints = grades.reduce((a, g) => a + g.gradePoint * 3, 0);
  const cgpa = (totalGradePoints / totalCredits).toFixed(2);

  const gradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-emerald-600 bg-emerald-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold">Gradebook</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-4 sm:p-5 text-white">
          <Award className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-1 sm:mb-2" />
          <p className="text-2xl sm:text-3xl font-bold">{cgpa}</p>
          <p className="text-blue-200 text-xs sm:text-sm">Cumulative GPA</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 mb-1 sm:mb-2" />
          <p className="text-2xl sm:text-3xl font-bold">{grades.filter(g => g.gradePoint >= 3.5).length}/{grades.length}</p>
          <p className="text-gray-500 text-xs sm:text-sm">Courses with B+ or higher</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <p className="text-2xl sm:text-3xl font-bold">{Math.round(grades.reduce((a, g) => a + g.totalScore, 0) / grades.length)}%</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Overall Average Score</p>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Course</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">Quiz Avg</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">Assignment</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">Exam</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">Total</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">Grade</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">GP</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-medium">{g.courseCode}</p>
                    <p className="text-xs text-gray-500">{g.courseTitle}</p>
                  </td>
                  <td className="text-center py-3 px-4">{g.quizAvg}%</td>
                  <td className="text-center py-3 px-4">{g.assignmentAvg}%</td>
                  <td className="text-center py-3 px-4">{g.examScore}%</td>
                  <td className="text-center py-3 px-4 font-bold">{g.totalScore}%</td>
                  <td className="text-center py-3 px-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${gradeColor(g.grade)}`}>{g.grade}</span>
                  </td>
                  <td className="text-center py-3 px-4 font-semibold">{g.gradePoint.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
