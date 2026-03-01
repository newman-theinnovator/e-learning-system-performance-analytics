import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import {
  LayoutDashboard, BookOpen, BarChart3, MessageSquare,
  Bell, User, LogOut, Menu, X, ChevronDown, GraduationCap,
  Settings, Users, ClipboardList, Award, Sun, Moon
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { user, logout, switchRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  if (!user) return null;

  const studentNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'assessments', label: 'Assessments', icon: ClipboardList },
    { id: 'gradebook', label: 'Gradebook', icon: Award },
    { id: 'analytics', label: 'My Analytics', icon: BarChart3 },
    { id: 'forum', label: 'Discussion Forum', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const lecturerNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'assessments', label: 'Assessments', icon: ClipboardList },
    { id: 'analytics', label: 'Class Analytics', icon: BarChart3 },
    { id: 'forum', label: 'Discussion Forum', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const adminNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'courses', label: 'All Courses', icon: BookOpen },
    { id: 'analytics', label: 'Department Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const navItems = user.role === 'admin' ? adminNav : user.role === 'lecturer' ? lecturerNav : studentNav;

  const roleColors: Record<UserRole, string> = {
    student: 'bg-emerald-500',
    lecturer: 'bg-blue-500',
    admin: 'bg-purple-500',
  };

  const notifications = [
    { id: 1, text: 'SWE 401 Assignment due in 2 days', time: '2h ago', unread: true },
    { id: 2, text: 'Quiz graded: Design Patterns - 18/20', time: '1d ago', unread: true },
    { id: 3, text: 'New material uploaded for SWE 403', time: '2d ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className={`min-h-screen flex overflow-x-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">ADUN E-Learn</h1>
              <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Admiralty University</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
              className={`group w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 animate-fade-in-up hover:scale-[1.02] ${currentPage === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    : 'text-gray-600 hover:bg-white hover:shadow-sm hover:text-blue-600'
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Role Switcher (Demo) */}
        <div className={`p-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-xs font-medium mb-2 px-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Demo: Switch Role</p>
          <div className="flex gap-1">
            {(['student', 'lecturer', 'admin'] as UserRole[]).map(role => (
              <button
                key={role}
                onClick={() => switchRole(role)}
                className={`flex-1 text-xs py-1.5 rounded-md font-medium capitalize transition-all ${user.role === role
                    ? `${roleColors[role]} text-white shadow-sm`
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-transparent to-blue-50/30 dark:to-blue-900/10 relative">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Top Bar */}
        <header className={`sticky top-0 z-30 glass border-b px-4 py-3 lg:px-8 lg:py-4 transition-all duration-300 ${darkMode ? 'border-gray-800 text-white' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h2 className="text-xl font-bold capitalize bg-gradient-to-r from-blue-900 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">{currentPage === 'dashboard' ? `${user.role} Dashboard` : currentPage.replace(/([A-Z])/g, ' $1')}</h2>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {new Date().toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }} className={`relative p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>
                  )}
                </button>
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
                    <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <h3 className="font-semibold text-sm">Notifications</h3>
                    </div>
                    {notifications.map(n => (
                      <div key={n.id} className={`px-4 py-3 ${n.unread ? (darkMode ? 'bg-blue-900/20' : 'bg-blue-50/50') : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer transition-colors`}>
                        <p className="text-sm">{n.text}</p>
                        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{n.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }} className={`flex items-center gap-3 p-1.5 pr-3 rounded-full transition-all duration-300 hover:shadow-md ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-100'}`}>
                  <div className={`w-9 h-9 rounded-full ${roleColors[user.role]} shadow-inner flex items-center justify-center text-white font-bold text-sm`}>
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold leading-tight">{user.firstName} {user.lastName}</p>
                    <p className={`text-[10px] uppercase tracking-wider font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{user.role}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl glass border overflow-hidden animate-scale-in origin-top-right z-50">
                    <div className={`px-5 py-4 border-b ${darkMode ? 'border-gray-700/50 bg-gray-800/50' : 'border-gray-100 bg-white/50'}`}>
                      <p className="font-bold text-base">{user.firstName} {user.lastName}</p>
                      <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                      <span className={`inline-block mt-2 text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wide text-white uppercase ${roleColors[user.role]}`}>{user.role}</span>
                    </div>
                    <div className="p-2">
                      <button onClick={() => { onNavigate('profile'); setShowUserMenu(false); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl font-medium transition-colors ${darkMode ? 'hover:bg-gray-700/80' : 'hover:bg-blue-50 hover:text-blue-700'}`}>
                        <User className="w-4 h-4" /> My Profile
                      </button>
                      <button onClick={() => { logout(); setShowUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-1">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
