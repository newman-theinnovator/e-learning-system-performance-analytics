import { useAuth } from '../context/AuthContext';
import { User, Mail, BookOpen, Calendar, Shield, Edit } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  const roleColor = user.role === 'student' ? 'bg-emerald-500' : user.role === 'lecturer' ? 'bg-blue-500' : 'bg-purple-500';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">My Profile</h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-900 to-blue-700" />
        <div className="px-6 pb-6 -mt-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
            <div className={`w-24 h-24 ${roleColor} rounded-2xl flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-gray-800 shadow-lg`}>
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div className="pb-1 flex-1">
              <h2 className="text-xl font-bold dark:text-white">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">{user.role} • Department of {user.department}</p>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <h3 className="font-semibold mb-4 dark:text-white">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-sm font-medium dark:text-gray-200">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.role === 'student' ? 'Matric Number' : 'Staff ID'}</p>
                <p className="text-sm font-medium dark:text-gray-200">{user.matricNo || user.staffId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Department</p>
                <p className="text-sm font-medium dark:text-gray-200">{user.department}</p>
              </div>
            </div>
            {user.level && (
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
                  <p className="text-sm font-medium dark:text-gray-200">{user.level} Level</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>
                <p className="text-sm font-medium dark:text-gray-200">{new Date(user.createdAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'long' })}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <h3 className="font-semibold mb-4 dark:text-white">Account Settings</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-100 dark:border-gray-700 text-sm transition-colors">
              <p className="font-medium dark:text-gray-200">Change Password</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Update your account password</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-100 dark:border-gray-700 text-sm transition-colors">
              <p className="font-medium dark:text-gray-200">Notification Preferences</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Manage email and in-app notifications</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-100 dark:border-gray-700 text-sm transition-colors">
              <p className="font-medium dark:text-gray-200">Privacy Settings</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Control who can see your profile</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-100 dark:border-gray-700 text-sm transition-colors">
              <p className="font-medium dark:text-gray-200">Download My Data</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Export all your academic data</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
