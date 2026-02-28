import { useAuth } from '../context/AuthContext';
import { User, Mail, BookOpen, Calendar, Shield, Edit } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  const roleColor = user.role === 'student' ? 'bg-emerald-500' : user.role === 'lecturer' ? 'bg-blue-500' : 'bg-purple-500';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-900 to-blue-700" />
        <div className="px-6 pb-6 -mt-12">
          <div className="flex items-end gap-4">
            <div className={`w-24 h-24 ${roleColor} rounded-2xl flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg`}>
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div className="pb-1 flex-1">
              <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-500 text-sm capitalize">{user.role} • Department of {user.department}</p>
            </div>
            <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">{user.role === 'student' ? 'Matric Number' : 'Staff ID'}</p>
                <p className="text-sm font-medium">{user.matricNo || user.staffId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Department</p>
                <p className="text-sm font-medium">{user.department}</p>
              </div>
            </div>
            {user.level && (
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Level</p>
                  <p className="text-sm font-medium">{user.level} Level</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Joined</p>
                <p className="text-sm font-medium">{new Date(user.createdAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'long' })}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold mb-4">Account Settings</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-100 text-sm transition-colors">
              <p className="font-medium">Change Password</p>
              <p className="text-xs text-gray-500">Update your account password</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-100 text-sm transition-colors">
              <p className="font-medium">Notification Preferences</p>
              <p className="text-xs text-gray-500">Manage email and in-app notifications</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-100 text-sm transition-colors">
              <p className="font-medium">Privacy Settings</p>
              <p className="text-xs text-gray-500">Control who can see your profile</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-100 text-sm transition-colors">
              <p className="font-medium">Download My Data</p>
              <p className="text-xs text-gray-500">Export all your academic data</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
