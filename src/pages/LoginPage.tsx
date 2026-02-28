import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Eye, EyeOff, Mail, Lock, ArrowRight, BookOpen, BarChart3, Users } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Please enter your email'); return; }
    const success = login(email, password);
    if (!success) setError('Invalid credentials. Please try again.');
  };

  const demoLogin = (role: string) => {
    const emails: Record<string, string> = {
      student: 'chidera.okafor@adun.edu.ng',
      lecturer: 'ngozi.eze@adun.edu.ng',
      admin: 'admin@adun.edu.ng',
    };
    login(emails[role], 'demo123');
  };

  const features = [
    { icon: BookOpen, title: 'Course Management', desc: 'Access all your courses, materials, and assignments in one place' },
    { icon: BarChart3, title: 'Performance Analytics', desc: 'Track your progress with AI-powered insights and predictions' },
    { icon: Users, title: 'Collaborative Learning', desc: 'Engage with peers and lecturers through discussion forums' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <GraduationCap className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ADUN E-Learn</h1>
              <p className="text-blue-300 text-xs">Admiralty University of Nigeria</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Empowering Software Engineers<br/>
              <span className="text-amber-400">Through Smart Learning</span>
            </h2>
            <p className="text-blue-200 mt-4 text-lg max-w-md">
              A modern e-learning platform with intelligent performance analytics for the Department of Software Engineering.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{f.title}</h3>
                  <p className="text-blue-300 text-xs mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-blue-400 text-xs">© 2025 Admiralty University of Nigeria, Delta State. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900">ADUN E-Learn</h1>
              <p className="text-gray-500 text-xs">Admiralty University</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
              <p className="text-gray-500 text-sm mt-1">{isRegister ? 'Register with your university email' : 'Sign in to your learning portal'}</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Chidera" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Okafor" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">University Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="name@adun.edu.ng"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Matric Number</label>
                  <input type="text" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="ADUN/SWE/20/001" />
                </div>
              )}

              {!isRegister && (
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium">Forgot Password?</button>
                </div>
              )}

              <button type="submit" className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white py-2.5 rounded-lg font-semibold text-sm hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2">
                {isRegister ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 text-center">
              <button onClick={() => setIsRegister(!isRegister)} className="text-sm text-gray-500 hover:text-blue-600">
                {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
              </button>
            </div>
          </div>

          {/* Quick Demo Access */}
          <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => demoLogin('student')} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold py-2.5 rounded-lg transition-colors border border-emerald-200">
                👨‍🎓 Student
              </button>
              <button onClick={() => demoLogin('lecturer')} className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold py-2.5 rounded-lg transition-colors border border-blue-200">
                👩‍🏫 Lecturer
              </button>
              <button onClick={() => demoLogin('admin')} className="bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold py-2.5 rounded-lg transition-colors border border-purple-200">
                🔧 Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
